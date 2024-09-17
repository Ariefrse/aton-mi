import { FC } from "react";

type CloseButtonProps = {
  onClick?: () => void
}

const CloseButton: FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <div className="border-blue-400 mr-4 border-2 rounded-lg p-1" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-4"
       
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
}

export default CloseButton