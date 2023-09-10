import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import keys from '../config/keys.js';
import { verifyAuthToken, isAdmin } from '../utils.js';

const S3 = new AWS.S3({
	accessKeyId: keys.AWS_ACCESS_KEY,
	secretAccessKey: keys.AWS_SECRET_KEY,
	region: keys.AWS_REGION,
	signatureVersion: 'v4',
});
const uploadRouter = express.Router();

uploadRouter.get(
	'',
	verifyAuthToken,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const objectname = uuidv4();
		const key = `${objectname}.jpeg`;
		const params = {
			Bucket: keys.BUCKET_NAME,
			Key: key,
			ContentType: 'image/jpeg',
		};
		S3.getSignedUrl('putObject', params, (error, url) => {
			if (error) {
				return res.status(401).send({ message: error });
			}

			res.send({ url, key });
		});
	})
);

export default uploadRouter;
