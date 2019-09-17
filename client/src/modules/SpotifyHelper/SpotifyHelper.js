import { getNestedProperty } from "../../helpers/ObjectUtils";

const ItemPrototype = () => {
  return { poop: "test" };
};
export default function SpotifyHelper(obj) {
  return Object.assign({}, obj, {
    getItems: function() {
      const items = getNestedProperty("items", obj);
      items.tracks.map(item => Reflect.setPrototypeOf(item, ItemPrototype()));
      return items;
    }
  });
}
