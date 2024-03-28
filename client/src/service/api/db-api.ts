import { api } from "./apiConfig";
import { AuthUser, SignInResponse, User } from "@/lib/types/globalTypes";

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
      console.error(
        `signIn failed with status: ${response.status} and statusText: ${response.statusText}`
      );
      throw new Error(`SignIn failed: ${response.statusText}`);
    }

    if (!response.data?.user || !response.data?.token) {
      console.error("signIn: Missing user or token in the response data");
      throw new Error("SignIn failed: Server returned an incomplete response.");
    }

    return response.data;
  } catch (error) {
    console.error("signIn error: ", error);
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
      console.error(
        `createSubUser failed with status: ${response.status} and statusText: ${response.statusText}`
      );
      throw new Error(`Failed to create sub user: ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    console.error("createSubUser error: ", error);
    throw error;
  }
};

export const getSubUsers = async (): Promise<Partial<User[]>> => {
  try {
    const response = await api.get("/admin/getSubUsers");

    if (response.status !== 200) {
      console.error(
        `getSubUsers failed with status: ${response.status} and statusText: ${response.statusText}`
      );
      throw new Error(`Failed to get sub users: ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    console.error("getSubUsers error: ", error);
    throw error;
  }
};

export const deleteAuthorUser = async (): Promise<{ message: string }> => {
  try {
    const response = await api.delete("/admin/deleteAuthorUser");

    if (response.status !== 200) {
      console.error(
        `deleteAuthorUser failed with status: ${response.status} and statusText: ${response.statusText}`
      );
      throw new Error(`Failed to delete author user: ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    console.error("deleteAuthorUser error: ", error);
    throw error;
  }
};

export const deleteSubUser = async (
  subUserId: string
): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/admin/deleteSubUser/${subUserId}`);

    if (response.status !== 200) {
      console.error(
        `deleteSubUser failed with status: ${response.status} and statusText: ${response.statusText}`
      );
      throw new Error(`Failed to delete sub user: ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    console.error("deleteSubUser error: ", error);
    throw error;
  }
};

export const getAuthUser = async (): Promise<Partial<User>> => {
  try {
    const response = await api.get("/admin/getAuthUser");

    if (response.status !== 200) {
      console.error(
        `getAuthUser failed with status: ${response.status} and statusText: ${response.statusText}`
      );
      throw new Error(`Failed to get auth user: ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    console.error("getAuthUser error: ", error);
    throw error;
  }
};

export const updateUserDetails = async (
  data: Record<string, string>
): Promise<AuthUser> => {
  try {
    const response = await api.put("/admin/updateUserDetails", {
      ...data,
    });

    if (response.status !== 200) {
      console.error(
        `updateUserDetails failed with status: ${response.status} and statusText: ${response.statusText}`
      );
      throw new Error(`Failed to update user details: ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    console.error("updateUserDetails error: ", error);
    throw error;
  }
};
