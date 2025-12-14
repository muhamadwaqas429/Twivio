import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload a local file to Cloudinary and remove it from local storage
const uploadOnCloudinary = async (localFilePath) => {
  try {
    // If no file path is provided, exit early
    if (!localFilePath) return null;

    // Upload file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // auto-detect image/video
    });

    // Remove file from local server after successful upload
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    // If upload fails, still remove the file to avoid junk storage
    if (localFilePath) {
      fs.unlinkSync(localFilePath);
    }

    console.error("Cloudinary upload failed:", error);
    return null;
  }
};

export { uploadOnCloudinary };
