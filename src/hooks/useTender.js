// src/hooks/useTender.js

import { useEffect } from "react";
import { useTenderStore } from "../store/tenderStore";
import { getTenders } from "../services/tenderService";

const useTender = () => {
  const { setTenders } = useTenderStore();

  const fetchTenders = async () => {
    const data = await getTenders();
    if (data) setTenders(data);
  };

  useEffect(() => {
    fetchTenders();
  }, []);

  return { fetchTenders };
};

export default useTender;