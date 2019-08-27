import Spotify from "./Spotify";

const token =
  "BQDFfTywYCP7zNuKFuu_u9sn4iRV_z9OTBZFm6e_iDO9SX2t01-5YDF-tuUz9-d30K6QcIAzn5GyayrNlaILOXi-5l3ivMQ5So2Fbj4nLeJygIlvH0skg2RjlCZhUJY8kHHnddr6XF-tcOWmIa9pMPj2D02JfMZzHco2Nw3F01-hx2UnmNN8";
const api = "https://api.spotify.com/v1/";

const spotify = Spotify();

describe("Spotify Web API Module", () => {
  describe("search", () => {
    // it("should add a category when the where method is added", () => {
    //   const query = spotify
    //     .search("tania bowra")
    //     .where("type", "artist")
    //     .return();

    //   expect(query).toBe("search?q=tania%20bowra&type=artist");
    // });
    // it("should add a multiple categories when the where or add method is added", () => {
    //   const query = spotify
    //     .search("tania bowra")
    //     .where("type", "artist")
    //     .and("offset", 20)
    //     .and("limit", 2)
    //     .and("market", "US")
    //     .return();

    //   expect(query).toBe(
    //     "search?q=tania%20bowra&type=artist&offset=20&limit=2&market=US"
    //   );
    // });
    it("test", () => {
      const query = spotify
        .search("tania bowra")
        .where({ type: "artist", offset: 20, limit: 2, market: "US" });
      console.log(query);
      expect(query).toBe(
        "search?q=tania%20bowra&type=artist&offset=20&limit=2&market=US"
      );
    });
  });
});
