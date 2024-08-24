import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { onAuthStateChanged, signOut, getAuth } from 'firebase/auth';
import { auth } from './firebase'; // Adjust the path as necessary

const navigation = [
  { name: 'Mentor', href: '/mentors' },
  { name: 'Features', href: '/features' },
  { name: 'About', href: '/about' },
  { name: 'Team', href: '/team' },
  { name: 'Dashboard', href: '/mentee-dashboard' },
];

export default function Header() {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);

  useEffect(() => {
    // Set up the Firebase Auth state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe(); // Cleanup listener on component unmount
    };
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Clear authentication state
      const firebaseAuth = getAuth();
      firebaseAuth.currentUser = null;
      
      // Optionally, clear other Firebase settings or instances
      // e.g., firebase.firestore().terminate() if using Firestore
      // This may not be necessary, but you can add more clean-up code if needed

      // Redirect to the login page after logout
      window.location.href = '/login';
    }).catch((error) => {
      console.error('Logout error:', error);
    });
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
              <button onClick={() => setConfirmLogoutOpen(true)} className="text-sm font-semibold leading-6 text-gray-900">
                Log out
              </button>
            ) : (
              <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">
                Log in
              </a>
            )}
          </div>
        </nav>

        {/* Mobile menu */}
        <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
          <Dialog.Panel focus="true" className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Mentor Connect</span>
                <img
                  alt=""
                  src="https://firebasestorage.googleapis.com/v0/b/mentorconnect-36696.appspot.com/o/logo-removebg-preview(1).png?alt=media&token=9f7a18b4-d8b7-4fb3-a48c-b6fbdf65aa0a"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  {user ? (
                    <button
                      onClick={() => setConfirmLogoutOpen(true)}
                      className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                    >
                      Log out
                    </button>
                  ) : (
                    <a
                      href="/login"
                      className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                    >
                      Log in
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>

        {/* Logout Confirmation Dialog */}
        <Dialog open={confirmLogoutOpen} onClose={() => setConfirmLogoutOpen(false)}>
          <Dialog.Panel className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 p-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold">Confirm Logout</h3>
              <p className="mt-2 text-sm">Are you sure you want to log out?</p>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setConfirmLogoutOpen(false)}
                  className="text-sm font-semibold text-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-sm font-semibold text-blue-600"
                >
                  Log out
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
}
