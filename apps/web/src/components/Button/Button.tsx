import type { FC, ReactNode } from "react";

export interface ButtonProps {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = (props) => {
  const { className = "", children, onClick } = props;
  return (
    <button
      className={`bg-gray-200 rounded-full px-4 h-10 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
