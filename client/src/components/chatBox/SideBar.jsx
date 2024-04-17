import React, { useEffect, useState } from "react";
import { MessageSquareText } from "lucide-react";
import { useSocketContext } from "../../context/socketContext";
import { NavLink } from "react-router-dom";
function Sidebar() {
  const { setNotifications, notifications } = useSocketContext();
  const [isOpen, setIsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  // opening notification message
  useEffect(() => {
    if (notifications && notifications.length > 0) {
      if (!isOpen) {
        setIsOpen(true);
      }
    } else {
      if (isOpen) {
        setIsOpen(false);
      }
    }
  }, [notifications, isOpen]);

  // counting notifications

  useEffect(() => {
    if (notifications && notifications.length > 0) {
      const uniqueSenderIds = [
        ...new Set(notifications.map((notif) => notif.senderId)),
      ];
      const totalCount = uniqueSenderIds.reduce((acc, senderId) => {
        const count = notifications.filter(
          (notif) => notif.senderId === senderId
        ).length;
        return acc + count;
      }, 0);
      setNotificationCount(totalCount);
    } else {
      setNotificationCount(0);
    }
  }, [notifications]);

  // empting notification array and sessionStorage
  const handleDeleteNotification = () => {
    setNotifications([]);
    sessionStorage.removeItem("notifications");
  };

  return (
    <>
      {isOpen && (
        <div
          className={`fixed top-1/2 right-0 z-50 bg-retroRed text-white rounded-lg p-4 transition-transform duration-700 ease-in-out  ${
            isOpen ? "transform translate-x-0" : "transform translate-x-full"
          }`}
        >
          <NavLink onClick={() => handleDeleteNotification()} to="/chatbox">
            <div className="relative flex items-center justify-center animated-message ">
              <div className="relative flex gap-1 text-lg ">
                <p className="text-white">You have new message(s)</p>
                <MessageSquareText className="notification-icon" color="white"/>
                <span className="notification-count">{notificationCount}</span>
              </div>
            </div>
          </NavLink>
        </div>
      )}
    </>
  );
  
}

export default Sidebar;
