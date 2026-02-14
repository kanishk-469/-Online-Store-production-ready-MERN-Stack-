import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, {
          headers: {},
          body: {},
        });

        const data = await response.json();

        setData(data);
        setLoading(false);
        console.log(data);
      } catch (err) {
        console.log(err);
        setError(err);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
