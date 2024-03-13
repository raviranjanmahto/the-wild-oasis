import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLogginOut } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
      toast.success("You have successfully logged out!");
    },
  });

  return { logout, isLogginOut };
}
