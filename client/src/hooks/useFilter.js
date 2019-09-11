import { useState } from "react";

export default function useFilter() {
  const [songFilterIsActive, setSongFilterIsActive] = useState(false);
  return { songFilterIsActive, setSongFilterIsActive };
}
