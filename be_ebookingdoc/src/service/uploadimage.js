// src/service/uploadimgame.js
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs').promises;
const crypto = require('crypto');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

const uploadImageToCloudinary = async (filePath, folder = 'uploads') => {
  try {
    console.log('Environment variables:', {
      CLOUD_NAME: process.env.CLOUD_NAME,
      CLOUD_API_KEY: process.env.CLOUD_API_KEY,
      CLOUD_API_SECRET: process.env.CLOUD_API_SECRET?.substring(0, 4) + '...',
      CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET || 'Not set',
    });

    if (!process.env.CLOUD_NAME || !process.env.CLOUD_API_KEY || !process.env.CLOUD_API_SECRET) {
      throw new Error('Missing required Cloudinary environment variables');
    }

    if (!process.env.CLOUDINARY_UPLOAD_PRESET) {
      throw new Error('CLOUDINARY_UPLOAD_PRESET is not set');
    }

    await fs.access(filePath).catch(() => {
      throw new Error(`File does not exist or is inaccessible: ${filePath}`);
    });
    console.log('File path valid:', filePath);

    const timestamp = Math.round(new Date().getTime() / 1000);
    const paramsToSign = {
      folder: folder,
      timestamp: timestamp,
      unique_filename: 'false',
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
      use_filename: 'true',
    };

    const stringToSign = Object.keys(paramsToSign)
      .sort()
      .map((key) => `${key}=${paramsToSign[key]}`)
      .join('&');

    console.log('String to sign (before secret):', stringToSign);
    console.log('API Secret used (partial):', process.env.CLOUD_API_SECRET?.substring(0, 4) + '...');

    const signature = crypto
      .createHash('sha1')
      .update(stringToSign + process.env.CLOUD_API_SECRET)
      .digest('hex');

    console.log('Computed signature:', signature);

    const uploadParams = {
      folder: folder,
      use_filename: true,
      unique_filename: false,
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
      timestamp: timestamp,
      signature: signature,
      api_key: process.env.CLOUD_API_KEY,
    };
    console.log('Upload parameters:', uploadParams);

    const result = await cloudinary.uploader.upload(filePath, uploadParams);

    console.log('Cloudinary upload result:', {
      public_id: result.public_id,
      secure_url: result.secure_url,
    });

    await fs.unlink(filePath).catch((err) => {
      console.warn(`Failed to delete local file ${filePath}: ${err.message}`);
    });
    console.log('Local file deleted:', filePath);

    return result.secure_url;
  } catch (error) {
    console.error('Image upload error:', {
      message: error.message,
      http_code: error.http_code || 'N/A',
      string_to_sign: error.string_to_sign || 'N/A',
      stack: error.stack || 'N/A',
    });
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};

module.exports = { uploadImageToCloudinary };