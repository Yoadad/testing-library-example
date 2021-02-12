import { useMutation, useQueryClient } from "react-query";
import api from "../../api";

async function deleteITem({ id }) {
  const res = await api.delete(`/reminders/${id}`);

  return res.data.reminder;
}

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation(deleteITem, {
    onSuccess: () => {
      queryClient.invalidateQueries("items");
    },
  });
}
