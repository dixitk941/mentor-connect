import React, { useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from '../firebase';
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Header from './Header';
import Footer from './Footer';
import Hero from './Hero';
import DateTimePicker from 'react-datetime-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import CreatableSelect from 'react-select/creatable';

export default function ExampleV2(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('mentee');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [field, setField] = useState('');
  const [bio, setBio] = useState('');
  const [availability, setAvailability] = useState(null);
  const [date, setDate] = useState(new Date()); // Add this line
  // const [field, setField] = useState('');

  const [experienceYears, setExperienceYears] = useState('');
  const [skills, setSkills] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handlePhotoUpload = (e) => {
    setPhoto(e.target.files[0]);
  };

  const fieldOptions = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'medicine', label: 'Medicine' },
    { value: 'arts', label: 'Arts' },
    // Add more options as needed
  ];

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let photoURL = '';
      if (photo) {
        const storageRef = ref(storage, `photos/${user.uid}`);
        await uploadBytes(storageRef, photo);
        photoURL = await getDownloadURL(storageRef);
      }

      const userDocRef = doc(db, role === 'mentor' ? 'mentors' : 'mentees', user.uid);
      const userData = {
        email: user.email,
        role: role,
        ...(role === 'mentor' && {
          name,
          phone,
          age,
          field,
          bio,
          availability,
          experienceYears,
          skills: skills.map(skill => skill.value),
          photoURL
        })
      };

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
                        src="https://firebasestorage.googleapis.com/v0/b/mentorconnect-36696.appspot.com/o/logo-removebg-preview(1).png?alt=media&token=9f7a18b4-d8b7-4fb3-a48c-b6fbdf65aa0a"
                        alt="logo"
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
                        className="mb-4 text-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />

                      <TEInput
                        type="password"
                        placeholder="Password"
                        className="mb-4 text-black"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">
                          Register as:
                        </label>
                        <div className="mt-2">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              className="form-radio"
                              name="role"
                              value="mentee"
                              checked={role === 'mentee'}
                              onChange={(e) => setRole(e.target.value)}
                            />
                            <span className="ml-2 text-black dark:text-white">Mentee</span>
                          </label>
                          <label className="inline-flex items-center ml-6">
                            <input
                              type="radio"
                              className="form-radio"
                              name="role"
                              value="mentor"
                              checked={role === 'mentor'}
                              onChange={(e) => setRole(e.target.value)}
                            />
                            <span className="ml-2 text-black dark:text-white">Mentor</span>
                          </label>
                        </div>
                      </div>

                      {role === 'mentor' && (
                        <>
                          <TEInput
                            type="text"
                            placeholder="Full Name"
                            className="mb-4 text-black"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />

                          <TEInput
                            type="text"
                            placeholder="Phone Number"
                            className="mb-4 text-black"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />

                          <TEInput
                            type="number"
                            placeholder="Age"
                            className="mb-4 text-black"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                          />

                          <TEInput
                            type="text"
                            placeholder="Field of Expertise"
                            className="mb-4 text-black"
                            value={field}
                            onChange={(e) => setField(e.target.value)}
                            required
                          />

                          <TEInput
                            type="text"
                            placeholder="Bio"
                            className="mb-4 text-black"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            required
                          />

{/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateTime">
              Date and Time
            </label>
            <DateTimePicker
              onChange={setDate}
              value={date}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div> */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="field">
              Field
            </label>
            <CreatableSelect
              isClearable
              onChange={(newValue) => setField(newValue)}
              options={fieldOptions}
              className="w-full"
            />
          </div>
                          <TEInput
                            type="number"
                            placeholder="Years of Experience"
                            className="mb-4 text-black"
                            value={experienceYears}
                            onChange={(e) => setExperienceYears(e.target.value)}
                            required
                          />

                          <div className="mb-4 text-black">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">
                              Skills (Suggestions available)
                            </label>
                            <CreatableSelect
                              isMulti
                              onChange={setSkills}
                              options={[
                                { value: 'JavaScript', label: 'JavaScript' },
                                { value: 'React', label: 'React' },
                                { value: 'Node.js', label: 'Node.js' },
                                // Add more skill options as needed
                              ]}
                              value={skills}
                            />
                          </div>

                          <div className="mb-4 text-black">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">
                              Upload Photo
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handlePhotoUpload}
                            />
                          </div>
                        </>
                      )}

                      {error && <p className="text-red-500">{error}</p>}
                      {success && <p className="text-green-500">{success}</p>}

                      <div className="mb-12 pb-1 pt-1 text-center">
                        <TERipple rippleColor="light" className="w-full">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(                              (0,0,0,0.1)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.1)] focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.1)]"
                            type="submit"
                          >
                            Register
                          </button>
                        </TERipple>
                      </div>

                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2 text-black dark:text-white">Already have an account?</p>
                        <TERipple rippleColor="light" className="inline-block">
                          <button
                            type="button"
                            className="inline-block rounded border-2 border-blue-600 px-6 pb-2 pt-2 text-xs font-medium uppercase leading-normal text-blue-600 transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 focus:outline-none focus:ring-0"
                            onClick={handleLogin}
                          >
                            Log In
                          </button>
                        </TERipple>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-green-400 lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none p-12 text-white">
                  <div className="text-center lg:text-left">
                    <h4 className="mb-6 text-xl font-semibold">We are more than just a company</h4>
                    <p className="mb-6">
                      Mentor Connect is a platform that bridges the gap between mentors and mentees. Join us to grow, learn, and achieve your career goals.
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

