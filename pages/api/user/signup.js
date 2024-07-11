import dotenv from "dotenv";
dotenv.config();
import mongooseConnect from "@/lib/mongoose";
import User from "@/pages/api/db/model/userSchema";
import bcrypt from "bcrypt";
export default async function handler(req, res) {
	await mongooseConnect();

	if (req.method === "POST") {
		const { username, full_name, email, password } = req.body;

		try {
			const existingUser = await User.findOne({ email });

			if (existingUser) {
				return res.status(409).json({ message: "User already exists" });
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			const user = new User({
                username,
                full_name,
				email,
				password: hashedPassword,
			});

			await user.save();

			res.status(201).json({ message: "User registered successfully" });
		} catch (error) {
			res.status(500).json({ message: "Internal server error", error });
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
