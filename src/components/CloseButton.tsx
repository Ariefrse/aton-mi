import { FC } from "react";
import { IoMdClose } from "react-icons/io";

type CloseButtonProps = {
  onClick?: () => void;
  className?: string;
};

const CloseButton: FC<CloseButtonProps> = ({ onClick, className }) => {
  return (
    <IoMdClose
      className={`border-blue-400 mr-4 border-2 rounded-lg p-1 ${className}`}
      fontSize={25}
      onClick={onClick}
    />
  );
};

export default CloseButton;
