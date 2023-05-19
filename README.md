<img src="https://raw.githubusercontent.com/Onemind-Services-LLC/react-icons-ng/master/react-icons.svg" width="120" alt="React Icons">

# [React Icons](https://onemind-services-llc.github.io/react-icons-ng/)

[![npm][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/react-icons-ng.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/react-icons-ng

Include popular icons in your React projects easily with `react-icons-ng`, which utilizes ES6 imports that allows you to include only the icons that your project is using.

## Installation (for standard modern project)

```bash
yarn add react-icons-ng
# or
npm install react-icons-ng --save
```

example usage

```jsx
import { FaBeer } from "react-icons-ng/fa";

function Question() {
  return (
    <h3>
      Lets go for a <FaBeer />?
    </h3>
  );
}
```

_NOTE_: each Icon package has it's own subfolder under `react-icons-ng` you import from.

For example, to use an icon from **Material Design**, your import would be: `import { ICON_NAME } from 'react-icons-ng/md';`

## Installation (for meteorjs, gatsbyjs, etc)

> **Note**
> This option has not had a new release for some time.
> More info https://github.com/react-icons/react-icons/issues/593

If your project grows in size, this option is available.
This method has the trade-off that it takes a long time to install the package.

```bash
yarn add @react-icons-ng/all-files
# or
npm install @react-icons-ng/all-files --save
```

example usage

```jsx
import { FaBeer } from "@react-icons-ng/all-files/fa/FaBeer";

function Question() {
  return (
    <h3>
      Lets go for a <FaBeer />?
    </h3>
  );
}
```

## Icons

[//]: # START_VERSION

| Icon Library                                                            | License                                                                                           | Version                                  | Count |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------- | ----: |
| [Ant Design Icons](https://github.com/ant-design/ant-design-icons)      | [MIT](https://opensource.org/licenses/MIT)                                                        | @ant-design/icons-svg@4.0.0-146-g8b44846 |   789 |
| [BoxIcons](https://github.com/atisawd/boxicons)                         | [MIT](https://github.com/atisawd/boxicons/blob/master/LICENSE)                                    | 9ffa9136e8681886bb7bd2145cd4098717ce1c11 |  1634 |
| [Bootstrap Icons](https://github.com/twbs/icons)                        | [MIT](https://opensource.org/licenses/MIT)                                                        | v1.10.5-6-g388a10f                       |  2592 |
| [css.gg](https://github.com/astrit/css.gg)                              | [MIT](https://opensource.org/licenses/MIT)                                                        | 2.0.0                                    |   704 |
| [Circum Icons](https://circumicons.com/)                                | [MPL-2.0 license](https://github.com/Klarr-Agency/Circum-Icons/blob/main/LICENSE)                 | v2.0.1-20-gfb3e0a9                       |   288 |
| [Coolicons](https://github.com/krystonschwarze/coolicons)               | [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)                                 | v4.1-1-g1a92717                          |   442 |
| [Font Awesome 5](https://fontawesome.com/)                              | [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)                                 | 5.15.4-3-gafecf2a                        |  1612 |
| [Font Awesome 6](https://fontawesome.com/)                              | [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)                                 | 6.4.0                                    |  2020 |
| [Flat Color Icons](https://github.com/icons8/flat-color-icons)          | [MIT](https://opensource.org/licenses/MIT)                                                        | v1.0.2-27-g8eccbbb                       |   329 |
| [Feather](https://feathericons.com/)                                    | [MIT](https://github.com/feathericons/feather/blob/master/LICENSE)                                | 4.29.0                                   |   287 |
| [Github Octicons icons](https://octicons.github.com/)                   | [MIT](https://github.com/primer/octicons/blob/master/LICENSE)                                     | 19.1.0                                   |   266 |
| [Game Icons](https://game-icons.net/)                                   | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)                                         | 12920d6565588f0512542a3cb0cdfd36a497f910 |  4040 |
| [Grommet-Icons](https://github.com/grommet/grommet-icons)               | [Apache License Version 2.0](http://www.apache.org/licenses/)                                     | v4.10.0-3-g4ab254b                       |   620 |
| [Heroicons](https://github.com/tailwindlabs/heroicons)                  | [MIT](https://opensource.org/licenses/MIT)                                                        | v2.0.18                                  |   876 |
| [IcoMoon Free](https://github.com/Keyamoon/IcoMoon-Free)                | [CC BY 4.0 License](https://github.com/Keyamoon/IcoMoon-Free/blob/master/License.txt)             | d006795ede82361e1bac1ee76f215cf1dc51e4ca |   491 |
| [Ionicons 5](https://ionicons.com/)                                     | [MIT](https://github.com/ionic-team/ionicons/blob/master/LICENSE)                                 | 5.5.4                                    |  1332 |
| [Icons8 Line Awesome](https://icons8.com/line-awesome)                  | [MIT](https://github.com/icons8/line-awesome/blob/master/LICENSE.md)                              | v1.2.1-10-g78a1012                       |  1544 |
| [Lucide](https://lucide.dev/)                                           | [ISC](https://github.com/lucide-icons/lucide/blob/main/LICENSE)                                   | v4.8.2-9-g64947506                       |  1094 |
| [MingCute icons](https://github.com/Richard9394/MingCute.git)           | [Apache License Version 2.0](https://github.com/Richard9394/MingCute/blob/main/LICENSE)           | v2.84                                    |  2212 |
| [Material Design icons](http://google.github.io/material-design-icons/) | [Apache License Version 2.0](https://github.com/google/material-design-icons/blob/master/LICENSE) | 4.0.0-67-g3912baecc9                     |  4341 |
| [Phosphor Icons](https://github.com/phosphor-icons/core)                | [MIT](https://github.com/phosphor-icons/core/blob/main/LICENSE)                                   | v2.0.2-2-gc67d7a8                        |  7488 |
| [Remix Icon](https://github.com/Remix-Design/RemixIcon)                 | [Apache License Version 2.0](http://www.apache.org/licenses/)                                     | v3.3.0                                   |  2481 |
| [Radix Icons](https://icons.radix-ui.com)                               | [MIT](https://github.com/radix-ui/icons/blob/master/LICENSE)                                      | @radix-ui/react-icons@1.3.0              |   318 |
| [Simple Icons](https://simpleicons.org/)                                | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)                           | 4.14.0-1254-g4ae63bc                     |  2459 |
| [Simple Line Icons](https://thesabbir.github.io/simple-line-icons/)     | [MIT](https://opensource.org/licenses/MIT)                                                        | v2.5.5                                   |   189 |
| [Themify Icons](https://github.com/lykmapipo/themify-icons)             | [MIT](https://github.com/thecreation/standard-icons/blob/master/modules/themify-icons/LICENSE)    | v0.1.2-2-g9600186                        |   352 |
| [Tabler Icons](https://github.com/tabler/tabler-icons)                  | [MIT](https://opensource.org/licenses/MIT)                                                        | v2.19.0                                  |  4176 |
| [Typicons](http://s-ings.com/typicons/)                                 | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)                                   | v2.1.2                                   |   336 |
| [VS Code Icons](https://github.com/microsoft/vscode-codicons)           | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)                                         | 0.0.31-48-g0609c3d                       |   426 |
| [Weather Icons](https://erikflowers.github.io/weather-icons/)           | [SIL OFL 1.1](http://scripts.sil.org/OFL)                                                         | 2.0.12-7-gbb80982                        |   219 |

Total Count of Icons: 45957

[//]: # END_VERSION

You can add more icons by submitting pull requests or creating issues.

## Configuration

You can configure react-icons-ng props using [React Context API](https://reactjs.org/docs/context.html).

_Requires **React 16.3** or higher._

```jsx
import { IconContext } from "react-icons-ng";

<IconContext.Provider value={{ color: "blue", className: "global-class-name" }}>
  <div>
    <FaFolder />
  </div>
</IconContext.Provider>;
```

| Key         | Default               | Notes                              |
| ----------- | --------------------- | ---------------------------------- |
| `color`     | `undefined` (inherit) |                                    |
| `size`      | `1em`                 |                                    |
| `className` | `undefined`           |                                    |
| `style`     | `undefined`           | Can overwrite size and color       |
| `attr`      | `undefined`           | Overwritten by other attributes    |
| `title`     | `undefined`           | Icon description for accessibility |

## Migrating from version 2 -> 3

### Change import style

Import path has changed. You need to rewrite from the old style.

```jsx
// OLD IMPORT STYLE
import FaBeer from "react-icons-ng/lib/fa/beer";

function Question() {
  return (
    <h3>
      Lets go for a <FaBeer />?
    </h3>
  );
}
```

```jsx
// NEW IMPORT STYLE
import { FaBeer } from "react-icons-ng/fa";

function Question() {
  return (
    <h3>
      Lets go for a <FaBeer />?
    </h3>
  );
}
```

Ending up with a large JS bundle? Check out [this issue](https://github.com/react-icons/react-icons/issues/154).

### Adjustment CSS

From version 3, `vertical-align: middle` is not automatically given. Please use IconContext to specify className or specify an inline style.

#### Global Inline Styling

```tsx
<IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
```

#### Global `className` Styling

Component

```tsx
<IconContext.Provider value={{ className: 'react-icons-ng' }}>
```

CSS

```css
.react-icons {
  vertical-align: middle;
}
```

### TypeScript native support

Dependencies on `@types/react-icons-ng` can be deleted.

#### Yarn

```bash
yarn remove @types/react-icons-ng
```

#### NPM

```bash
npm remove @types/react-icons-ng
```

## Contributing

`./build-script.sh` will build the whole project. See also CI scripts for more information.

### Development

```bash
yarn
cd packages/react-icons-ng
yarn fetch  # fetch icon sources
yarn build
```

### Preview

```bash
cd packages/react-icons-ng
yarn fetch
yarn build

cd ../preview
yarn start
```

### Demo

The demo is a [Create React App](https://create-react-app.dev/) boilerplate with `react-icons-ng` added as a dependency for easy testing.

```bash
cd packages/react-icons-ng
yarn fetch
yarn build

cd ../demo
yarn start
```

## Why React SVG components instead of fonts?

SVG is [supported by all major browsers](http://caniuse.com/#search=svg). With `react-icons-ng`, you can serve only the needed icons instead of one big font file to the users, helping you to recognize which icons are used in your project.

## Related Projects

- [react-svg-morph](https://github.com/gorangajic/react-svg-morph/)

## Licence

MIT

- Icons are taken from the other projects so please check each project licences accordingly.
