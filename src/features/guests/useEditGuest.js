import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createEditGuest } from "../../services/apiGuests";

export function useEditGuest() {
  const queryClient = useQueryClient();

  const { mutate: editGuest, isPending: isEditing } = useMutation({
    mutationFn: ({ newGuestData, id }) => createEditGuest(newGuestData, id),
    onSuccess: () => {
      toast.success("Guest successfully edited");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: error => toast.error(error.message),
  });
  return { editGuest, isEditing };
}
