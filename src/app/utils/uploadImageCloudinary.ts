import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import multer from "multer";
import { config } from "../config";

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const uploadImageCloudinary = async (
  imageName: string,
  path: string
) => {
  console.log({ imageName, path }, "Uploading to Cloudinary");

  try {
    const result = await cloudinary.uploader.upload(path, {
      public_id: `dreams-trip-car-rental-reservation-system/${imageName.trim()}`,
      resource_type: 'auto'
    });

    // Delete file after successful upload
    try {
      await fs.promises.unlink(path);
      console.log('Local file deleted successfully');
    } catch (deleteError) {
      console.error('Error deleting local file:', deleteError);
    }

    return result;
  } catch (uploadError) {
    console.error('Cloudinary upload failed:', uploadError);
    
    // Attempt to delete file even if upload failed
    try {
      await fs.promises.unlink(path);
      console.log('Deleted local file after failed upload');
    } catch (deleteError) {
      console.error('Error deleting local file after failed upload:', deleteError);
    }

    throw uploadError; // Re-throw to allow calling code to handle the error
  }
};
export const deleteImageCloudinary = async (url: string) => {
  const public_id = `dreams-trip-car-rental-reservation-system/${
    url.split("/").slice(-1)[0].split(".")[0]
  }`;
  await cloudinary.uploader.destroy(public_id);
  return;
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
