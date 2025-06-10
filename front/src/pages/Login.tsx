import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Sesuaikan path

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, userId, password);

      const idToken = await userCredential.user.getIdToken();

      // Kirim ID token ke backend (opsional jika perlu validasi)
      await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });

      // Trigger global event & redirect
      window.dispatchEvent(new Event("user-changed"));
      window.location.href = "/Page1";

    } catch (err: any) {
      setError("Login gagal: " + (err.message || ""));
    }
  };

  

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 flex items-center justify-center bg-gradient-to-br from-[#dceeff] to-[#a3c9f7]">
        <div className="bg-white rounded-2xl shadow-xl p-10 w-80">
          <h2 className="text-center text-3xl font-bold tracking-tight font-montserrat bg-gradient-to-b from-[#2D6EC0] to-[#86BBF1] bg-clip-text text-transparent">
            Login
          </h2>

          <form className="space-y-4 mt-10" onSubmit={handleLogin}>
            <div>
              <label className="text-left! mb-2 block text-sm font-medium text-gray-900">
                Username
              </label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="your_username"
                className="w-full border border-blue-300 text-sm rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="text-left! mb-2 block text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full border border-blue-300 rounded-md text-sm px-2 py-1 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <a
                href="#"
                className="block text-xs font-semibold text-[#519AE5] hover:text-blue-600 text-right mt-1"
              >
                Forgot password?
              </a>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-md bg-[#519AE5]! px-2 py-1 text-md font-semibold text-white hover:bg-blue-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      <div className="w-1/2 h-screen">
        <img
          src="/image.png"
          alt="Login Visual"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
};

export default Login;
