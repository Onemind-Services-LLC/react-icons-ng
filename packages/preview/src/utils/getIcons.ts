import codegen from "babel-plugin-codegen/macro";

const fn = codegen`
const { IconsManifest } = require("@onemind-services-llc/react-icons-ng/lib/cjs");

let codes = "(function (id) { switch (id) {";
IconsManifest.forEach(icon => {
  codes += 'case "' + icon.id + '":\\nreturn import("@onemind-services-llc/react-icons-ng/' + icon.id +'/index");\\n'
})
codes += '}})';

module.exports = codes;
// module.exports = "import('react-icons-ng/fa/index')"
`;

export function getIcons(iconsId) {
  /*
  Dynamic Import with improved performance.
  Macros are used to avoid bundling unnecessary modules.

  Similar to this code
  ```
  return import(`react-icons-ng/${iconsId}/index`);
  ```
  */

  return fn(iconsId);
}
