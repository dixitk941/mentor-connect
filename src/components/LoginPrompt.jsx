import React from 'react';
import { Dialog } from '@headlessui/react';

const LoginPrompt = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Dialog.Panel className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 p-6">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold">Please Login</h3>
          <p className="mt-2 text-sm">You need to be logged in to access your dashboard.</p>
          <div className="mt-4 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-semibold text-gray-500"
            >
              Close
            </button>
            <a href="/login" className="text-sm font-semibold text-blue-600">
              Go to Login
            </a>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default LoginPrompt;