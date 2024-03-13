import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending: isLoginIn } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: user => {
      queryClient.setQueryData(["user"], user.user);
      toast.success("Login successful");
      navigate("/");
    },
    onError: () => toast.error("Invalid email or password"),
  });

  return { login, isLoginIn };
}
