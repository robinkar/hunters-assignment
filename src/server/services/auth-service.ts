import * as jwt from 'jsonwebtoken';

const JWT_SIGNING_SECRET = process.env.JWT_SIGNING_SECRET;

const generateJwtForUserId = (userId: string) => jwt.sign({ userId }, JWT_SIGNING_SECRET);

export const AuthService = () => ({
	generateJwtForUserId,
});
