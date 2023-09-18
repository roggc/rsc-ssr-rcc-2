import React from "react";
import Home from "../../client/components/home.js";

export default async function HomeRSC() {
  const name = await new Promise((r) => setTimeout(() => r("Roger"), 3000));
  return <Home __isClient__="../components/home.js" name={name} />;
}
