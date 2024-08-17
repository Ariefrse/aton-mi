import { FaBars } from "react-icons/fa";
import Profile from "./Profile";

const Header = () => {
  return (
    <header className="flex justify-between text-white p-4">
      <div className="flex gap-10 items-center">
        <FaBars size={24} />
        <input className="rounded-lg h-10" type="search" name="" id="" />
      </div>
      {/* <div className="rounded-full overflow-hidden w-10 h-10">
        {" "}
        <img
          src="/src/assets/react.svg"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div> */}
      <Profile />
    </header>
  );
}

export default Header