import { useEffect, useState, useCallback } from "react";
import useInterval from "./useInterval";

export default function useDebounce(cb, delay, dependencies) {
  const [updated, setUpdated] = useState(false);

  const callback = useCallback(() => {
    cb();
  }, [dependencies]);

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
