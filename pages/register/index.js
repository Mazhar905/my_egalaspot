import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Register() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		full_name: "",
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [loadingSubmitButton, setLoadingSubmitButton] = useState(false);

	const [formErrors, setFormErrors] = useState({
		full_name: "",
		username: "",
		email: false,
		password: undefined,
		confirmPassword: undefined,
	});

	const [settings, setSettings] = useState({
		showPassword: false,
		passwordValid: undefined,
		passwordCriteria: {
			minLength: false,
			uppercase: false,
			specialChar: false,
			number: false,
		},
	});

	useEffect(() => {
		if (formData.password !== "" && formData.confirmPassword !== "") {
			if (formData.password !== formData.confirmPassword) {
				setFormErrors((prevErrors) => ({
					...prevErrors,
					confirmPassword: true,
				}));
			} else {
				setFormErrors((prevErrors) => ({
					...prevErrors,
					confirmPassword: false,
				}));
			}
		}
	}, [formData.password, formData.confirmPassword]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
		if (name === "password") {
			validatePassword(value);
			if (formData.confirmPassword !== "" && value !== formData.confirmPassword) {
				setFormErrors((prevErrors) => ({
					...prevErrors,
					confirmPassword: true,
				}));
			} else {
				setFormErrors((prevErrors) => ({
					...prevErrors,
					confirmPassword: false,
				}));
			}
		} else if (name === "confirmPassword") {
			if (value !== formData.password) {
				setFormErrors((prevErrors) => ({
					...prevErrors,
					confirmPassword: true,
				}));
			} else {
				setFormErrors((prevErrors) => ({
					...prevErrors,
					confirmPassword: false,
				}));
			}
		}
	};

	const validatePassword = (value) => {
		const criteria = {
			minLength: value.length >= 8,
			uppercase: /[A-Z]/.test(value),
			specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
			number: /[0-9]/.test(value),
		};

		setSettings((prevSettings) => ({
			...prevSettings,
			passwordCriteria: criteria,
			passwordValid: Object.values(criteria).every((criterion) => criterion),
		}));
	};

	const validateEmail = (email) => {
		// Regular expression for basic email validation
		const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		return regex.test(email);
	};

	const togglePasswordVisibility = () => {
		setSettings((prevSettings) => ({
			...prevSettings,
			showPassword: !prevSettings.showPassword,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const emailValid = validateEmail(formData.email);
		const passwordValid = settings.passwordValid;

		setFormErrors({
			email: !emailValid,
			password: !passwordValid,
		});

		if (emailValid && passwordValid) {
			if (formData.password !== formData.confirmPassword) {
				setFormErrors({ ...email, password: true });
				return;
			}

			setLoadingSubmitButton(true); // Set loading state to true when adding to cart

			setTimeout(() => {
				setLoadingSubmitButton(false); // Set loading state to false after some delay
			}, 1000); // Change the delay as needed

			try {
				// Call your fetch API here
				const response = await fetch("/api/user/signup", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				});

				// Handle the API response here
				const data = await response.json();
				console.log(data);
				if (response.ok) {
					console.log("Registration successful");
					// Redirect to the previous page or home page
					router.push("/login");
				}
			} catch (error) {
				console.error("Error:", error);
			}
		} else {
			console.log("Password criteria not met or email field is empty");
		}
	};

	const { full_name, username, email, password, confirmPassword } = formData;
	const { showPassword, passwordCriteria } = settings;

	return (
		<div className="flex flex-col justify-center font-sans text-gray-700 sm:h-screen p-4">
			<div className="text-center mb-4">
				<Link href="#">
					<Image src={logo} alt="logo" width={180} height={40} className="inline-block" />
				</Link>
			</div>
			<div className="max-w-md w-full mx-auto border border-gray-300 rounded-md p-6">
				<h2 className="text-2xl text-center text-thin mb-4">SIGN UP</h2>
				<form onSubmit={handleSubmit}>
					<div className="space-y-3">
						<div>
							<input
								name="full_name"
								type="text"
								className={`focus:border-gray-400 border-2 ${formErrors.full_name ? "border-red-500" : ""} w-full text-sm px-4 py-3 rounded-md`}
								placeholder="Enter Your Full Name"
								value={full_name}
								onChange={handleChange}
							/>
						</div>
						<div>
							<input
								name="username"
								type="text"
								className={`focus:border-gray-400 border-2 ${formErrors.username ? "border-red-500" : ""} w-full text-sm px-4 py-3 rounded-md`}
								placeholder="Enter Username"
								value={username}
								onChange={handleChange}
							/>
						</div>{" "}
						<div>
							<input
								name="email"
								type="email"
								className={`focus:border-gray-400 border-2 ${formErrors.email ? "border-red-500" : ""} w-full text-sm px-4 py-3 rounded-md`}
								placeholder="Enter Email"
								value={email}
								onChange={handleChange}
							/>
						</div>
						<div className="relative">
							<input
								name="password"
								type={showPassword ? "text" : "password"}
								className={`focus:border-gray-400 border-2 ${formErrors.password ? "border-red-500 " : ""} w-full text-sm px-4 py-3 rounded-md`}
								placeholder="Enter Password"
								value={password}
								onChange={handleChange}
							/>
							{!showPassword ? (
								<button
									type="button"
									className="text-xs absolute !top-1/2 -translate-y-1/2 right-3 flex items-center text-black"
									onClick={togglePasswordVisibility}
								>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" className="w-[18px] h-[18px]">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
										/>
									</svg>
								</button>
							) : (
								<button
									type="button"
									className="text-xs absolute !top-1/2 -translate-y-1/2 right-2 flex items-center text-black"
									onClick={togglePasswordVisibility}
								>
									<svg xmlns="http://www.w3.org/2000/svg" fill="#9ca3af" stroke="#9ca3af" className="w-[18px] h-[18px] mr-1" viewBox="0 0 128 128">
										<path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
									</svg>
								</button>
							)}
						</div>
						<div className="relative">
							<input
								name="confirmPassword"
								type={showPassword ? "text" : "password"}
								className={`focus:border-gray-400 border-2 ${formErrors.password ? "border-red-500" : ""} w-full text-sm px-4 py-3 rounded-md`}
								placeholder="Enter Confirm Password"
								value={confirmPassword}
								onChange={handleChange}
							/>
						</div>
						<ul
							className={`px-4 grid sm:grid-cols-2 gap-y-1 gap-x-6 w-max list-disc h-9 ${
								settings.passwordValid !== undefined || formErrors.password !== undefined ? "opacity-1" : "opacity-0"
							}`}
						>
							<li className={`text-xs capitalize ${passwordCriteria.minLength ? "text-green-500" : "text-red-500"}`}>minimum 8 characters</li>
							<li className={`text-xs capitalize ${passwordCriteria.uppercase ? "text-green-500" : "text-red-500"}`}>one uppercase character</li>
							<li className={`text-xs capitalize ${passwordCriteria.specialChar ? "text-green-500" : "text-red-500"}`}>one special character</li>
							<li className={`text-xs capitalize ${passwordCriteria.number ? "text-green-500" : "text-red-500"}`}>one number</li>
						</ul>
						<div className="flex !mt-5 items-center">
							<input
								id="remember-me"
								name="remember-me"
								type="checkbox"
								className={`h-4 w-4 text-red-600 ${formErrors.confirmPassword ? "border-red-500" : ""} focus:ring-red-500 border-gray-300 rounded`}
							/>
							<label htmlFor="remember-me" className="ml-3 block text-sm">
								I accept the{" "}
								<Link href="#" className="text-red-600 font-semibold hover:underline ml-1">
									Terms and Conditions
								</Link>
							</label>
						</div>
						<div className="mt-10">
							<button
								type="submit"
								className="w-full mt-3 py-3 px-4 text-sm font-semibold rounded text-white bg-red-500 hover:bg-red-600 focus:outline-none"
								disabled={loadingSubmitButton}
							>
								{loadingSubmitButton ? (
									<div role="status" className="mx-auto">
										<svg
											aria-hidden="true"
											className="mx-auto w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600"
											viewBox="0 0 100 101"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
												fill="currentColor"
											/>
											<path
												d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
												fill="currentFill"
											/>
										</svg>
										<span className="sr-only text-black">Loading...</span>
									</div>
								) : (
									"SIGN UP"
								)}
							</button>
						</div>
						<p className="text-sm mt-6 text-center">
							Already have an account?{" "}
							<Link href="/login" className="text-red-600 font-semibold hover:underline ml-1">
								Login here
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}
