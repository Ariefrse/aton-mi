import { FaBars } from "react-icons/fa";
import SearchBox from "./SearchBox";

const Header = () => {
  return (
    <header className="flex justify-between text-white p-4">
      <div className="flex gap-10 items-center">
        <FaBars size={24} />
        <SearchBox />
      </div>
      <div className="rounded-full overflow-hidden w-10 h-10">
        {" "}
        <img
          src="/src/assets/react.svg"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
    </header>
  );
}

export default Header