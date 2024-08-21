import React, { useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import Header from './Header';
import Footer from './Footer';
import Hero from './Hero';

export default function ExampleV2(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('mentee');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [field, setField] = useState('');
  const [bio, setBio] = useState('');
  const [availability, setAvailability] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [skills, setSkills] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);

const handlePhotoUpload = (e) => {
  setPhoto(e.target.files[0]);
};

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, role === 'mentor' ? 'mentors' : 'mentees', user.uid);
      const userData = {
        email: user.email,
        role: role,
      };

      if (role === 'mentor') {
        userData.name = name;
        userData.phone = phone;
        userData.age = age;
        userData.field = field;
        userData.bio = bio;
        userData.availability = availability;
        userData.experienceYears = experienceYears;
        userData.skills = skills.split(',').map(skill => skill.trim());
        userData.photoURL = photoURL;
      }

      await setDoc(userDocRef, userData);

      setSuccess('User registered successfully!');
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setError('Registration failed. Please try again.');
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
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src="https://firebasestorage.googleapis.com/v0/b/mentorconnect-36696.appspot.com/o/logo-removebg-preview(1).png?alt=media&token=9f7a18b4-d8b7-4fb3-a48c-b6fbdf65aa0a"   alt="logo"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        Welcome to Mentor Connect
                      </h4>
                    </div>

                    <form onSubmit={handleRegister}>
                      <p className="mb-4">Please register an account</p>
                      <TEInput
                        type="email"
                          placeholder="Email"
                        className="mb-4"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />

                      <TEInput
                        type="password"
                          placeholder="Password"
                        className="mb-4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />

                      <div className="mb-4">
                        <  placeholder className="block text-sm font-medium text-gray-700">Register as:</  placeholder>
                        <div className="mt-2">
                          <  placeholder className="inline-flex items-center">
                            <input
                              type="radio"
                              className="form-radio"
                              name="role"
                              value="mentee"
                              checked={role === 'mentee'}
                              onChange={(e) => setRole(e.target.value)}
                            />
                            <span className="ml-2">Mentee</span>
                          </  placeholder>
                          <  placeholder className="inline-flex items-center ml-6">
                            <input
                              type="radio"
                              className="form-radio"
                              name="role"
                              value="mentor"
                              checked={role === 'mentor'}
                              onChange={(e) => setRole(e.target.value)}
                            />
                            <span className="ml-2">Mentor</span>
                          </  placeholder>
                        </div>
                      </div>

                      {/* Mentor-specific fields */}
                      {role === 'mentor' && (
                        <>
                          <TEInput
                            type="text"
                              placeholder="Full Name"
                            className="mb-4"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />

                          <TEInput
                            type="text"
                              placeholder="Phone Number"
                            className="mb-4"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />

                          <TEInput
                            type="number"
                              placeholder="Age"
                            className="mb-4"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                          />

                          <TEInput
                            type="text"
                              placeholder="Field of Expertise"
                            className="mb-4"
                            value={field}
                            onChange={(e) => setField(e.target.value)}
                            required
                          />

                          <TEInput
                            type="text"
                              placeholder="Bio"
                            className="mb-4"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            required
                          />

                          <TEInput
                            type="text"
                              placeholder="Availability (e.g., Monday: 09:00-10:00)"
                            className="mb-4"
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                            required
                          />

                          <TEInput
                            type="number"
                              placeholder="Years of Experience"
                            className="mb-4"
                            value={experienceYears}
                            onChange={(e) => setExperienceYears(e.target.value)}
                            required
                          />

                          <TEInput
                            type="text"
                              placeholder="Skills (comma-separated)"
                            className="mb-4"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            required
                          />

                          <TEInput
                            type="url"
                              placeholder="Photo URL"
                            className="mb-4"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            required
                          />
                        </>
                      )}

                      {error && <p className="text-red-500">{error}</p>}
                      {success && <p className="text-green-500">{success}</p>}

                      <div className="mb-12 pb-1 pt-1 text-center">
                        <TERipple rippleColor="light" className="w-full">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="submit"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            style={{
                              background: `linear-gradient(
                                to right,
                                #3C82E3,
                                #6DC6F8,
                                #F7FFFC,
                                #F7FFFC,
                                #B4EEFF,
                                #79A9FE
                              )`,
                            }}
                          >
                            Register
                          </button>
                        </TERipple>
                      </div>

                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Already have an account?</p>
                        <TERipple rippleColor="light" className="w-full">
                          <button
                            type="button"
                            onClick={handleLogin}
                            className="inline-block rounded border-2 border-primary px-6 pb-[6px] pt-[6px] text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-neutral-800 hover:bg-neutral-800 hover:bg-opacity-5 focus:border-neutral-800 focus:text-neutral-800 focus:outline-none focus:ring-0 active:border-neutral-900 active:text-neutral-900"
                          >
                            Log in
                          </button>
                        </TERipple>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background: `linear-gradient(
                      to right,
                      #3C82E3,
                      #6DC6F8,
                      #F7FFFC,
                      #F7FFFC,
                      #B4EEFF,
                      #79A9FE
                    )`,
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      We are more than just a company
                    </h4>
                    <p className="text-sm">
                      At Mentor Connect, we aim to bridge the gap between experienced professionals and eager learners by offering a platform that facilitates knowledge sharing and personal growth. Whether you're looking to share your expertise or learn from the best, we provide the resources and connections you need to succeed.
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