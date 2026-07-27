import { postRequest } from "./httpServices";
import { API_ROUTES } from "./route";

export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await postRequest(API_ROUTES.UPLOAD, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error uploading file in service:", error);
    throw error;
  }
};
