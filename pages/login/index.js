import React, { useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Login() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [loadingSubmitButton, setLoadingSubmitButton] = useState(false); // State to manage loading spinner

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

	const [formErrors, setFormErrors] = useState({
		email: undefined,
		password: undefined,
	});

	const togglePasswordVisibility = () => {
		setSettings((prevSettings) => ({
			...prevSettings,
			showPassword: !prevSettings.showPassword,
		}));
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

	const handleEmailChange = (e) => {
		const value = e.target.value;
		setFormData({
			...formData,
			email: value,
		});
		setFormErrors((prevErrors) => ({
			...prevErrors,
			email: !validateEmail(value),
		}));
	};

	const handlePasswordChange = (e) => {
		const value = e.target.value;
		setFormData({
			...formData,
			password: value,
		});
		validatePassword(value);
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
			setLoadingSubmitButton(true); // Set loading state to true when adding to cart

			setTimeout(() => {
				setLoadingSubmitButton(false); // Set loading state to false after some delay
			}, 1000); // Change the delay as needed

			console.log(formData);
			try {
				// Call your fetch API here
				const response = await fetch("/api/user/signin", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				});

				// Handle the API response here
				const data = await response.json();
				console.log(response);
				if (response.ok) {
					console.log(response);

					localStorage.setItem("token", data.token);
					console.log("Login successful");
					console.log("Registration successful");
					// Redirect to the previous page or home page
					const previousPage = document.referrer;
					if (previousPage && previousPage !== window.location.href) {
						router.push(previousPage);
					} else {
						router.push("/");
					}
				} else {
					console.error(data.message);
				}
				console.log(data);
			} catch (error) {
				console.error("Error:", error);
			}
		} else {
			console.log("Password criteria not met or email field is empty");
		}
	};

	const { email, password } = formData;
	const { showPassword, passwordCriteria } = settings;

	return (
		<>
			{/* <div className="h-screen">
                <form onSubmit={handleSubmit} className="max-w-96 px-4 h-screen flex items-stretch flex-col justify-center mx-auto space-y-4 text-[#333]" style={{ minHeight: "450px" }}>
                    <div className="mx-auto flex w-full flex-col justify-start items-center mb-4">
                        <Image src={logo} alt='logo' className='' width={70} height={70} />
                        <h3 className='text-3xl mt-3 tracking-wider font-thin uppercase'>Login</h3>
                    </div>
                    <label className={`flex items-center border-2 focus-within:border-gray-400 rounded ${formErrors.email ? 'border-red-500' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 ml-3" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#9ca3af">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                        <input type="text" placeholder="Email" className={`px-4 py-3 text-black w-full text-sm outline-none rounded ${formErrors.email ? 'border-red-500' : ''}`} value={email} onChange={handleEmailChange} />
                    </label>
                    <label className={`flex items-center relative border-2 focus-within:border-gray-400 rounded ${formErrors.password ? 'border-red-500' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 ml-3 fill-gray-400" viewBox="0 0 34 34">
                            <path d="M17 1c-5 0-9 4-9 9v4c-1.7 0-3 1.3-3 3v13c0 1.7 1.3 3 3 3h18c1.7 0 3-1.3 3-3V17c0-1.7-1.3-3-3-3v-4c0-5-4-9-9-9zm10 16v13c0 .6-.4 1-1 1H8c-.6 0-1-.4-1-1V17c0-.6.4-1 1-1h18c.6 0 1 .4 1 1zm-17-3v-4c0-3.9 3.1-7 7-7s7 3.1 7 7v4z" />
                            <path d="M17 19c-1.7 0-3 1.3-3 3 0 1.3.8 2.4 2 2.8V27c0 .6.4 1 1 1s1-.4 1-1v-2.2c1.2-.4 2-1.5 2-2.8 0-1.7-1.3-3-3-3zm0 4c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
                        </svg>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className={`px-4 py-3 text-black w-full text-sm outline-none rounded ${formErrors.password ? 'border-red-500' : ''}`}
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {!showPassword ? (
                            <button type="button" className="text-xs absolute top-1/2 -translate-y-1/2 right-3 flex items-center text-black" onClick={togglePasswordVisibility}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" className="w-[18px] h-[18px]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                            </button>
                        ) : (
                            <button type="button" className="text-xs absolute top-1/2 -translate-y-1/2 right-2 flex items-center text-black" onClick={togglePasswordVisibility}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#9ca3af" stroke="#9ca3af" className="w-[18px] h-[18px] mr-1" viewBox="0 0 128 128">
                                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
                                </svg>
                            </button>
                        )}
                    </label>
                    <ul className={`px-4 grid sm:grid-cols-2 gap-y-1 gap-x-6 w-max list-disc h-9 ${(!settings.passwordValid || formErrors.password) ? 'opacity-1' : 'opacity-0'}`}>
                        <li className={`text-xs capitalize ${passwordCriteria.minLength ? 'text-green-500' : 'text-red-500'}`}>minimum 8 characters</li>
                        <li className={`text-xs capitalize ${passwordCriteria.uppercase ? 'text-green-500' : 'text-red-500'}`}>one uppercase character</li>
                        <li className={`text-xs capitalize ${passwordCriteria.specialChar ? 'text-green-500' : 'text-red-500'}`}>one special character</li>
                        <li className={`text-xs capitalize ${passwordCriteria.number ? 'text-green-500' : 'text-red-500'}`}>one number</li>
                    </ul>


                    <button disabled={loadingSubmitButton} type="submit" className="w-full mt-5 px-6 py-2.5 text-sm bg-[#333] hover:bg-[#222] text-white rounded-sm cursor-pointer">
                        {loadingSubmitButton ? ( // Conditional rendering of spinner or text based on loading state
                            <div role="status" className='mx-auto'>
                                <svg aria-hidden="true" className="mx-auto w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only text-black">Loading...</span>
                            </div>
                        ) : (
                            "LOGIN"
                        )}
                    </button>
                </form>
            </div> */}

			<div className="flex flex-col justify-center font-sans text-gray-700 sm:h-screen p-4">
				<div className="text-center mb-4">
					<Link href="#">
						<Image src={logo} alt="logo" width={180} height={40} className="inline-block" />
					</Link>
				</div>
				<div className="max-w-md w-full mx-auto border border-gray-300 rounded-md p-6">
					<h2 className="text-2xl text-center text-thin mb-4">SIGN IN</h2>
					<form onSubmit={handleSubmit}>
						<div className="space-y-3">
							<label className="text-sm block">Email</label>
							<div className="relative rounded">
								<input
									name="email"
									type="text"
									className={`focus:border-gray-400 border-2  ${formErrors.email ? "border-red-500 " : ""} w-full text-sm px-4 py-3 rounded-md`}
									placeholder="Enter Email"
									value={email}
									onChange={handleEmailChange}
								/>
							</div>
							<label className="text-sm block">Password</label>
							<div className="relative rounded">
								<input
									name="password"
									type={showPassword ? "text" : "password"}
									className={`focus:border-gray-400 border-2 ${formErrors.password ? "border-red-500" : ""} w-full text-sm px-4 py-3 rounded-md`}
									placeholder="Enter Password"
									value={password}
									onChange={handlePasswordChange}
								/>
								{!showPassword ? (
									<button
										type="button"
										className="text-xs absolute top-1/2 -translate-y-1/2 right-3 flex items-center text-black"
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
										className="text-xs absolute top-1/2 -translate-y-1/2 right-2 flex items-center text-black"
										onClick={togglePasswordVisibility}
									>
										<svg xmlns="http://www.w3.org/2000/svg" fill="#9ca3af" stroke="#9ca3af" className="w-[18px] h-[18px] mr-1" viewBox="0 0 128 128">
											<path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
										</svg>
									</button>
								)}
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
							<div className="mt-4">
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
										"LOGIN"
									)}
								</button>
							</div>
							<p className="text-sm mt-6 text-center">
								Already have an account?{" "}
								<Link href="register" className="text-red-600 font-semibold hover:underline ml-1">
									Register here
								</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
