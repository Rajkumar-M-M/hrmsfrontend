import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import { FiBell } from 'react-icons/fi'; 

const socket = io('http://localhost:5000'); 

const NavBar = () => {
  const { user, logout } = useAuth();

  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]); // ⬅️ NEW STATE to store messages
  const [showDropdown, setShowDropdown] = useState(false); // ⬅️ NEW STATE for dropdown

  useEffect(() => {
    if (user) {
      socket.emit("register_user", {
        userId: user._id,
        role: user.role,
      });
    }
  }, [user]);

  useEffect(() => {
    if (user?.role === "admin") {
      socket.on("new_leave_request", (data) => {
        const message = `New leave request from ${data.employee}: ${data.leaveType} (${data.startDate} to ${data.toDate})`;
        toast.info(message, {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
        });
        setNotificationCount((prev) => prev + 1);
        setNotifications((prev) => [...prev, message]); // ⬅️ ADD to list
      });
    }

    return () => {
      socket.off("new_leave_request");
    };
  }, [user]);

  useEffect(() => {
    if (user?.role === "employee") {
      socket.on("leave_status_updated", (data) => {
        const message = `Your ${data.leaveType} leave (${data.startDate} to ${data.toDate}) was ${data.status}.`;
        toast.success(message, {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
        });
        setNotificationCount((prev) => prev + 1);
        setNotifications((prev) => [...prev, message]); // ⬅️ ADD to list
      });
    }

    return () => {
      socket.off("leave_status_updated");
    };
  }, [user]);

  const handleNotificationClick = () => {
    setNotificationCount(0);
    setShowDropdown((prev) => !prev); // ⬅️ TOGGLE dropdown
  };

  return (
    <div className="flex justify-between items-center h-20 px-10 bg-white">
      <p className="text-xl font-semibold">Welcome! {user.name}</p>

      <div className="flex items-center space-x-6 relative">
        {/* Notification Bell */}
        <div className="relative cursor-pointer" onClick={handleNotificationClick}>
          <FiBell className="w-6 h-6 text-purple-700" />
          {notificationCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {notificationCount}
            </span>
          )}
        </div>

        {/* 🔽 Dropdown Panel */}
        {showDropdown && (
          <div className="absolute right-0 top-10 w-80 bg-white border rounded-md shadow-lg z-20">
            <div className="p-3 border-b font-semibold">Notifications</div>
            {notifications.length === 0 ? (
              <div className="p-3 text-gray-500">No notifications</div>
            ) : (
              <ul className="max-h-60 overflow-y-auto">
                {notifications.map((notif, index) => (
                  <li key={index} className="p-3 border-b text-sm hover:bg-gray-100">
                    {notif}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Logout Button */}
        <button
          className="px-6 py-2 text-xl rounded-xl hover:bg-purple-800 hover:text-white"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
