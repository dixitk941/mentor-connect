import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from './firebase'; // Adjust the path as necessary
import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
   { name: 'Home' , href: '/home' },
  { name: 'Mentor', href: '/mentors' },
  { name: 'Features', href: '/features' },
  { name: 'About', href: '/about' },
  { name: 'Team', href: '/team' },
  { name: 'Dashboard', href: '/sdashboards' },
  { name: 'Lobby', href: '/lobby' },
];

export default function Header() {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate('/login');
  };

  const renderHeroContent = () => {
    switch (location.pathname) {
      case '/mentors':
        return <h1>Welcome to the Mentors Page</h1>;
      case '/features':
        return <h1>Discover Our Features</h1>;
      case '/about':
        return <h1>About Us</h1>;
      case '/team':
        return <h1>Meet Our Team</h1>;
      case '/mentee-dashboard':
        return <h1>Your Dashboard</h1>;
      case '/lobby':
        return <h1>Welcome to the Lobby</h1>;
      default:
        return <h1>Welcome to Mentor Connect</h1>;
    }
  };

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Mentor Connect</span>
              <img
                alt="Mentor Connect Logo"
                src="https://firebasestorage.googleapis.com/v0/b/mentorconnect-36696.appspot.com/o/logo-removebg-preview(1).png?alt=media&token=9f7a18b4-d8b7-4fb3-a48c-b6fbdf65aa0a"
                style={{ width: '25%' }}
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {user ? (
              <button onClick={() => setLogoutDialogOpen(true)} className="text-sm font-semibold text-gray-900">
                Logout
              </button>
            ) : (
              <a href="/login" className="text-sm font-semibold text-gray-900">
                Login
              </a>
            )}
            <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)}>
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <Dialog.Title className="text-lg font-bold">Confirm Logout</Dialog.Title>
                  <Dialog.Description className="mt-2">
                    Are you sure you want to logout?
                  </Dialog.Description>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => setLogoutDialogOpen(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </Dialog>
          </div>
        </nav>
      </header>
    </div>
  );
}
