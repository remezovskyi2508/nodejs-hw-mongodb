import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config();

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

export const TEMPLATES_DIR = path.resolve('src', 'templates');

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');

export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const CLOUDINARY = {
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
};
