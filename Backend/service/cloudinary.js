// cloudinary.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
  cloud_name: "dzgt8rlge",
  api_key: "338542295421347",
  api_secret: "U45IhgD_C0jlozcJPCzy97Dv6C4",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blogs', // optional: folder name on Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 800, height: 600, crop: 'limit' }],
  },
});

module.exports = {
  cloudinary,
  storage,
};
