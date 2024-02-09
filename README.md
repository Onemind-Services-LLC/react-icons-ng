<div align="center">

<img src="https://raw.githubusercontent.com/Onemind-Services-LLC/react-icons-ng/master/react-icons.svg" width="120" alt="React Icons" align="center">

# [React Icons](https://onemind-services-llc.github.io/react-icons-ng/)
  
[![Node.js CI](https://github.com/Onemind-Services-LLC/react-icons-ng/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Onemind-Services-LLC/react-icons-ng/actions/workflows/nodejs.yml)
![react-icons-ng](https://img.shields.io/github/lerna-json/v/Onemind-Services-LLC/react-icons-ng/master?label=react-icons-ng)
![react-icons-ng-pack](https://img.shields.io/github/lerna-json/v/Onemind-Services-LLC/react-icons-ng/master?label=react-icons-ng-pack)

</div>

---

Redefine the visual elegance of your React projects with [react-icons-ng](https://github.com/Onemind-Services-LLC/react-icons-ng). Stemming from the prestigious legacy of [react-icons/react-icons](https://github.com/react-icons/react-icons), our forked library enriches your design experience by offering an astounding collection of over 60,000 icons. This vast addition ensures we outshine the original repository in diversity and adaptability. 

Harness the power of ES6 imports and embed into your projects only the icons that resonate with your vision. With [react-icons-ng](https://github.com/Onemind-Services-LLC/react-icons-ng), not only do you get unparalleled icon variety but also a streamlined development workflow. Dive into the dynamic world of React icons and make your applications visually captivating.

## 🚀 Installation (for Modern Projects)

Before proceeding, please note that the NPM registry for this package is hosted on GitHub. You need to configure your NPM client to use GitHub Packages registry for this package. For more information, see "[Configuring npm for use with GitHub Packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package)".

```bash
yarn add @onemind-services-llc/react-icons-ng
# or
npm install @onemind-services-llc/react-icons-ng --save
```

### How to Use? 

```jsx
import { FaBeer } from "@onemind-services-llc/react-icons-ng/fa";

function Question() {
  return (
    <h3>
      How about a <FaBeer />?
    </h3>
  );
}
```

⚠️ **NOTE**: Each icon package resides in its dedicated subfolder under `@onemind-services-llc/react-icons-ng`.

For instance, if you wish to employ an icon from **Material Design**, your import should be: 
```jsx
import { ICON_NAME } from '@onemind-services-llc/react-icons-ng/md';
```

## 🚀 Installation (for MeteorJS, GatsbyJS, etc.)

Opt for this if your project scales up significantly. Bear in mind, though, this approach might prolong the installation time.

```bash
yarn add @onemind-services-llc/react-icons-ng-pack
# or
npm install @onemind-services-llc/react-icons-ng-pack --save
```

### How to Use? 

```jsx
import { FaBeer } from "@onemind-services-llc/react-icons-ng-pack/fa/FaBeer";

function Question() {
  return (
    <h3>
      Fancy a <FaBeer />?
    </h3>
  );
}
```

## Icons

[//]: # START_VERSION

| Icon Library                                                             | License                                                                                           | Version                                    | Count |
|--------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|--------------------------------------------|------:|
| [Ant Design Icons](https://github.com/ant-design/ant-design-icons)       | [MIT](https://opensource.org/licenses/MIT)                                                        | @ant-design/icons-svg@4.0.0-184-gd7c5ad5   |   789 |
| [BoxIcons](https://github.com/atisawd/boxicons)                          | [MIT](https://github.com/atisawd/boxicons/blob/master/LICENSE)                                    | 9ffa9136e8681886bb7bd2145cd4098717ce1c11   |  1634 |
| [Bootstrap Icons](https://github.com/twbs/icons)                         | [MIT](https://opensource.org/licenses/MIT)                                                        | v1.11.3                                    |  2716 |
| [css.gg](https://github.com/astrit/css.gg)                               | [MIT](https://opensource.org/licenses/MIT)                                                        | 2.1.1-1-gdeea4fa                           |   704 |
| [Circum Icons](https://circumicons.com/)                                 | [MPL-2.0 license](https://github.com/Klarr-Agency/Circum-Icons/blob/main/LICENSE)                 | v2.0.2-2-geeef620                          |   288 |
| [Coolicons](https://github.com/krystonschwarze/coolicons)                | [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)                                 | v4.1-1-g1a92717                            |   442 |
| [CoreUI Icons](https://github.com/coreui/coreui-icons)                   | [MIT](https://github.com/coreui/coreui-icons/blob/main/LICENSE)                                   | v3.0.0-3-g4b1f387                          |   556 |
| [EOS Icons](https://eos-icons.com/)                                      | [MIT](https://gitlab.com/SUSE-UIUX/eos-icons/-/blob/master/LICENSE)                               | v5.4.0-4-ga21c4b9                          |   156 |
| [Font Awesome 5](https://fontawesome.com/)                               | [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)                                 | 5.15.4-3-gafecf2a                          |  1612 |
| [Font Awesome 6](https://fontawesome.com/)                               | [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)                                 | 6.5.1-1-gdcdc48a                           |  2037 |
| [Flat Color Icons](https://github.com/icons8/flat-color-icons)           | [MIT](https://opensource.org/licenses/MIT)                                                        | v1.0.2-27-g8eccbbb                         |   329 |
| [Feather](https://feathericons.com/)                                     | [MIT](https://github.com/feathericons/feather/blob/master/LICENSE)                                | v4.29.1-3-g8104034                         |   287 |
| [Fluent System Icons](https://developer.microsoft.com/en-us/fluentui)    | [MIT](https://github.com/microsoft/fluentui-system-icons/blob/master/LICENSE)                     | 1.1.224                                    |  4289 |
| [Github Octicons icons](https://octicons.github.com/)                    | [MIT](https://github.com/primer/octicons/blob/master/LICENSE)                                     | v19.8.0                                    |   273 |
| [US Government Icons](http://govicons.io/)                               | [SIL OFL 1.1](https://github.com/540co/govicons/blob/develop/LICENSE.md)                          | 1.6.0-2-g1d9f467                           |   136 |
| [Game Icons](https://game-icons.net/)                                    | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)                                         | 12920d6565588f0512542a3cb0cdfd36a497f910   |  4040 |
| [Grommet-Icons](https://github.com/grommet/grommet-icons)                | [Apache License Version 2.0](https://www.apache.org/licenses/)                                    | v4.12.0-1-g14f5063                         |   635 |
| [Health Icons](https://healthicons.org/)                                 | [MIT](https://github.com/resolvetosavelives/healthicons/blob/main/LICENSE)                        | 342307616a7ffede3f811716ad54ee2ddb154b64   |  1869 |
| [Heroicons](https://github.com/tailwindlabs/heroicons)                   | [MIT](https://opensource.org/licenses/MIT)                                                        | v2.1.1                                     |   888 |
| [Iconoir](https://iconoir.com/)                                          | [MIT](https://github.com/iconoir-icons/iconoir/blob/main/LICENSE)                                 | v7.3.0-3-ge102706                          |  1544 |
| [IcoMoon Free](https://github.com/Keyamoon/IcoMoon-Free)                 | [CC BY 4.0 License](https://github.com/Keyamoon/IcoMoon-Free/blob/master/License.txt)             | d006795ede82361e1bac1ee76f215cf1dc51e4ca   |   491 |
| [Ionicons 5](https://ionicons.com/)                                      | [MIT](https://github.com/ionic-team/ionicons/blob/master/LICENSE)                                 | 5.5.4                                      |  1332 |
| [Jam Icons](https://github.com/michaelampr/jam)                          | [MIT](https://github.com/michaelampr/jam/blob/master/LICENSE)                                     | 3.1.0-2-gc8501b1                           |   940 |
| [Icons8 Line Awesome](https://icons8.com/line-awesome)                   | [MIT](https://github.com/icons8/line-awesome/blob/master/LICENSE.md)                              | v1.2.1-10-g78a1012                         |  1544 |
| [Lucide](https://lucide.dev/)                                            | [ISC](https://github.com/lucide-icons/lucide/blob/main/LICENSE)                                   | 0.307.0                                    |  1383 |
| [MingCute icons](https://github.com/Richard9394/MingCute.git)            | [Apache License Version 2.0](https://github.com/Richard9394/MingCute/blob/main/LICENSE)           | v2.92                                      |  2810 |
| [Material Design icons](https://google.github.io/material-design-icons/) | [Apache License Version 2.0](https://github.com/google/material-design-icons/blob/master/LICENSE) | 4.0.0-98-g9beae745bb                       |  4341 |
| [Material Design icons 2](https://materialdesignicons.com/)              | [Apache License Version 2.0](https://github.com/Templarian/MaterialDesign/blob/master/LICENSE)    | 536f435b8d7924b33bf81277283900d381cf35db   |  7447 |
| [Openmoji](https://openmoji.org/)                                        | [CC BY-SA 4.0](https://github.com/hfg-gmuend/openmoji/blob/master/LICENSE.txt)                    | 15.0.0-5-g21ae69d                          |  4147 |
| [Phosphor Icons](https://github.com/phosphor-icons/core)                 | [MIT](https://github.com/phosphor-icons/core/blob/main/LICENSE)                                   | v2.0.2-6-g21d20a9                          |  7488 |
| [Polaris](https://polaris.shopify.com/)                                  | [MIT](https://github.com/Shopify/polaris/blob/main/LICENSE.md)                                    | @shopify/polaris-icons@7.13.0-26-gbefded29 |   582 |
| [Remix Icon](https://github.com/Remix-Design/RemixIcon)                  | [Apache License Version 2.0](https://www.apache.org/licenses/)                                    | v4.0.0-4-g50e37a2                          |  2704 |
| [Radix Icons](https://icons.radix-ui.com)                                | [MIT](https://github.com/radix-ui/icons/blob/master/LICENSE)                                      | @radix-ui/react-icons@1.3.0-1-g94b3fcf     |   318 |
| [Simple Icons](https://simpleicons.org/)                                 | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)                           | 4.14.0-2113-gff1dfd7                       |  2930 |
| [Simple Line Icons](https://thesabbir.github.io/simple-line-icons/)      | [MIT](https://opensource.org/licenses/MIT)                                                        | v2.5.5                                     |   189 |
| [Tabler Icons](https://github.com/tabler/tabler-icons)                   | [MIT](https://opensource.org/licenses/MIT)                                                        | v2.45.0                                    |  4926 |
| [Themify Icons](https://github.com/lykmapipo/themify-icons)              | [MIT](https://github.com/thecreation/standard-icons/blob/master/modules/themify-icons/LICENSE)    | v0.1.2-2-g9600186                          |   352 |
| [Typicons](https://s-ings.com/typicons/)                                 | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)                                   | v2.1.2                                     |   336 |
| [VS Code Icons](https://github.com/microsoft/vscode-codicons)            | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)                                         | 0.0.35-13-g88424ed                         |   446 |
| [Weather Icons](https://erikflowers.github.io/weather-icons/)            | [SIL OFL 1.1](https://scripts.sil.org/OFL)                                                        | 2.0.12-7-gbb80982                          |   219 |

Total Count of Icons: 70149

[//]: # END_VERSION

You can add more icons by submitting pull requests or creating issues.

## 🔧 Configuration

Easily customize `react-icons-ng` properties utilizing the [React Context API](https://reactjs.org/docs/context.html).

> **Prerequisite**: Ensure you have **React 16.3** or a later version.

```jsx
import { IconContext } from "@onemind-services-llc/react-icons-ng";

<IconContext.Provider value={{ color: "blue", className: "global-class-name" }}>
  <div>
    <FaFolder />
  </div>
</IconContext.Provider>;
```

| Key         | Default               | Description                                    |
|-------------|-----------------------|------------------------------------------------|
| `color`     | `undefined` (inherit) | Icon color                                     |
| `size`      | `1em`                 | Icon size                                      |
| `className` | `undefined`           | Add custom classes                             |
| `style`     | `undefined`           | Inline styles, can override size and color     |
| `attr`      | `undefined`           | Extra attributes, may be overwritten by others |
| `title`     | `undefined`           | Describes the icon for accessibility purposes  |

### 🎨 CSS Adjustments

Icons no longer come with the `vertical-align: middle` styling by default. For alignment adjustments, utilize the `IconContext` to specify a `className` or apply an inline style directly.

#### Set Global Inline Styling:

```tsx
<IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
```

#### Define Global `className` Styling:

Component:

```tsx
<IconContext.Provider value={{ className: 'react-icons-ng' }}>
```

CSS:

```css
.react-icons-ng {
  vertical-align: middle;
}
```

## 💡 Contributing

Execute `./build-script.sh` to build the entire project. For additional details, review the CI scripts.

### 🛠 Development Workflow:

```bash
yarn
cd packages/react-icons-ng
yarn fetch  # Retrieves icon sources
yarn build
```

### 📺 Preview Setup:

```bash
cd packages/react-icons-ng
yarn fetch
yarn build

cd ../preview
yarn start
```

### 🎥 Demo Insights:

Our demo utilizes the [Create React App](https://create-react-app.dev/) framework with [react-icons-ng](https://github.com/Onemind-Services-LLC/react-icons-ng) as an integrated dependency, allowing seamless testing.

```bash
cd packages/react-icons-ng
yarn fetch
yarn build

cd ../demo
yarn start
```

## 🖼 Why React SVG Components Over Fonts?

SVG enjoys [universal support across major browsers](http://caniuse.com/#search=svg). Using [react-icons-ng](https://github.com/Onemind-Services-LLC/react-icons-ng), you can deliver only required icons to users, reducing loading times and clearly identifying utilized icons in your project.

## 🌐 Related Projects:

- [react-svg-morph](https://github.com/gorangajic/react-svg-morph/)
- [react-icons](https://github.com/react-icons/react-icons)

## 📜 License:

Released under the MIT License.

> **Note**: Icons originate from various projects, so it's crucial to review the respective project licenses.
