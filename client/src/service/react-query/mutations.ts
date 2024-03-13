import { useMutation } from "@tanstack/react-query";
import { createSubUser, signIn } from "../api/db-api";
import { useAuthStore } from "../store/auth-store";
import { toast } from "sonner";

export const useSignInMutation = () => {
  const signInStore = useAuthStore((state) => state.signIn);

  return useMutation({
    mutationFn: ({
      userName,
      password,
    }: {
      userName: string;
      password: string;
    }) => signIn({ userName, password }),
    onSuccess: (data) => {
      signInStore(data.token, data.user, data.exertionDate);
    },
    onError: (error: any) => {
      toast.error("Error", {
        description: error.response.data.error.message || "An error occurred",
      });
    },
  });
};

export const useCreateSubUserMutation = () => {
  return useMutation({
    mutationFn: (data: Record<string, string>) => createSubUser(data),
    onSuccess: () => {
      toast.success("Success", {
        description: "Sub user created successfully",
      });
    },
    onError: (error: any) => {
      toast.error("Error", {
        description: error.response.data.error.message || "An error occurred",
      });
    },
  });
};
