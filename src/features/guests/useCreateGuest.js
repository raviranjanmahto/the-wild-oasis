import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createEditGuest } from "../../services/apiGuests";

export function useCreateGuest() {
  const queryClient = useQueryClient();

  const { mutate: createGuest, isPending: isCreating } = useMutation({
    mutationFn: createEditGuest,
    onSuccess: () => {
      toast.success("Guest successfully created");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: error => toast.error(error.message),
  });
  return { isCreating, createGuest };
}
