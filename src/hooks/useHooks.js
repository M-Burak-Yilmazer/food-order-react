import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "something get wrong");
  }

  return resData;
}

export default function useHooks(url, config, initialData) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async function sendRequest() {
      setLoading(true);

      try {
        const resData =await  sendHttpRequest(url, config);
        setData(resData);
      } catch (error) {
        setError(error.message || "something get wrong");
      }
      setLoading(false);
    },
    [url, config]
  );

   useEffect(() => {
     if ((config && (config.method === "GET" || !config.method)) || !config) {
       sendRequest();
     }
   }, [sendRequest, config]);
  return {
    data,
    loading,
    error,
    sendRequest,
  };
}
