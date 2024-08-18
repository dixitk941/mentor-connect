import React, { useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'; // Adjust the path as necessary
import { useNavigate } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Hero from './Hero';



export default function ExampleV2(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('User registered successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <section className="h-full bg-neutral-200 dark:bg-neutral-700">
        <Hero />
      <div className="container h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* <!-- Left column container--> */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* <!--Logo--> */}
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src="https://firebasestorage.googleapis.com/v0/b/mentor-connect-74cc5.appspot.com/o/Logo.png?alt=media&token=9a3674d4-df33-48c0-b324-d16bdffe91ba"
                        alt="logo"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                       Welcome to Mentor Connect
                      </h4>
                    </div>

                    <form onSubmit={handleRegister}>
                      <p className="mb-4">Please register an account</p>
                      {/* <!--Username input--> */}
                      <TEInput
                        type="email"
                        label="Email"
                        className="mb-4"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />

                      {/* <!--Password input--> */}
                      <TEInput
                        type="password"
                        label="Password"
                        className="mb-4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />

                      {error && <p className="text-red-500">{error}</p>}

                      {/* <!--Submit button--> */}
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
                            Sign up
                          </button>
                        </TERipple>

                        {/* <!--Forgot password link--> */}
                        <a href="#!">Terms and conditions</a>
                      </div>

                      {/* <!--Register button--> */}
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Have an account?</p>
                        <TERipple rippleColor="light">
                          <button
                            type="button"
                            onClick={handleLogin}
                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                          >
                            Login
                          </button>
                        </TERipple>
                      </div>
                    </form>
                  </div>
                </div>

                {/* <!-- Right column container with background and description--> */}
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                    Connecting Mentors with Mentees
                    </h4>
                    <p className="text-sm">
                    Mentor Connect is your go-to platform for finding mentors
                      and connecting with experts in your field. Whether you're
                      looking to learn new skills, seek career guidance, or
                      expand your professional network, Mentor Connect provides
                      the tools and community you need to succeed.
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