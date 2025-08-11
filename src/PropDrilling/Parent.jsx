import React, { useState } from "react";
import Child from "./Child";
const Parent = () => {
  const [country, setCountry] = useState("India");

  return (
    <div>
      <h1>Parent: {country}</h1>

      <button onClick={() => setCountry("USA")}> change Country</button>
      <Child country={country} />
    </div>
  );
};

export default Parent;
