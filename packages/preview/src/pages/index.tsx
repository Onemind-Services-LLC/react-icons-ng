import CodeBlock from "@components/@core/code-block";
import Container from "@components/@core/container";
import Badges from "@components/pages/home/badges";
import { BRAND_TITLE, HOME_USAGE, HOME_USAGE_ALL } from "@utils/constants";
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
      <CodeBlock language="bash" code={`npm install react-icons --save`} />

      <h3>Usage</h3>
      <CodeBlock language="jsx" code={HOME_USAGE_ALL} />

      <h2>More info</h2>
      <p>
        <a
          href="https://github.com/Onemind-Services-LLC/react-icons"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub &#8599;
        </a>
      </p>
    </Container>
  );
}
