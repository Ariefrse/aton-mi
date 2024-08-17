import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    !isAuthenticated && (
    // isAuthenticated && ( // Commented out for testing
      <div className="relative rounded-full overflow-hidden w-10 h-10">
        {" "}
         
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={toggleDropdown}
        >
          <img
            src="/src/assets/react.svg"
            alt="Profile"
            className="rounded-full w-8 h-8"
          />
          <span className="text-sm">{user?.name ?? 'John Test'}</span>
          <FaCaretDown />
        </div>
        {showDropdown && (
          <div className="absolute right-0 top-10 bg-white rounded-md shadow-md">
            <ul className="p-4">
              <li className="hover:bg-gray-100 p-2">Profile</li>
              <li className="hover:bg-gray-100 p-2">{user?.email ?? 'test@email.com'}</li>
              <li className="hover:bg-gray-100 p-2">Settings</li>
              <li className="hover:bg-gray-100 p-2">Logout</li>
            </ul>
          </div>
        )}
      </div>
    )
  );
};

export default Profile;
