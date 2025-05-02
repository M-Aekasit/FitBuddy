import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  // ตรวจสอบว่า path ปัจจุบันตรงกับลิงก์ไหม
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-10">
            {/* Logo */}
            <Link to="/HealthDashboard" className="flex items-center">
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                FitBuddy
              </span>
            </Link>
            
            {/* Primary Nav */}
            <div className="hidden md:flex items-center space-x-1">
              <NavLink to="/HealthDashboard" isActive={isActive('/HealthDashboard')}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Home</span>
              </NavLink>
              
              <NavLink to="/FriendPage" isActive={isActive('/FriendPage')}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Friends</span>
              </NavLink>
              
              <NavLink to="/DiaryPage" isActive={isActive('/DiaryPage')}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Diary</span>
              </NavLink>
            </div>
          </div>
          
          {/* Secondary Nav */}
          <div className="flex items-center space-x-4">
            <NavLink to="/Notification" isActive={isActive('/Notification')} className="relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="sr-only">Notifications</span>
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 border-2 border-white"></span>
            </NavLink>
            
            <NavLink to="/SettingPage" isActive={isActive('/SettingPage')}>
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-green-400 flex items-center justify-center text-white font-medium">
                F
              </div>
              <span className="sr-only">Settings</span>
            </NavLink>
            
          </div>
        </div>
      </div>
    </nav>
  );
};

// Component สำหรับลิงก์ใน NavBar
const NavLink = ({ to, isActive, children, className = '' }) => (
  <Link
    to={to}
    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-blue-50 text-blue-600'
        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
    } ${className}`}
  >
    {React.Children.map(children, (child) => {
      if (typeof child === 'string') {
        return <span className="ml-2">{child}</span>;
      }
      return child;
    })}
  </Link>
);

export default Navigation;