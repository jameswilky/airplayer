import { arrayToObject } from "./ObjectUtils";

const array = [
  {
    height: 640,
    url: "https://i.scdn.co/image/354aa96c91e25bb43cc39e27e0aee457ea513558",
    width: 640
  },
  {
    height: 300,
    url: "https://i.scdn.co/image/b16c066fb296b81da80aa8de9295c9798bd4c0c3",
    width: 300
  },
  {
    height: 64,
    url: "https://i.scdn.co/image/2e689c6b2f0ad1d3d2b548d512de5f2e1435383a",
    width: 64
  }
];
describe("ObjectUtils", () => {
  describe("arrayToObject", () => {
    it("should convert an array into an object", () => {
      const object = arrayToObject(array);
      expect(typeof object).toBe("object");
      expect(object instanceof Array).toBe(false);
    });
    it("should create an object from an array indexed with numbers if no array is passed", () => {
      const object = arrayToObject(array);
      expect(Object.keys(object)[0]).toEqual("0");
    });
    it("should create an object from an array indexed with the names specified", () => {
      const object = arrayToObject(array, ["large", "medium", "small"]);
      expect(Object.keys(object)[0]).toEqual("large");
    });
    it("should return an object with a default property containing the first element of the array if both array arguments are a different length", () => {
      const object = arrayToObject(array, ["large", "medium"]);
      expect(object.default).toEqual(array[0]);
    });
  });
});
