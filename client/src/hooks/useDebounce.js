import { useEffect, useState } from "react";
import useInterval from "./useInterval";

export default function useDebounce(callback, delay, dependencies) {
  const [updated, setUpdated] = useState(false);

  useInterval(
    () => {
      callback();
      setUpdated(false);
    },
    updated ? delay : null
  );
  useEffect(() => {
    setUpdated(true);
  }, dependencies);
}
