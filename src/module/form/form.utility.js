import crypto from "crypto";
import SchemaModel from "./form.model.js";

const SECRET = process.env.SECRET_KEY || "my-super-secret-key";
const algorithm = "aes-256-gcm";

// create 32-byte key
const key = crypto.createHash("sha256").update(SECRET).digest();

/**
 * Convert Base64 → URL-safe Base64
 */
const toBase64Url = (str) =>
  str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

/**
 * Convert URL-safe Base64 → Base64
 */
const fromBase64Url = (str) => {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");

  // add padding back
  while (base64.length % 4) {
    base64 += "=";
  }

  return base64;
};

const encrypter = (id) => {
  try {
    if (!id) return null;

    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    const encrypted = Buffer.concat([
      cipher.update(id.toString(), "utf8"),
      cipher.final(),
    ]);

    const tag = cipher.getAuthTag();

    // iv + tag + encrypted
    const combined = Buffer.concat([iv, tag, encrypted]);

    return toBase64Url(combined.toString("base64"));
  } catch (err) {
    console.error("Encrypt error:", err);
    return null;
  }
};

const decrypter = (encryptedId) => {
  try {
    if (!encryptedId) return null;

    const base64 = fromBase64Url(encryptedId);
    const data = Buffer.from(base64, "base64");

    // sanity check
    if (data.length < 28) return null;

    const iv = data.slice(0, 12);
    const tag = data.slice(12, 28);
    const encrypted = data.slice(28);

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    decipher.setAuthTag(tag);

    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);

    return decrypted.toString("utf8");
  } catch (err) {
    console.error("Decrypt error:", err);
    return null;
  }
};

const updateOpenedValue = async (formId) => {
  try {
    const updateVal = await SchemaModel.findById(formId);
    if (updateVal) {
      updateVal.opened = updateVal.opened + 1;
      await updateVal.save();
      return true;
    }
    return false;
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

export default {
  encrypter,
  decrypter,
  updateOpenedValue,
};
