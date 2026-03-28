import { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoading(true);
        
        try {
            // Validasi input
            if (!name || !email || !phoneNumber) {
                setError("Please fill in all fields");
                setLoading(false);
                return;
            }

            const users = await fetch("http://localhost:3000/users").then(res => res.json());
            const existingUser = users.find((u: any) => u.phoneNumber === phoneNumber);

            if (existingUser) {
                setError("Phone number already registered. Please use a different number.");
                setLoading(false);
                return;
            }

            const user = {
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                history: []
            }

            // API call ke json-server
            const response = await fetch("http://localhost:3000/users", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(user),
            });

            if (response.ok) {
                navigate("/login");
            }

        } catch (error) {
            setError("An error occurred. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const buttonDisabled = () => {
        return loading || !phoneNumber;
    }

    return (
			<div
				className="flex justify-center items-center min-h-screen w-full"
				style={{
					backgroundImage: "url(/wallpaper.jpg)",
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundAttachment: "fixed",
				}}>
				{/* Overlay semi-transparent */}
				<div className="absolute inset-0 bg-black/40"></div>

				{/* Register Card */}
				<div className="relative z-10 bg-white/95 backdrop-blur-sm px-8 py-10 rounded-2xl shadow-2xl w-full max-w-sm flex flex-col gap-12">
					<div className="">
						<h1 className="text-3xl font-bold text-gray-800 mb-2">Register</h1>
						<p className="text-gray-600">
							Enter your phone number to create an account
						</p>
					</div>

					{/* Error message */}
					{error && (
						<div
							className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
							role="alert">
							<span className="block sm:inline">{error}</span>
						</div>
					)}

					<Box>
						<label htmlFor="name" className="mb-2 block text-gray-700 text-sm">
							Name
						</label>
						<input
							id="name"
							type="text"
							placeholder="Budi"
							className="w-full border-b border-gray-300 focus:outline-none focus:bg-none active:bg-none autofill:bg-transparent"
							value={name}
							onChange={(e) => setName(e.target.value)}
							disabled={loading}
						/>
					</Box>

					<Box>
						<label htmlFor="email" className="mb-2 block text-gray-700 text-sm">
							email
						</label>
						<input
							id="email"
							type="email"
							placeholder="budi@gmail.com"
							className="w-full border-b border-gray-300 focus:outline-none focus:bg-none active:bg-none autofill:bg-transparent"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							disabled={loading}
						/>
					</Box>

					<Box>
						<label htmlFor="phone" className="mb-2 block text-gray-700 text-sm">
							Phone Number
						</label>
						<input
							id="phone"
							type="tel"
							placeholder="089506754119"
							className="w-full border-b border-gray-300 focus:outline-none focus:bg-none active:bg-none autofill:bg-transparent"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
							disabled={loading}
						/>
					</Box>

					<div>
						<button
							type="button"
							onClick={handleSubmit}
							className={`${buttonDisabled() ? "cursor-not-allowed bg-slate-200 text-gray-500" : "bg-orange-500 text-white"} w-full py-2 rounded-full  transition-colors flex items-center justify-center`}>
							{loading ? (
								<CircularProgress size={24} color="inherit" />
							) : (
								"Register"
							)}
						</button>

						{/* Register Link */}
						<div className="mt-6 text-center">
							<p className="text-gray-700">
								Have an account?{" "}
								<a
									href="/login"
									className="text-orange-500 font-semibold hover:text-orange-600 transition-colors">
									Login
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		);
}