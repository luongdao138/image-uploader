const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = async (base64File) => {
  try {
    const res = await cloudinary.uploader.upload(base64File, {
      upload_preset: 'social_mern',
    });

    return {
      public_id: res.public_id,
      secure_url: res.secure_url,
    };
  } catch (error) {
    console.log(error);
  }
};
