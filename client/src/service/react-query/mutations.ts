import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  createSubUser,
  deleteAuthorUser,
  deleteSubUser,
  signIn,
} from "../api/db-api";
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, string>) => createSubUser(data),
    onSuccess: async () => {
      toast.success("Success", {
        description: "Sub user created successfully",
      });
      queryClient.invalidateQueries({
        queryKey: ["subUsers"],
      });
    },
    onError: (error: any) => {
      toast.error("Error", {
        description: error.response.data.error.message || "An error occurred",
      });
    },
  });
};

export const useDeleteAuthorUserMutation = () => {
  const signOutStore = useAuthStore((state) => state.signOut);
  return useMutation({
    mutationFn: () => deleteAuthorUser(),
    onSuccess: () => {
      toast.success("Success", {
        description: "User and all subusers deleted successfully",
      });
      signOutStore();
    },
    onError: (error: any) => {
      toast.error("Error", {
        description: error.response.data.error.message || "An error occurred",
      });
    },
  });
};

export const useDeleteSubUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (subUserId: string) => deleteSubUser(subUserId),
    onSuccess: () => {
      toast.success("Success", {
        description: "Sub user deleted successfully",
      });
      queryClient.invalidateQueries({
        queryKey: ["subUsers"],
      });
    },
    onError: (error: any) => {
      toast.error("Error", {
        description: error.response.data.error.message || "An error occurred",
      });
    },
  });
};
