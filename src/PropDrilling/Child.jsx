import React, { useEffect, useState } from "react";

const Child = ({ country }) => {
  const [localCountry, setLocalCountry] = useState(country);

  useEffect(() => {
    setLocalCountry(country);
  }, [country]);

  return (
    <div>
      <h1>Child: {localCountry}</h1>
    </div>
  );
};

export default Child;
