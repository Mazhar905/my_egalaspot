import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
	username: { type: String, required: [true, "Please provide a username"] },
	full_name: { type: String, required: true },
	email: { type: String, required: [true, "Please provide a email"], unique: true },
	password: { type: String, required: [true, "Please provide a password"] },
	role: { type: String, enum: ["user", "admin"], default: "user" },
	isVerified: { type: Boolean, default: false },
	forgotPasswordToken: String,
	forgotPasswordTokenExpiry: Date,
	verifyToken: String,
	verifyTokenExpiry: Date,
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

userSchema.methods.comparePassword = function (password) {
	return bcrypt.compare(password, this.password);
};

export default mongoose.models.User || mongoose.model("User", userSchema);
