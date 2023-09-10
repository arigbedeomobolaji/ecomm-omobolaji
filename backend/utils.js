import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import keys from './config/keys.js';

export const generateAuthToken = (user) => {
	const token = jwt.sign(
		{
			email: user.email,
			isAdmin: user.isAdmin,
			_id: user._id,
		},
		keys.JWT_SECRET,
		{
			// expiresIn: '1d',
			expiresIn: '60000s',
		}
	);
	return token;
};

export const verifyAuthToken = expressAsyncHandler(async (req, res, next) => {
	const authToken = req.headers.authorization.replace('Bearer ', '');
	if (!authToken) {
		return res.status(404).send({ error: 'No auth token found.' });
	}
	jwt.verify(authToken, keys.JWT_SECRET, (error, decoded) => {
		if (!error && decoded._id) {
			req.user = decoded;
			next();
		} else {
			return res.status(401).send({ error: 'Invalid token' });
		}
	});
});

export const isAdmin = expressAsyncHandler(async (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401).send({ error: "You're not an Admin." });
	}
});
