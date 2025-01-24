import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
	cloud_name: 'dh32zavox',
	api_key: '339759459925196',
	api_secret: 'gCDXDzEw98Rs_596ateOENhBA5Q',
});

export default cloudinary;
