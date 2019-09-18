import {
  getNestedProperty,
  getKey,
  arrayToObject
} from "../../helpers/ObjectUtils";

const fallbackImages = {
  large: {
    height: 500,
    width: 500,
    url: "https://i.ibb.co/Hh9dXJQ/medium-removebg-preview.png"
  },
  medium: {
    height: 300,
    width: 300,
    url: "https://i.ibb.co/vjZVL4p/large-removebg-preview.png"
  },
  small: {
    height: 64,
    width: 64,
    url: "https://i.ibb.co/608nyr6/small-removebg-preview.png"
  }
};

const mapImages = images => arrayToObject(images, ["large", "medium", "small"]);

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
          return this.album.images.length < 1
            ? mapImages(fallbackImages)
            : mapImages(this.album.images);
        default:
          return this.images.length < 1
            ? mapImages(fallbackImages)
            : mapImages(this.images);
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
