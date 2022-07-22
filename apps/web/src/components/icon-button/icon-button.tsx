import type { FC, ReactNode } from "react";

export interface IconButtonProps {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}

export const IconButton: FC<IconButtonProps> = (props) => {
  const { className = "", children, onClick } = props;
  return (
    <button
      type="button"
      className={`rounded-full w-10 h-10 p-2 bg-gray-200 flex justify-center items-center text-xl ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
