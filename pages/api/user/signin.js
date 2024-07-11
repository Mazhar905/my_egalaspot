import dotenv from "dotenv";
dotenv.config();
import mongooseConnect from "@/lib/mongoose";
import User from "@/pages/api/db/model/userSchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
	if (req.method === "POST") {
		await mongooseConnect();

		const { email, password } = req.body;
		try {
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ message: "User is not exists" });
			}
			const isPasswordValid = await bcrypt.compare((user.password).toString(), (password).toString());
			if (isPasswordValid) {
				return res.status(401).json({ message: "Invalid password" });
			}
			// Generate  token
			// const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
			function generateRandomToken(length) {
				const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
				let token = "";
				for (let i = 0; i < length; i++) {
					token += chars.charAt(Math.floor(Math.random() * chars.length));
				}
				return token;
			}

			// Generate a 15-character random token
			const token = generateRandomToken(15);
			// Save token and expiry date in the database
			user.token = token;
			user.tokenExpiry = Date.now() + 7200000; // 1 hour in milliseconds
			await user.save();
			res.status(200).json({ message: "Login successful", data: user });
		} catch (error) {
			res.status(401).json({ message: "Invalid email or password" });
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
