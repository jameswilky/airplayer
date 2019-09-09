import React, { useState } from "react";

export default function useSearch() {
  const [query, setQuery] = useState("");
  return { query, setQuery };
}
