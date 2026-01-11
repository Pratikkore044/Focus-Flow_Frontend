import apiInstance from "./index.api.js";

export const getMeApi = async () => {
  try {
    const response = await apiInstance.get("/auth/me");
    return [response.data.data, null];
  } catch (error) {
    return [
      null,
      error?.response?.data?.message || "Failed to fetch user",
    ];
  }
};
