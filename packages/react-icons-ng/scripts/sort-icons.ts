/* eslint-disable no-console */
import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";

const filePath = path.resolve(__dirname, "../src/icons/index.ts");

function getIconId(node: ts.ObjectLiteralExpression): string | null {
  for (const prop of node.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const name = prop.name;
    const isIdName =
      (ts.isIdentifier(name) && name.text === "id") ||
      (ts.isStringLiteralLike(name) && name.text === "id");
    if (!isIdName) continue;
    const init = prop.initializer;
    if (ts.isStringLiteralLike(init)) return init.text;
    return null;
  }
  return null;
}

function sortIconsArray(sf: ts.SourceFile): ts.SourceFile {
  const transformer: ts.TransformerFactory<ts.SourceFile> = (context) => {
    const { factory } = context;
    const visit: ts.Visitor = (node) => {
      if (
        ts.isVariableDeclaration(node) &&
        ts.isIdentifier(node.name) &&
        node.name.text === "icons" &&
        node.initializer &&
        ts.isArrayLiteralExpression(node.initializer)
      ) {
        const arr = node.initializer;
        const elements = arr.elements;

        const entries: { id: string; node: ts.Expression }[] = [];
        elements.forEach((el) => {
          if (ts.isObjectLiteralExpression(el)) {
            const id = getIconId(el);
            if (id) entries.push({ id, node: el });
            else entries.push({ id: "", node: el });
          } else {
            // Preserve any non-object expressions in original order
            entries.push({ id: "\uffff" + String(entries.length), node: el });
          }
        });

        const sorted = [...entries]
          .sort((a, b) => a.id.localeCompare(b.id))
          .map((e) => e.node);

        const newArr = factory.createArrayLiteralExpression(
          sorted,
          /*multiLine*/ true,
        );
        return factory.updateVariableDeclaration(
          node,
          node.name,
          node.exclamationToken ?? undefined,
          node.type,
          newArr,
        );
      }
      return ts.visitEachChild(node, visit, context);
    };
    return (node: ts.SourceFile) => ts.visitNode(node, visit) as ts.SourceFile;
  };

  const result = ts.transform(sf, [transformer]);
  const transformed = result.transformed[0];
  result.dispose();
  return transformed;
}

function main() {
  const original = fs.readFileSync(filePath, "utf8");
  const sf = ts.createSourceFile(
    filePath,
    original,
    ts.ScriptTarget.Latest,
    /*setParentNodes*/ true,
    ts.ScriptKind.TS,
  );

  const updated = sortIconsArray(sf);
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const output = printer.printFile(updated);

  if (output !== original) {
    fs.writeFileSync(filePath, output, "utf8");
    console.log(`[sort-icons] Sorted icons by id in ${filePath}`);
  } else {
    console.log("[sort-icons] No changes needed (already sorted)");
  }
}

main();
