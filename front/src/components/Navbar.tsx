import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../firebase"; // Pastikan path sesuai

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50 p-4 rounded-b-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="logo" className="h-10" />
        </div>

        <div className="flex items-center space-x-6">
          <a href="/Page1" className="font-montserrat! text-blue-400 hover:text-blue-800">Home</a>
          <a href="/#features" className="font-montserrat! text-blue-400 hover:text-blue-800">About</a>

          {user ? (
            <a href="/Profile">
              <img
                src={user.photoURL || "/avatar.jpeg"}
                alt="Profile"
                className="h-10 w-10 rounded-full border-2 border-blue-400 hover:border-blue-800 transition"
              />
            </a>
          ) : (
            <a
              href="/Login"
              className="text-white px-4 py-1 bg-blue-400 rounded-full hover:bg-blue-800 transition"
            >
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
