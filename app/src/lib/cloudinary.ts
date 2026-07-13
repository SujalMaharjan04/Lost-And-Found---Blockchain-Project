import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "./constants";

/**
 * Uploads an image straight from the browser to Cloudinary using an
 * *unsigned* upload preset, then returns the hosted URL. Only that URL (a
 * short string) ever gets written on-chain — never the image bytes
 * themselves, which would be far too expensive as account rent.
 */
export async function uploadImageToCloudinary(file: File): Promise<string> {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error(
      "Cloudinary is not configured. Set VITE_CLOUDINARY_CLOUD_NAME and " +
        "VITE_CLOUDINARY_UPLOAD_PRESET in app/.env"
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Cloudinary upload failed: ${body}`);
  }

  const data = await response.json();
  return data.secure_url as string;
}
