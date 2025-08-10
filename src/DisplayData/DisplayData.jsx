import React, { useCallback, useEffect, useState } from "react";

const DisplayData = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchData = async () => {
        if (query.trim() === "") {
          console.log("Query is empty, skipping fetch.");
          setData([]);
          return;
        }

        try {
          console.log("Fetching data for query:", query);
          setLoading(true);
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts?q=${encodeURIComponent(
              query
            )}`
          );
          const result = await response.json();
          console.log("Fetched data:", result);
          setData(result);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, 5000);

    return () => clearTimeout(timer);
  }, [query]);

  const handleInput = useCallback((e) => {
    const value = e.target.value;
    console.log("Input changed:", value);
    setQuery(value);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        placeholder="Search data"
        onChange={handleInput}
        style={{ marginBottom: "10px", padding: "5px", width: "300px" }}
      />

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row) => (
                <tr key={row.id}>
                  <td>{row.userId}</td>
                  <td>{row.title}</td>
                  <td>{row.body}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DisplayData;