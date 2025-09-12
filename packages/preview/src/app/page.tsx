import CodeBlock from "@components/@core/code-block";
import Container from "@components/@core/container";
import Badges from "@components/pages/home/badges";
import { BRAND_TITLE, HOME_USAGE, HOME_USAGE_PACK } from "@utils/constants";
import React from "react";

export default function HomePage() {
  return (
    <Container title={BRAND_TITLE}>
      <Badges />
      <p>
        Include popular icons in your React projects easily with react-icons,
        which utilizes ES6 imports that allows you to include only the icons
        that your project is using.
      </p>

      <h2>Installation (for standard modern project)</h2>

      <CodeBlock
        language="bash"
        code={`npm install @onemind-services-llc/react-icons-ng --save`}
      />

      <h3>Usage</h3>
      <CodeBlock language="jsx" code={HOME_USAGE} />

      <h2>Installation (for meteorjs, gatsbyjs, etc)</h2>
      <p>
        If your project grows in size, this option is available. This method has
        the trade-off that it takes a long time to install the package. Suitable
        for MeteorJS, Gatsbyjs etc.
      </p>
      <CodeBlock
        language="bash"
        code={`npm install @onemind-services-llc/react-icons-ng-pack --save`}
      />

      <h3>Usage</h3>
      <CodeBlock language="jsx" code={HOME_USAGE_PACK} />

      <h2>More info</h2>
      <p>
        Before proceeding, please note that the NPM registry for this package is
        hosted on GitHub. You need to configure your NPM client to use GitHub
        Packages registry for this package. For more information, see{" "}
        <a
          href="https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package"
          target="_blank"
          rel="noopener noreferrer"
        >
          Configuring npm for use with GitHub Packages
        </a>
        .
      </p>

      <p>
        <a href="https://github.com/Onemind-Services-LLC/react-icons-ng">
          GitHub &#8599;
        </a>
      </p>
    </Container>
  );
}
