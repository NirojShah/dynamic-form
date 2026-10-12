import { model, Schema } from "mongoose";

const FileStorageSchema = new Schema(
  {
    originalName: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
  },
  { timestamps: true }
);

const FileStorage = model("FileStorage", FileStorageSchema);

export default FileStorage;