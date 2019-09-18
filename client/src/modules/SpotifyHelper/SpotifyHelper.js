import { getNestedProperty, getKey } from "../../helpers/ObjectUtils";

const fallbackImages = {
  large: { height: 640, width: 640, url: "" },
  medium: { height: 300, width: 300, url: "" },
  small: { height: 64, width: 64, url: "" }
};

const ItemPrototype = () => {
  return {
    getArtists: function() {
      switch (this.type) {
        case "track":
          return this.album.artists;
        case "album":
          return this.artists;
        case "artists":
          return this;
        default:
          return null;
      }
    },
    getImages: function() {
      switch (this.type) {
        case "track":
          return this.album.images.length < 1 ? null : this.album.images;
        default:
          return this.images.length < 1 ? null : this.images;
      }
    }
  };
};
export default function SpotifyHelper(obj) {
  return Object.assign({}, obj, {
    getItems: function() {
      const items = getNestedProperty("items", obj);
      items[getKey(items)].map(item =>
        Reflect.setPrototypeOf(item, ItemPrototype())
      );
      return items;
    }
  });
}
