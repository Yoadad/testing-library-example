import { useQuery } from "react-query";
import api from "../../api";

async function getItems() {
  const res = await api.get("/reminders");

  return res.data.reminders;
}

export function useGetItems() {
  return useQuery({
    queryKey: "items",
    queryFn: getItems,
  });
}
