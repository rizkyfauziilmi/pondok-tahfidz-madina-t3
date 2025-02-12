"use server";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const uploadthingImageUploader = async (file: File) => {
  const response = await utapi.uploadFiles(file);

  if (response.error) {
    throw new Error(response.error.message);
  }

  return {
    id: response.data.key,
    src: response.data.ufsUrl,
  };
};

export const deleteFileAction = async (id: string) => {
  await utapi.deleteFiles(id);
};

export const uploadFilesAction = async (files: File[]) => {
  const response = await utapi.uploadFiles(files);

  return response
    .filter((file) => !file.error)
    .map((file) => ({
      id: file.data.key,
      src: file.data.ufsUrl,
    }));
};
