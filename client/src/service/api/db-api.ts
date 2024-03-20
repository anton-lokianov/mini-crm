import { api } from "./apiConfig";
import { SignInResponse, SubUser } from "@/lib/types/globalTypes";

export const signIn = async ({
  userName,
  password,
}: {
  userName: string;
  password: string;
}): Promise<SignInResponse> => {
  try {
    const response = await api.post("/auth/login", {
      userName,
      password,
    });

    if (response.status !== 200) {
      throw new Error("something went wrong. with sign in.");
    }

    if (!response?.data?.user || !response?.data?.token) {
      throw new Error("Invalid response from server.");
    }

    return response.data;
  } catch (error) {
    console.error("signIn", error);
    throw error;
  }
};

export const createSubUser = async (
  data: Record<string, string>
): Promise<{ message: string }> => {
  try {
    const response = await api.post("/admin/createSubUser", {
      ...data,
    });

    if (response.status !== 201) {
      throw new Error("something went wrong with creating sub user");
    }

    return response.data;
  } catch (error) {
    console.error("createSubUser", error);
    throw error;
  }
};

export const getSubUsers = async (): Promise<SubUser[]> => {
  try {
    const response = await api.get("/admin/getSubUsers");

    if (response.status !== 200) {
      throw new Error("something went wrong with getting sub users.");
    }

    return response.data;
  } catch (error) {
    console.error("getSubUsers", error);
    throw error;
  }
};

export const deleteAuthorUser = async (): Promise<{ message: string }> => {
  try {
    const response = await api.delete("/admin/deleteAuthorUser");

    if (response.status !== 200) {
      throw new Error("something went wrong. with deleting author user.");
    }

    return response.data;
  } catch (error) {
    console.error("deleteAuthorUser", error);
    throw error;
  }
};

export const deleteSubUser = async (
  subUserId: string
): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/admin/deleteSubUser/${subUserId}`);

    if (response.status !== 200) {
      throw new Error("something went wrong. with deleting sub user.");
    }

    return response.data;
  } catch (error) {
    console.error("deleteSubUser", error);
    throw error;
  }
};
