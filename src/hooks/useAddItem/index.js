import { useMutation, useQueryClient } from "react-query";
import api from "../../api";

async function addItem({ text }) {
  const res = await api.post("/reminders", { text });

  return res.data.reminder;
}

export function useAddItem() {
  const queryClient = useQueryClient();

  return useMutation(addItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("items");
    },
  });
}
