import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav className="flex gap-4 p-4 bg-gray-100">
    <Link to="/HealthDashboard" className="hover:text-blue-500">Home</Link>
    <Link to="/FriendPage" className="hover:text-blue-500">Friend</Link>
    <Link to="/DiaryPage" className="hover:text-blue-500">Diary</Link>
    <Link to="/Notification" className='hover:text-blue-500'>Notification</Link>
  </nav>
);

export default Navigation;