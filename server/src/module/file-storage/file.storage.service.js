import FileStorage from "./file.storage.model.js";

const processUploadFile = async (file) => {
  try {
    const stored = await FileStorage.create({
      originalName: file.name,
      mimetype: file.mimetype,
      size: file.size,
      data: file.data,
    });

    return { success: true, fileId: stored._id };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const processGetFile = async (fileId) => {
  try {
    const file = await FileStorage.findById(fileId);
    if (!file) {
      return { success: false, message: "File not found." };
    }

    return { success: true, file };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const fileService = {
  processUploadFile,
  processGetFile,
};

export default fileService;
