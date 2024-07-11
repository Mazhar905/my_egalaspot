import { useState } from "react";

const SubscribeForm = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple email validation
        if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        // Simulate form submission
        setTimeout(() => {
            setMessage("Thank you for subscribing!");
            setError("");
            setEmail("");
        }, 500);
    };

    return (
        <div className="bg-white py-10 text-[#333] mx-auto text-center p-8 rounded-lg">
            <h3 className="text-4xl font-extrabold">Newsletter</h3>
            <p className="text-sm mt-6">
                Subscribe to our newsletter and stay up to date with the latest news,
                updates, and exclusive offers. Get valuable insights. Join our community today!
            </p>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-100 flex items-center mt-10 rounded-full px-2 py-1 border focus-within:border-gray-700">
                <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full outline-none bg-transparent text-sm px-4 py-3"
                    required
                />
                <button
                    type="submit"
                    className="bg-red-500 hover:bg-red-600 transition-all text-white font-semibold text-sm rounded-full px-14 py-3"
                >
                    Submit
                </button>
            </form>
            {error && <p className="mt-4 text-red-500">{error}</p>}
            {message && <p className="mt-4 text-green-500">{message}</p>}
        </div>
    );
};

export default SubscribeForm;
