import path from "path";
import camelcase from "camelcase";
import { type IconDefinition } from "../../scripts/_types";
import { glob } from "glob-promise";

export const icons: IconDefinition[] = [
  {
    id: "ai",
    name: "Ant Design Icons",
    contents: [
      {
        files: path.resolve(
          __dirname,
          "../../icons/ant-design-icons/packages/icons-svg/svg/filled/*.svg",
        ),
        formatter: (name) => `AiFill${name}`,
      },
      {
        files: path.resolve(
          __dirname,
          "../../icons/ant-design-icons/packages/icons-svg/svg/outlined/*.svg",
        ),
        formatter: (name) => `AiOutline${name}`,
      },
      {
        files: path.resolve(
          __dirname,
          "../../icons/ant-design-icons/packages/icons-svg/svg/twotone/*.svg",
        ),
        formatter: (name) => `AiTwotone${name}`,
        multiColor: true,
      },
    ],
    projectUrl: "https://github.com/ant-design/ant-design-icons",
    license: "MIT",
    licenseUrl: "https://opensource.org/licenses/MIT",
    source: {
      type: "git",
      localName: "ant-design-icons",
      remoteDir: "packages/icons-svg/svg/",
      url: "https://github.com/ant-design/ant-design-icons.git",
      branch: "master",
      hash: "d7c5ad5015a0cbb67c4c1faa639edc1c4d16c23a",
    },
  },
  {
    id: "bi",
    name: "BoxIcons",
    contents: [
      {
        files: path.resolve(
          __dirname,
          "../../icons/boxicons/svg/regular/*.svg",
        ),
        formatter: (name) => `Bi${name.replace("Bx", "")}`,
      },
      {
        files: path.resolve(__dirname, "../../icons/boxicons/svg/solid/*.svg"),
        formatter: (name) => `BiSolid${name.replace("Bxs", "")}`,
      },
      {
        files: path.resolve(__dirname, "../../icons/boxicons/svg/logos/*.svg"),
        formatter: (name) => `BiLogo${name.replace("Bxl", "")}`,
      },
    ],
    projectUrl: "https://github.com/atisawd/boxicons",
    license: "MIT",
    licenseUrl: "https://github.com/atisawd/boxicons/blob/master/LICENSE",
    source: {
      type: "git",
      localName: "boxicons",
      remoteDir: "svg/",
      url: "https://github.com/atisawd/boxicons.git",
      branch: "master",
      hash: "9ffa9136e8681886bb7bd2145cd4098717ce1c11",
    },
  },
  {
    id: "bs",
    name: "Bootstrap Icons",
    contents: [
      {
        files: path.resolve(
          __dirname,
          "../../icons/bootstrap/icons/*!(-reverse)-fill.svg",
        ),
        formatter: (name) => `BsFill${name}`,
      },
      {
        files: path.resolve(
          __dirname,
          "../../icons/bootstrap/icons/*-reverse!(-fill).svg",
        ),
        formatter: (name) => `BsReverse${name}`,
      },
      {
        files: path.resolve(
          __dirname,
          "../../icons/bootstrap/icons/*!(-fill|-reverse|reverse-).svg",
        ),
        formatter: (name) => `Bs${name}`,
      },
    ],
    projectUrl: "https://github.com/twbs/icons",
    license: "MIT",
    licenseUrl: "https://opensource.org/licenses/MIT",
    source: {
      type: "git",
      localName: "bootstrap",
      remoteDir: "icons/",
      url: "https://github.com/twbs/icons.git",
      branch: "main",
      hash: "9727a0d6343ab9595ab98c7c9c57ccc5de305c95",
    },
  },
  {
    id: "cg",
    name: "css.gg",
    contents: [
      {
        files: path.resolve(__dirname, "../../icons/css.gg/icons/svg/*.svg"),
        formatter: (name) => `Cg${name}`,
      },
    ],
    projectUrl: "https://github.com/astrit/css.gg",
    license: "MIT",
    licenseUrl: "https://opensource.org/licenses/MIT",
    source: {
      type: "git",
      localName: "css.gg",
      remoteDir: "icons/svg/",
      url: "https://github.com/astrit/css.gg.git",
      branch: "master",
      hash: "deea4fa5f39a2980d7586aed18d65cdba6fd85e3",
    },
  },
  {
    id: "ci",
    name: "Circum Icons",
    contents: [
      {
        files: path.resolve(__dirname, "../../icons/Circum-Icons/svg/*.svg"),
        formatter: (name) => `Ci${name}`.replace(/_/g, "").replace(/&/g, "And"),
      },
    ],
    projectUrl: "https://circumicons.com/",
    license: "MPL-2.0 license",
    licenseUrl:
      "https://github.com/Klarr-Agency/Circum-Icons/blob/main/LICENSE",
    source: {
      type: "git",
      localName: "Circum-Icons",
      remoteDir: "svg/",
      url: "https://github.com/Klarr-Agency/Circum-Icons.git",
      branch: "main",
      hash: "eeef6206df834e6957a45e36d2bfb7459ce6e799",
    },
  },
  {
    id: "co",
    name: "Coolicons",
    contents: [
      {
        files: path.resolve(
          __dirname,
          "../../icons/coolicons/coolicons SVG/*/*.svg",
        ),
        formatter: (name) => `Co${name}`,
      },
    ],
    projectUrl: "https://github.com/krystonschwarze/coolicons",
    license: "CC BY 4.0 License",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    source: {
      type: "git",
      localName: "coolicons",
      remoteDir: "coolicons SVG/",
      url: "https://github.com/krystonschwarze/coolicons.git",
      branch: "master",
      hash: "1a92717b6050b8256465e09a285238a9fa4a1b45",
    },
  },
  {
    id: "cu",
    name: "CoreUI Icons",
    contents: [
      {
        files: path.resolve(
          __dirname,
          "../../icons/coreui-icons/svg/free/*.svg",
        ),
        formatter: (name) => `Cu${name}`,
      },
    ],
    projectUrl: "https://github.com/coreui/coreui-icons",
    license: "MIT",
    licenseUrl: "https://github.com/coreui/coreui-icons/blob/main/LICENSE",
    source: {
      type: "git",
      localName: "coreui-icons",
      remoteDir: "svg/",
      url: "https://github.com/coreui/coreui-icons.git",
      branch: "main",
      hash: "4b1f3877b43304d4faea45f805d0eb3c65596501",
    },
  },
  {
    id: "eos",
    name: "EOS Icons",
    contents: [
      {
        files: path.resolve(__dirname, "../../icons/eos-icons/svg/*.svg"),
        formatter: (name) => `Ei${name}`,
      },
    ],
    projectUrl: "https://eos-icons.com/",
    license: "MIT",
    licenseUrl: "https://gitlab.com/SUSE-UIUX/eos-icons/-/blob/master/LICENSE",
    source: {
      type: "git",
      localName: "eos-icons",
      remoteDir: "svg/",
      url: "https://gitlab.com/SUSE-UIUX/eos-icons.git",
      branch: "master",
      hash: "a21c4b9ba5667f103abc620975fec5ec98078d85",
    },
  },
  {
    id: "fa",
    name: "Font Awesome 5",
    contents: [
      {
        files: path.resolve(
          __dirname,
          "../../icons/fontawesome/svgs/+(brands|solid)/*.svg",
        ),
        formatter: (name) => `Fa${name}`,
      },
      {
        files: path.resolve(
          __dirname,
          "../../icons/fontawesome/svgs/regular/*.svg",
        ),
        formatter: (name) => `FaReg${name}`,
      },
    ],
    projectUrl: "https://fontawesome.com/",
    license: "CC BY 4.0 License",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    source: {
      type: "git",
      localName: "fontawesome",
      remoteDir: "svgs/",
      url: "https://github.com/FortAwesome/Font-Awesome.git",
      branch: "5.x",
      hash: "afecf2af5d897b763e5e8e28d46aad2f710ccad6",
    },
  },
  {
    id: "fa6",
    name: "Font Awesome 6",
    contents: [
      {
        files: path.resolve(
          __dirname,
          "../../icons/fontawesome-6/svgs/+(brands|solid)/*.svg",
        ),
        formatter: (name) => `Fa6${name}`,
      },
      {
        files: path.resolve(
          __dirname,
          "../../icons/fontawesome-6/svgs/regular/*.svg",
        ),
        formatter: (name) => `Fa6Reg${name}`,
      },
    ],
    projectUrl: "https://fontawesome.com/",
    license: "CC BY 4.0 License",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    source: {
      type: "git",
      localName: "fontawesome-6",
      remoteDir: "svgs/",
      url: "https://github.com/FortAwesome/Font-Awesome.git",
      branch: "6.x",
      hash: "f0c25837a3fe0e03783b939559e088abcbfb3c4b",
    },
  },
  {
    id: "fc",
    name: "Flat Color Icons",
    contents: [
      {
        files: path.resolve(
          __dirname,
          "../../icons/flat-color-icons/svg/*.svg",
        ),
        formatter: (name) => `Fc${name}`,
        multiColor: true,
      },
    ],
    projectUrl: "https://github.com/icons8/flat-color-icons",
    license: "MIT",
    licenseUrl: "https://opensource.org/licenses/MIT",
    source: {
      type: "git",
      localName: "flat-color-icons",
      remoteDir: "svg/",
      url: "https://github.com/icons8/flat-color-icons.git",
      branch: "master",
      hash: "8eccbbbd8b2af1d2c9593e7cfba5ecb0d68ee378",
    },
  },
  {
    id: "fi",
    name: "Feather",
    contents: [
      {
        files: path.resolve(__dirname, "../../icons/feather-icons/icons/*.svg"),
        formatter: (name) => `Fi${name}`,
      },
    ],
    projectUrl: "https://feathericons.com/",
    license: "MIT",
    licenseUrl: "https://github.com/feathericons/feather/blob/master/LICENSE",
    source: {
      type: "git",
      localName: "feather-icons",
      remoteDir: "icons/",
      url: "https://github.com/feathericons/feather.git",
      branch: "main",
      hash: "593b3bf516087d07d362280b34ec1a5383e71572",
    },
  },
  {
    id: "fl",
    name: "Fluent System Icons",
    contents: [
      {
        files: path.resolve(
          __dirname,
          "../../icons/fluentui-system-icons/assets/*/SVG/*_24_regular.svg",
        ),
        formatter: (name) => `Fl${name}`,
        processWithSVGO: true,
      },
      {
        files: path.resolve(
          __dirname,
          "../../icons/fluentui-system-icons/assets/*/SVG/*_24_filled.svg",
        ),
        formatter: (name) => `FlFill${name}`,
        processWithSVGO: true,
      },
    ],
    projectUrl: "https://developer.microsoft.com/en-us/fluentui",
    license: "MIT",
    licenseUrl:
      "https://github.com/microsoft/fluentui-system-icons/blob/master/LICENSE",
    source: {
      type: "git",
      localName: "fluentui-system-icons",
      remoteDir: "assets/",
      url: "https://github.com/microsoft/fluentui-system-icons",
      branch: "main",
      hash: "4c58d8fb4d8549b9af9f7db8764d5d154df796c2",
    },
  },
  {
    id: "go",
    name: "Github Octicons icons",
    contents: [
      {
        files: path.resolve(__dirname, "../../icons/octicons/icons/*-24.svg"),
        formatter: (name) => `Go${name}`.replace("24", ""),
      },
    ],
    projectUrl: "https://octicons.github.com/",
    license: "MIT",
    licenseUrl: "https://github.com/primer/octicons/blob/master/LICENSE",
    source: {
      type: "git",
      localName: "octicons",
      remoteDir: "icons/",
      url: "https://github.com/primer/octicons.git",
      branch: "main",
      hash: "6bc78de32be1a218a69e10a731072331ba94e7f9",
    },
  },
  {
    id: "gov",
    name: "US Government Icons",
    contents: [
      {
        files: path.resolve(__dirname, "../../icons/govicons/raw-svg/*.svg"),
        formatter: (name) => `Gov${name}`,
      },
    ],
    projectUrl: "http://govicons.io/",
    license: "SIL OFL 1.1",
    licenseUrl: "https://github.com/540co/govicons/blob/develop/LICENSE.md",
    source: {
      type: "git",
      localName: "govicons",
      remoteDir: "raw-svg/",
      url: "https://github.com/540co/govicons.git",
      branch: "develop",
      hash: "1d9f4673de0d3f7b4a9d300c2359e806730f196b",
    },
  },
  {
    id: "gi",
    name: "Game Icons",
    contents: [
      {
        files: path.resolve(
          __dirname,
          "../../icons/game-icons-inverted/all-icons/*.svg",
        ),
        formatter: (name) => `Gi${name}`,
      },
    ],
    projectUrl: "https://game-icons.net/",
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    source: {
      type: "git",
      localName: "game-icons-inverted",
      remoteDir: "all-icons/",
      url: "https://github.com/delacannon/game-icons-inverted.git",
      branch: "master",
      hash: "12920d6565588f0512542a3cb0cdfd36a497f910",
    },
  },
  {
    id: "gr",
    name: "Grommet-Icons",
    contents: [
      {
        files: path.resolve(
          __dirname,
          "../../icons/grommet-icons/public/img/*.svg",
        ),
        formatter: (name) => `Gr${name}`,
      },
    ],
    projectUrl: "https://github.com/grommet/grommet-icons",
    license: "Apache License Version 2.0",
    licenseUrl: "https://www.apache.org/licenses/",
    source: {
      type: "git",
      localName: "grommet-icons",
      remoteDir: "public/img/",
      url: "https://github.com/grommet/grommet-icons.git",
      branch: "master",
      hash: "2c16c9d1ed028b6cb58f0411c4e71c6cd70387fa",
    },
  },
  {
    id: "hi",
    name: "Heroicons",
    contents: [
      {
        files: path.resolve(
          __dirname,
          "../../icons/heroicons/optimized/24/solid/*.svg",
        ),
        formatter: (name) => `Hi${name}`,
      },
      {
        files: path.resolve(
          __dirname,
          "../../icons/heroicons/optimized/24/outline/*.svg",
        ),
        formatter: (name) => `HiOutline${name}`,
      },
      {
        files: path.resolve(
          __dirname,
          "../../icons/heroicons/optimized/20/solid/*.svg",
        ),
        formatter: (name) => `HiMini${name}`,
      },
    ],
    projectUrl: "https://github.com/tailwindlabs/heroicons",
    license: "MIT",
    licenseUrl: "https://opensource.org/licenses/MIT",
    source: {
      type: "git",
      localName: "heroicons",
      remoteDir: "optimized/",
      url: "https://github.com/tailwindlabs/heroicons.git",
      branch: "master",
      hash: "f937b6fee525976b4021a39b97b798b7a1adf235",
    },
  },
  {
    id: "ic",
    name: "Iconoir",
    contents: [
      {
        files: path.resolve(
          __dirname,
          "../../icons/iconoir/icons/regular/*.svg",
        ),
        formatter: (name) => `Ic${name}`,
      },
      {
        files: path.resolve(__dirname, "../../icons/iconoir/icons/solid/*.svg"),
        formatter: (name) => `IcSolid${name}`,
      },
    ],
    projectUrl: "https://iconoir.com/",
    license: "MIT",
    licenseUrl: "https://github.com/iconoir-icons/iconoir/blob/main/LICENSE",
    source: {
      type: "git",
      localName: "iconoir",
      remoteDir: "icons/",
      url: "https://github.com/iconoir-icons/iconoir.git",
      branch: "main",
      hash: "ea5ec6c43587ce18a5877c4ea41700d6f9aed5f9",
    },
  },
  {
    id: "im",
    name: "IcoMoon Free",
    contents: [
      {
        files: path.resolve(__dirname, "../../icons/icomoon-free/SVG/*.svg"),
        formatter: (name) => `Im${name.slice(3)}`,
      },
    ],
    projectUrl: "https://github.com/Keyamoon/IcoMoon-Free",
    license: "CC BY 4.0 License",
    licenseUrl:
      "https://github.com/Keyamoon/IcoMoon-Free/blob/master/License.txt",
    source: {
      type: "git",
      localName: "icomoon-free",
      remoteDir: "SVG/",
      url: "https://github.com/Keyamoon/IcoMoon-Free.git",
      branch: "master",
      hash: "d006795ede82361e1bac1ee76f215cf1dc51e4ca",
    },
  },
  {
    id: "io5",
    name: "Ionicons 5",
    contents: [
      {
        files: path.resolve(
          __dirname,
          "../../../../node_modules/ionicons-5/dist/svg/*.svg",
        ),
        formatter: (name) => `Io${name}`,
        processWithSVGO: true,
      },
    ],
    projectUrl: "https://ionicons.com/",
    license: "MIT",
    licenseUrl: "https://github.com/ionic-team/ionicons/blob/master/LICENSE",
  },
  {
    id: "ji",
    name: "Jam Icons",
    contents: [
      {
        files: path.resolve(__dirname, "../../icons/jam-icons/icons/*.svg"),
        formatter: (name) => `Ji${name}`,
      },
    ],
    projectUrl: "https://github.com/michaelampr/jam",
    license: "MIT",
    licenseUrl: "https://github.com/michaelampr/jam/blob/master/LICENSE",
    source: {
      type: "git",
      localName: "jam-icons",
      remoteDir: "icons/",
      url: "https://github.com/michaelampr/jam.git",
      branch: "master",
      hash: "c8501b14e0480c8becac58a626e72502bca90084",
    },
  },
  {
    id: "lia",
    name: "Icons8 Line Awesome",
    contents: [
      {
        files: path.resolve(__dirname, "../../icons/line-awesome/svg/*.svg"),
        formatter: (name) => `Lia${name}`,
      },
    ],
    projectUrl: "https://icons8.com/line-awesome",
    license: "MIT",
    licenseUrl: "https://github.com/icons8/line-awesome/blob/master/LICENSE.md",
    source: {
      type: "git",
      localName: "line-awesome",
      remoteDir: "svg/",
      url: "https://github.com/icons8/line-awesome.git",
      branch: "master",
      hash: "78a101217707c9b1c4dcf2a821be75684e36307f",
    },
  },
  {
    id: "lu",
    name: "Lucide",
    contents: [
      {
        files: path.resolve(__dirname, "../../icons/lucide/icons/*.svg"),
        formatter: (name) => `Lu${name}`,
      },
    ],
    projectUrl: "https://lucide.dev/",
    license: "ISC",
    licenseUrl: "https://github.com/lucide-icons/lucide/blob/main/LICENSE",
    source: {
      type: "git",
      localName: "lucide",
      remoteDir: "icons/",
      url: "https://github.com/lucide-icons/lucide.git",
      branch: "main",
      hash: "149ee36e61130ffb4f74be343ddd73b9a8107aff",
    },
  },
  {
    id: "mc",
    name: "MingCute icons",
    contents: [
      {
        files: path.resolve(__dirname, "../../icons/mingcute/svg/*/*.svg"),
        formatter: (name) => `Mc${name}`,
        processWithSVGO: true,
      },
    ],
    projectUrl: "https://github.com/Richard9394/MingCute.git",
    license: "Apache License Version 2.0",
    licenseUrl: "https://github.com/Richard9394/MingCute/blob/main/LICENSE",
    source: {
      type: "git",
      localName: "mingcute",
      remoteDir: "svg/",
      url: "https://github.com/Richard9394/MingCute.git",
      branch: "main",
      hash: "c93de12ab6644c9bd16cc12fe0613a1540630abb",
    },
  },
  {
    id: "md",
    name: "Material Design icons",
    contents: [
      {
        files: async () => {
          const normal = await glob.glob(
            path.resolve(
              __dirname,
              "../../icons/material-design-icons/src/*/*/materialicons/24px.svg",
            ),
          );

          const twotone = await glob.glob(
            path.resolve(
              __dirname,
              "../../icons/material-design-icons/src/*/*/materialiconstwotone/24px.svg",
            ),
          );
          return [
            ...normal,
            ...twotone.filter(
              (file) => !normal.includes(file.replace("twotone/", "/")),
            ),
          ];
        },
        formatter: (name, file) =>
          `Md${camelcase(
            file.replace(/^.*\/([^/]+)\/materialicons[^/]*\/24px.svg$/i, "$1"),
            { pascalCase: true },
          )}`,
        processWithSVGO: true,
      },
      {
        files: path.resolve(
          __dirname,
          "../../icons/material-design-icons/src/*/*/materialiconsoutlined/24px.svg",
        ),
        formatter: (name, file) =>
          `MdOutline${camelcase(
            file.replace(/^.*\/([^/]+)\/materialicons[^/]*\/24px.svg$/i, "$1"),
            { pascalCase: true },
          )}`,
        processWithSVGO: true,
      },
    ],
    projectUrl: "https://google.github.io/material-design-icons/",
    license: "Apache License Version 2.0",
    licenseUrl:
      "https://github.com/google/material-design-icons/blob/master/LICENSE",
    source: {
      type: "git",
      localName: "material-design-icons",
      remoteDir: "src/",
      url: "https://github.com/google/material-design-icons.git",
      branch: "master",
      hash: "a90037f80d7db37279a7c1d863559e247ed81b05",
    },
  },
  {
    id: "md2",
    name: "Material Design icons 2",
    contents: [
      {
        files: path.resolve(
          __dirname,
          "../../icons/material-design-icons-2/svg/*.svg",
        ),
        formatter: (name) => `Md2${name}`,
        processWithSVGO: true,
      },
    ],
    projectUrl: "https://materialdesignicons.com/",
    license: "Apache License Version 2.0",
    licenseUrl:
      "https://github.com/Templarian/MaterialDesign/blob/master/LICENSE",
    source: {
      type: "git",
      localName: "material-design-icons-2",
      remoteDir: "svg/",
      url: "https://github.com/Templarian/MaterialDesign.git",
      branch: "master",
      hash: "d35cbfb8a85be4214e8c5c157b7cd105193c8d3b",
    },
  },
  {
    id: "om",
    name: "Openmoji",
    contents: [
      {
        files: path.resolve(__dirname, "../../icons/openmoji/black/svg/*.svg"),
        formatter: (name) => `Om${name}`,
        processWithSVGO: true,
      },
    ],
    projectUrl: "https://openmoji.org/",
    license: "CC BY-SA 4.0",
    licenseUrl:
      "https://github.com/hfg-gmuend/openmoji/blob/master/LICENSE.txt",
    source: {
      type: "git",
      localName: "openmoji",
      remoteDir: "black/svg/",
      url: "https://github.com/hfg-gmuend/openmoji.git",
      branch: "master",
      hash: "c3596a904058f739735c092cdcdaf4535082e849",
    },
  },
  {
    id: "pi",
    name: "Phosphor Icons",
    contents: [
      {
        files: path.resolve(
          __dirname,
          "../../icons/phosphor-icons/assets/*/*.svg",
        ),
        formatter: (name) => `Pi${name}`,
      },
    ],
    projectUrl: "https://github.com/phosphor-icons/core",
    license: "MIT",
    licenseUrl: "https://github.com/phosphor-icons/core/blob/main/LICENSE",
    source: {
      type: "git",
      localName: "phosphor-icons",
      remoteDir: "assets/",
      url: "https://github.com/phosphor-icons/core.git",
      branch: "main",
      hash: "21d20a910b38d36b31f9e1b2fd96fe7b9fc6ab0d",
    },
  },
  {
    id: "po",
    name: "Polaris",
    contents: [
      {
        files: path.resolve(
          __dirname,
          "../../icons/polaris/polaris-icons/icons/*.svg",
        ),
        formatter: (name) => `Po${name}`,
        processWithSVGO: true,
      },
    ],
    projectUrl: "https://polaris.shopify.com/",
    license: "MIT",
    licenseUrl: "https://github.com/Shopify/polaris/blob/main/LICENSE.md",
    source: {
      type: "git",
      localName: "polaris",
      remoteDir: "polaris-icons/icons/",
      url: "https://github.com/Shopify/polaris.git",
      branch: "main",
      hash: "358cd1853b7716fa270e056a798f6821712d42a6",
    },
  },
  {
    id: "ri",
    name: "Remix Icon",
    contents: [
      {
        files: path.resolve(__dirname, "../../icons/RemixIcon/icons/*/*.svg"),
        formatter: (name) => `Ri${name}`,
      },
    ],
    projectUrl: "https://github.com/Remix-Design/RemixIcon",
    license: "Apache License Version 2.0",
    licenseUrl: "https://www.apache.org/licenses/",
    source: {
      type: "git",
      localName: "RemixIcon",
      remoteDir: "icons/",
      url: "https://github.com/Remix-Design/RemixIcon.git",
      branch: "master",
      hash: "3c4f3ff316c8ebe1b8838c211ecaf8348d203049",
    },
  },
  {
    id: "rx",
    name: "Radix Icons",
    contents: [
      {
        files: path.resolve(
          __dirname,
          "../../icons/radix-icons/packages/radix-icons/icons/*.svg",
        ),
        formatter: (name) => `Rx${camelcase(name, { pascalCase: true })}`,
      },
    ],
    projectUrl: "https://icons.radix-ui.com",
    license: "MIT",
    licenseUrl: "https://github.com/radix-ui/icons/blob/master/LICENSE",
    source: {
      type: "git",
      localName: "radix-icons",
      remoteDir: "packages/radix-icons/icons/",
      url: "https://github.com/radix-ui/icons.git",
      branch: "master",
      hash: "94b3fcf4e972566b34cb3b3a36296f70a2558dfa",
    },
  },
  {
    id: "si",
    name: "Simple Icons",
    contents: [
      {
        files: path.resolve(__dirname, "../../icons/simple-icons/icons/*.svg"),
        formatter: (name) => `Si${name}`,
      },
    ],
    projectUrl: "https://simpleicons.org/",
    license: "CC0 1.0 Universal",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    source: {
      type: "git",
      localName: "simple-icons",
      remoteDir: "icons/",
      url: "https://github.com/simple-icons/simple-icons.git",
      branch: "develop",
      hash: "4f49347c5fe6793d8ed5b576bb21d4702b0556c1",
    },
  },
  {
    id: "sl",
    name: "Simple Line Icons",
    contents: [
      {
        files: path.resolve(
          __dirname,
          "../../icons/simple-line-icons/src/svgs/*.svg",
        ),
        formatter: (name) => `Sl${name}`,
      },
    ],
    projectUrl: "https://thesabbir.github.io/simple-line-icons/",
    license: "MIT",
    licenseUrl: "https://opensource.org/licenses/MIT",
    source: {
      type: "git",
      localName: "simple-line-icons",
      remoteDir: "src/svgs/",
      url: "https://github.com/thesabbir/simple-line-icons.git",
      branch: "master",
      hash: "f3ed94dd797bdcab52d6f27ba589aea4bb6f3e4d",
    },
  },
  {
    id: "tb",
    name: "Tabler Icons",
    contents: [
      {
        files: path.resolve(__dirname, "../../icons/tabler-icons/icons/*.svg"),
        formatter: (name) => `Tb${name}`,
      },
    ],
    projectUrl: "https://github.com/tabler/tabler-icons",
    license: "MIT",
    licenseUrl: "https://opensource.org/licenses/MIT",
    source: {
      type: "git",
      localName: "tabler-icons",
      remoteDir: "icons/",
      url: "https://github.com/tabler/tabler-icons.git",
      branch: "master",
      hash: "551d78c55786f204935daf803fe148ce031385a8",
    },
  },
  {
    id: "tfi",
    name: "Themify Icons",
    contents: [
      {
        files: path.resolve(__dirname, "../../icons/themify-icons/SVG/*.svg"),
        formatter: (name) => `Tfi${name}`,
      },
    ],
    projectUrl: "https://github.com/lykmapipo/themify-icons",
    license: "MIT",
    licenseUrl:
      "https://github.com/thecreation/standard-icons/blob/master/modules/themify-icons/LICENSE",
    source: {
      type: "git",
      localName: "themify-icons",
      remoteDir: "SVG/",
      url: "https://github.com/lykmapipo/themify-icons.git",
      branch: "master",
      hash: "9600186b24a7242f0e1e0a186983e6253301bb5d",
    },
  },
  {
    id: "ti",
    name: "Typicons",
    contents: [
      {
        files: path.resolve(__dirname, "../../icons/typicons/src/svg/*.svg"),
        formatter: (name) => `Ti${name}`,
      },
    ],
    projectUrl: "https://s-ings.com/typicons/",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    source: {
      type: "git",
      localName: "typicons",
      remoteDir: "src/svg/",
      url: "https://github.com/stephenhutchings/typicons.font.git",
      branch: "master",
      hash: "0aa64f6ce8b892a83aeeafa42c74fb9c1f22ec84",
    },
  },
  {
    id: "vsc",
    name: "VS Code Icons",
    contents: [
      {
        files: path.resolve(
          __dirname,
          "../../icons/vscode-icons/src/icons/*.svg",
        ),
        formatter: (name) => `Vsc${name}`,
      },
    ],
    projectUrl: "https://github.com/microsoft/vscode-codicons",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    source: {
      type: "git",
      localName: "vscode-icons",
      remoteDir: "src/icons/",
      url: "https://github.com/microsoft/vscode-codicons.git",
      branch: "main",
      hash: "6d42d5729e9a41b55d031525e042ebb569f1380a",
    },
  },
  {
    id: "wi",
    name: "Weather Icons",
    contents: [
      {
        files: path.resolve(__dirname, "../../icons/weather-icons/svg/*.svg"),
        formatter: (name) => name,
      },
    ],
    projectUrl: "https://erikflowers.github.io/weather-icons/",
    license: "SIL OFL 1.1",
    licenseUrl: "https://scripts.sil.org/OFL",
    source: {
      type: "git",
      localName: "weather-icons",
      remoteDir: "svg/",
      url: "https://github.com/erikflowers/weather-icons.git",
      branch: "master",
      hash: "bb80982bf1f43f2d57f9dd753e7413bf88beb9ed",
    },
  },
];
