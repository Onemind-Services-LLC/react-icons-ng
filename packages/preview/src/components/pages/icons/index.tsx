import Container from "@components/@core/container";
import { getIconById } from "@utils/icon";
import React from "react";

import IconSetImport from "./iconset-import";
import IconSetInfo from "./iconset-info";
import IconSetViewer from "./iconset-viewer";

export default function IconsPageComponent({ iconId }) {
  const icon = getIconById(iconId);

  return (
    <>
      {icon?.name ? (
        <Container title={icon.name}>
          <IconSetInfo icon={icon} />
          <IconSetImport iconId={icon.id} />
          <IconSetViewer icon={icon} />
        </Container>
      ) : (
        <div>
          <div className="p3">
            <h1 className="main">Error 404</h1>
            Icon does not exist, ID: {iconId}
          </div>
        </div>
      )}
    </>
  );
}
