import { api } from "./apiConfig";
import { SignInResponse } from "@/lib/types/globalTypes";

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
      throw new Error("something went wrong.");
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
      throw new Error("something went wrong.");
    }

    return response.data;
  } catch (error) {
    console.error("createSubUser", error);
    throw error;
  }
};
