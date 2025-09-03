<div align="center">

<img src="https://raw.githubusercontent.com/Onemind-Services-LLC/react-icons-ng/master/react-icons.svg" width="120" alt="React Icons" align="center">

# [React Icons NG](https://onemind-services-llc.github.io/react-icons-ng/)

[![Node.js CI](https://github.com/Onemind-Services-LLC/react-icons-ng/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Onemind-Services-LLC/react-icons-ng/actions/workflows/nodejs.yml)
![react-icons-ng](https://img.shields.io/github/lerna-json/v/Onemind-Services-LLC/react-icons-ng/master?label=react-icons-ng)
![react-icons-ng-pack](https://img.shields.io/github/lerna-json/v/Onemind-Services-LLC/react-icons-ng/master?label=react-icons-ng-pack)

</div>

Beautiful, modern, and comprehensive React SVG icons — over 79,000 components across popular packs with first‑class TypeScript, zero runtime dependencies, and imports designed for tree‑shaking.

Built on the proven foundation of [react-icons](https://github.com/react-icons/react-icons), React Icons NG expands the catalog, streamlines DX, and keeps a familiar API.

## Highlights

- Massive library: 79,995+ icons across premier packs (Font Awesome 5/6/7, Material, Heroicons, Lucide, Tabler, Phosphor, Simple Icons, and more)
- Pack‑scoped imports for optimal bundles: `@onemind-services-llc/react-icons-ng/fa`
- ESM builds and per‑icon components enable tree‑shaking in modern bundlers
- TypeScript types for every icon; works with React 16.3+ (Context API)
- SSR‑friendly and framework‑agnostic (Next.js, CRA, Vite, Webpack, etc.)
- Two install modes: lean workspace package or prepacked monolith for broad environments

## Quick Start

```bash
yarn add @onemind-services-llc/react-icons-ng
# or
npm install @onemind-services-llc/react-icons-ng --save
```

```tsx
import { FaBeer } from "@onemind-services-llc/react-icons-ng/fa";

export function Example() {
  return <h3>How about a <FaBeer /></h3>;
}
```

Looking for an icon? Browse and copy imports from the live preview: https://onemind-services-llc.github.io/react-icons-ng/

## Installation

This package is published to GitHub Packages. Configure your npm client to use the GitHub registry for the `@onemind-services-llc` scope. See the GitHub docs for details: Configuring npm for use with GitHub Packages.

Example `.npmrc` entry (project‑local):

```
@onemind-services-llc:registry=https://npm.pkg.github.com
```

Then install:

```bash
yarn add @onemind-services-llc/react-icons-ng
# or
npm install @onemind-services-llc/react-icons-ng --save
```

Alternative (prepacked, for environments like Meteor/Gatsby or when you prefer a single tarball):

```bash
yarn add @onemind-services-llc/react-icons-ng-pack
# or
npm install @onemind-services-llc/react-icons-ng-pack --save
```

Usage with the prepacked build:

```tsx
import { FaBeer } from "@onemind-services-llc/react-icons-ng-pack/fa/FaBeer";

export function Example() {
  return <h3>Fancy a <FaBeer /></h3>;
}
```

## Usage

Import from the pack you need to keep bundles lean. A few examples:

```tsx
// Font Awesome
import { FaBeer, FaFolder } from "@onemind-services-llc/react-icons-ng/fa";

// Material Design
import { MdHome } from "@onemind-services-llc/react-icons-ng/md";

// Heroicons outline
import { HiOutlineSearch } from "@onemind-services-llc/react-icons-ng/hi";
```

Each icon is a React component. You can pass standard props and a few icon‑specific ones:

```tsx
<FaFolder size="24" color="#0ea5e9" title="Folder" />
```

Common props:

- size: string or number (default: 1em)
- color: any valid CSS color (inherits by default)
- title: accessible label for screen readers
- className/style: regular React styling hooks

## Theming with IconContext

Use React Context to set defaults once and keep JSX clean.

```tsx
import { IconContext } from "@onemind-services-llc/react-icons-ng";

<IconContext.Provider value={{ color: "#6b7280", size: "20px", className: "app-icon" }}>
  <FaFolder />
  <MdHome />
</IconContext.Provider>
```

Global CSS example for alignment:

```css
.app-icon { vertical-align: middle; }
```

## Accessibility

- Prefer providing `title` on meaningful icons to announce intent to assistive tech
- Decorative icons can omit `title` and be treated as purely visual
- Icons scale with font‑size by default (`size` defaults to `1em`), integrating naturally with text

## Icon Packs

[//]: # START_VERSION

|                               Icon Library                               |                                              License                                              |                 Version                  | Count |
|:------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------:|:----------------------------------------:|:-----:|
|    [Ant Design Icons](https://github.com/ant-design/ant-design-icons)    |                            [MIT](https://opensource.org/licenses/MIT)                             |                  4.4.2                   |  831  |
|             [BoxIcons](https://github.com/atisawd/boxicons)              |                  [MIT](https://github.com/atisawd/boxicons/blob/master/LICENSE)                   |                  2.1.4                   | 1634  |
|             [Bootstrap Icons](https://github.com/twbs/icons)             |                            [MIT](https://opensource.org/licenses/MIT)                             |                  1.13.1                  | 2754  |
|                [css.gg](https://github.com/astrit/css.gg)                |                            [MIT](https://opensource.org/licenses/MIT)                             |                  2.1.4                   |  704  |
|                 [Circum Icons](https://circumicons.com/)                 |         [MPL-2.0 license](https://github.com/Klarr-Agency/Circum-Icons/blob/main/LICENSE)         |                  1.0.0                   |  288  |
|        [Coolicons](https://github.com/krystonschwarze/coolicons)         |                 [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)                 |             v4.1-1-g1a92717              |  442  |
|          [CoreUI Icons](https://github.com/coreui/coreui-icons)          |                  [MIT](https://github.com/coreui/coreui-icons/blob/main/LICENSE)                  |                  3.0.1                   |  556  |
|                   [EOS Icons](https://eos-icons.com/)                    |                [MIT](https://gitlab.com/SUSE-UIUX/eos-icons/-/blob/master/LICENSE)                |                  5.4.0                   |  156  |
|                [Font Awesome 5](https://fontawesome.com/)                |                 [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)                 |            5.15.4-3-gafecf2a             | 1612  |
|                [Font Awesome 6](https://fontawesome.com/)                |                 [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)                 |                  6.7.2                   | 2060  |
|                [Font Awesome 7](https://fontawesome.com/)                |                 [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)                 |             7.0.0-2-gc482aa2             | 2806  |
|      [Flat Color Icons](https://github.com/icons8/flat-color-icons)      |                            [MIT](https://opensource.org/licenses/MIT)                             |                  1.0.2                   |  329  |
|                   [Feather](https://feathericons.com/)                   |                [MIT](https://github.com/feathericons/feather/blob/master/LICENSE)                 |                  4.29.2                  |  287  |
|  [Fluent System Icons](https://developer.microsoft.com/en-us/fluentui)   |           [MIT](https://github.com/microsoft/fluentui-system-icons/blob/master/LICENSE)           |                  1.0.0                   | 4794  |
|                  [Game Icons](https://game-icons.net/)                   |                     [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)                     | 12920d6565588f0512542a3cb0cdfd36a497f910 | 4040  |
|          [Github Octicons icons](https://octicons.github.com/)           |                   [MIT](https://github.com/primer/octicons/blob/master/LICENSE)                   |                 19.15.5                  |  312  |
|                [US Government Icons](http://govicons.io/)                |             [SIL OFL 1.1](https://github.com/540co/govicons/blob/develop/LICENSE.md)              |                  1.6.0                   |  136  |
|        [Grommet-Icons](https://github.com/grommet/grommet-icons)         |                  [Apache License Version 2.0](https://www.apache.org/licenses/)                   |                  4.14.0                  |  637  |
|                 [Health Icons](https://healthicons.org/)                 |            [MIT](https://github.com/resolvetosavelives/healthicons/blob/main/LICENSE)             |                  2.0.0                   | 1482  |
|          [Heroicons](https://github.com/tailwindlabs/heroicons)          |                            [MIT](https://opensource.org/licenses/MIT)                             |                  2.2.0                   | 1288  |
|                     [Iconoir](https://iconoir.com/)                      |                 [MIT](https://github.com/iconoir-icons/iconoir/blob/main/LICENSE)                 |                  7.11.0                  | 1671  |
|         [IcoMoon Free](https://github.com/Keyamoon/IcoMoon-Free)         |       [CC BY 4.0 License](https://github.com/Keyamoon/IcoMoon-Free/blob/master/License.txt)       | d006795ede82361e1bac1ee76f215cf1dc51e4ca |  491  |
|                   [Ionicons 5](https://ionicons.com/)                    |                 [MIT](https://github.com/ionic-team/ionicons/blob/master/LICENSE)                 |                  5.5.4                   | 1332  |
|          [Icons8 Line Awesome](https://icons8.com/line-awesome)          |               [MIT](https://github.com/icons8/line-awesome/blob/master/LICENSE.md)                |                  1.3.1                   | 1544  |
|                      [Lucide](https://lucide.dev/)                       |                  [ISC](https://github.com/lucide-icons/lucide/blob/main/LICENSE)                  |            0.539.0-2-g867c058            | 1630  |
|      [MingCute icons](https://github.com/Richard9394/MingCute.git)       |      [Apache License Version 2.0](https://github.com/Richard9394/MingCute/blob/main/LICENSE)      |             v2.96-1-gd307024             | 3102  |
| [Material Design icons](https://google.github.io/material-design-icons/) | [Apache License Version 2.0](https://github.com/google/material-design-icons/blob/master/LICENSE) |          4.0.0-135-gb2c0f61d8a           | 6478  |
|       [Material Design icons 2](https://materialdesignicons.com/)        |  [Apache License Version 2.0](https://github.com/Templarian/MaterialDesign/blob/master/LICENSE)   | 2424e748e0cc63ab7b9c095a099b9fe239b737c0 | 7447  |
|                    [Openmoji](https://openmoji.org/)                     |          [CC BY-SA 4.0](https://github.com/hfg-gmuend/openmoji/blob/master/LICENSE.txt)           |                  16.0.0                  | 4292  |
|         [Phosphor Icons](https://github.com/phosphor-icons/core)         |                  [MIT](https://github.com/phosphor-icons/core/blob/main/LICENSE)                  |                  2.1.1                   | 9072  |
|                 [Polaris](https://polaris.shopify.com/)                  |                  [MIT](https://github.com/Shopify/polaris/blob/main/LICENSE.md)                   |                  9.3.1                   |  534  |
|         [Remix Icon](https://github.com/Remix-Design/RemixIcon)          |                  [Apache License Version 2.0](https://www.apache.org/licenses/)                   |                  4.6.0                   | 3058  |
|                [Radix Icons](https://icons.radix-ui.com)                 |                   [MIT](https://github.com/radix-ui/icons/blob/master/LICENSE)                    |                  1.3.2                   |  318  |
|                 [Simple Icons](https://simpleicons.org/)                 |              [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)              |                 15.10.0                  | 3344  |
|   [Simple Line Icons](https://thesabbir.github.io/simple-line-icons/)    |                            [MIT](https://opensource.org/licenses/MIT)                             |                  2.5.5                   |  189  |
|                [Streamline](https://www.streamlinehq.com)                |                 [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)                 |             1.0-21-g52d750c              | 1000  |
|          [Tabler Icons](https://github.com/tabler/tabler-icons)          |                            [MIT](https://opensource.org/licenses/MIT)                             |                  3.34.1                  | 5945  |
|       [Themify Icons](https://github.com/lykmapipo/themify-icons)        |  [MIT](https://github.com/thecreation/standard-icons/blob/master/modules/themify-icons/LICENSE)   |            v0.1.2-2-g9600186             |  352  |
|                 [Typicons](https://s-ings.com/typicons/)                 |                  [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)                  |                  2.1.2                   |  336  |
|      [VS Code Icons](https://github.com/microsoft/vscode-codicons)       |                     [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)                     |                  0.0.39                  |  493  |
|      [Weather Icons](https://erikflowers.github.io/weather-icons/)       |                            [SIL OFL 1.1](https://scripts.sil.org/OFL)                             |                  2.0.12                  |  219  |

Total Count of Icons: 79995

[//]: # END_VERSION

Have a pack request or spotted an issue? Open an issue or PR — contributions are welcome.

## Performance & Bundling

- Pack‑scoped imports keep bundles focused on what you use
- ESM output for modern bundlers; CommonJS entry points available
- Components are side‑effect free (`sideEffects: false`) to enable tree‑shaking

## Frameworks

Works anywhere React runs. Popular setups include:

- Next.js (SSR): import icons directly in server and client components
- CRA/Vite/Webpack: fully tree‑shakeable with default configs
- Meteor/Gatsby: prefer the prepacked `react-icons-ng-pack` variant

## TypeScript

Every icon ships with `.d.ts` definitions. Props are strongly typed and compatible with standard React attributes.

## API Reference: IconContext

Provide defaults for all nested icons.

```tsx
import { IconContext } from "@onemind-services-llc/react-icons-ng";

<IconContext.Provider value={{ color: "blue", className: "global-class-name" }}>
  <FaFolder />
  <MdHome />
</IconContext.Provider>
```

| Key         | Default               | Description                                    |
|-------------|-----------------------|------------------------------------------------|
| `color`     | `undefined` (inherit) | Icon color                                     |
| `size`      | `1em`                 | Icon size                                      |
| `className` | `undefined`           | Add custom classes                             |
| `style`     | `undefined`           | Inline styles; can override size and color     |
| `attr`      | `undefined`           | Extra attributes; may be overwritten by others |
| `title`     | `undefined`           | Accessible label for the icon                  |

Tip: Align with text using a global class, e.g. `.app-icon { vertical-align: middle }`.

## Preview & Demo

Explore the full catalog and copy imports from the Preview app, or run the local demo.

Preview (Next.js):

```bash
cd packages/react-icons-ng
yarn fetch && yarn build

cd ../preview
yarn start
```

Demo (CRA):

```bash
cd packages/react-icons-ng
yarn fetch && yarn build

cd ../demo
yarn start
```

## Development

End‑to‑end build (fetch → build → diff, pack, apps, README update):

```bash
./build-script.sh
```

Individual steps for the builder:

```bash
yarn
cd packages/react-icons-ng
yarn fetch
yarn build
yarn diff
```

## Why SVG Components (vs icon fonts)?

- Crisp at any size; no font hinting issues
- Style with CSS/props; no pseudo‑elements or font loading
- Ship only the icons you use; better performance and clarity

## License

MIT for this library.

Important: Each icon pack retains its own license. Review the table above and the upstream projects when using specific packs.
