import { api } from "./apiConfig";
import { SignInResponse, User } from "@/lib/types/globalTypes";

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
    if (error instanceof Error) {
      console.error("signIn error: ", error.message);
      throw new Error(`SignIn failed: ${error.message}`);
    } else {
      console.error("signIn error: Unknown error");
      throw new Error("SignIn failed: An unknown error occurred.");
    }
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
    if (error instanceof Error) {
      console.error("createSubUser error: ", error.message);
      throw new Error(`Failed to create sub user: ${error.message}`);
    } else {
      console.error("createSubUser error: Unknown error");
      throw new Error("Failed to create sub user: An unknown error occurred.");
    }
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
    if (error instanceof Error) {
      console.error("getSubUsers error: ", error.message);
      throw new Error(`Failed to get sub users: ${error.message}`);
    } else {
      console.error("getSubUsers error: Unknown error");
      throw new Error("Failed to get sub users: An unknown error occurred.");
    }
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
    if (error instanceof Error) {
      console.error("deleteAuthorUser error: ", error.message);
      throw new Error(`Failed to delete author user: ${error.message}`);
    } else {
      console.error("deleteAuthorUser error: Unknown error");
      throw new Error(
        "Failed to delete author user: An unknown error occurred."
      );
    }
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
    if (error instanceof Error) {
      console.error("deleteSubUser error: ", error.message);
      throw new Error(`Failed to delete sub user: ${error.message}`);
    } else {
      console.error("deleteSubUser error: Unknown error");
      throw new Error("Failed to delete sub user: An unknown error occurred.");
    }
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
    if (error instanceof Error) {
      console.error("getAuthUser error: ", error.message);
      throw new Error(`Failed to get auth user: ${error.message}`);
    } else {
      console.error("getAuthUser error: Unknown error");
      throw new Error("Failed to get auth user: An unknown error occurred.");
    }
  }
};
