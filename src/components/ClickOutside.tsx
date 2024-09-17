import { useRef, useEffect } from "react";

interface ClickOutsideProps {
  children: React.ReactNode;
  onClickOutside: () => void;
}

function ClickOutside({ children, onClickOutside }: ClickOutsideProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, onClickOutside]);

  return <div ref={ref}>{children}</div>;
}

export default ClickOutside;
