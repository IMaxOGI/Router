import { useState, useEffect } from "react";
import apiClient from "../api/api-client";

export default function useData(path, initialValue) {
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get(path)
      .then((response) => {
        setIsLoading(false);
        setData(response.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response);
      });
  }, [path]);

  return [data, isLoading, error];
}
