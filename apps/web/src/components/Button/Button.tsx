import type { FC, ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = (props) => {
  const { children, onClick } = props;
  return (
    <button
      className="bg-gray-200 rounded-full px-4 h-10 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
