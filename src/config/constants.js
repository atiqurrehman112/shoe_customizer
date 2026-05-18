import { swatch, fileIcon, logoShoe, stylishShoe } from "../assets";

export const EditorTabs = [
  {
    name: "filepicker",
    icon: fileIcon,
  },
];

export const FilterTabs = [
  {
    name: "logoShoe",
    icon: logoShoe,
  },
  {
    name: "stylishShoe",
    icon: stylishShoe,
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShoe",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShoe",
  },
};
