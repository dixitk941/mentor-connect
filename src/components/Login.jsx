import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase"; // Adjust the path as necessary
import { doc, getDoc } from "firebase/firestore";
import Header from './Header';
import Footer from './Footer';
import Hero from './Hero'

export default function MentorConnectLogin(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Fetch user role from Firestore
      const mentorDoc = await getDoc(doc(db, "mentors", user.uid));
      const menteeDoc = await getDoc(doc(db, "mentees", user.uid));
  
      if (mentorDoc.exists()) {
        navigate("/mentor-dashboard");
      } else if (menteeDoc.exists()) {
        navigate("/mentee-dashboard");
      } else {
        throw new Error("User document not found");
      }
    } catch (err) {
      console.error(err.message); // Log the exact error for debugging
      if (err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        setError("Invalid credentials. Please try again or register.");
      } else if (err.message === "User document not found") {
        setError("No account found with this email. Please register.");
      } else if (err.message === "Role not recognized") {
        setError("User role is not recognized. Please contact support.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };
  
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <section className="h-full bg-neutral-200 dark:bg-neutral-700">
      <Hero />
      <div className="container h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* Left column container */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* Logo */}
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src="https://firebasestorage.googleapis.com/v0/b/mentorconnect-36696.appspot.com/o/Mentor_20240818_131407_0000.png?alt=media&token=8c4652a1-4a11-4c26-ae3d-c6de12daef56"
                           alt="logo"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        Welcome back to Mentor Connect
                      </h4>
                    </div>

                    <form onSubmit={handleLogin}>
                      <p className="mb-4">Please login to your account</p>
                      {/* Email input */}
                      <TEInput
                        type="email"
                        label="Email"
                        className="mb-4"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />

                      {/* Password input */}
                      <TEInput
                        type="password"
                        label="Password"
                        className="mb-4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />

                      {error && <p className="text-red-500">{error}</p>}

                      {/* Submit button */}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <TERipple rippleColor="light" className="w-full">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="submit"
                            style={{
                              background:
                                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                            }}
                          >
                            Login
                          </button>
                        </TERipple>
                      </div>

                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Don't have an account?</p>
                        <button
                          onClick={handleRegister}
                          className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-100 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Right column container with background and description */}
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      Reconnect with your Mentor or Mentee
                    </h4>
                    <p className="text-sm">
                      Mentor Connect provides a seamless way to log in and access your dashboard, where you can manage your mentoring relationships, track your progress, and connect with new mentors or mentees.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
