import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, RefreshCw } from 'lucide-react';

interface NavbarProps {
  userRole: 'admin' | 'user' | null;
  onLogout: () => void;
  onSwitchRole: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ userRole, onLogout, onSwitchRole }) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600">
                {userRole === 'admin' ? 'Admin' : 'User'} Dashboard
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={onSwitchRole}
              className="mr-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Switch to {userRole === 'admin' ? 'User' : 'Admin'}
            </button>
            <button
              onClick={onLogout}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;