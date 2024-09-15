import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import multer from 'multer';
import { config } from '../config';


cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const uploadImageCloudinary = (imageName: string, path: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: `dreams-trip-car-rental-reservation-system/${imageName.trim()}` },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result);
        // delete a file 
        fs.unlink(path, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('File is deleted.');
          }
        });
      },
    );
  });
};
export const deleteImageCloudinary=async(url:string)=>{
  const public_id=`dreams-trip-car-rental-reservation-system/${url.split('/').slice(-1)[0].split('.')[0]}` ;
  await cloudinary.uploader.destroy(public_id);
  return 
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });