import type { FC } from "react";
import { FaPlus } from "react-icons/fa";
import { Button } from "../button";
import { IconButton } from "../icon-button";

export interface NavigationProps {
  user?: {
    avatarUrl?: string;
    walletAddress: string;
  };
  onWalletConnect?: () => void;
  onPostCreate?: () => void;
}

export const Navigation: FC<NavigationProps> = (props) => {
  const { user, onWalletConnect, onPostCreate } = props;

  return (
    <nav className="bg-gray-100 p-2">
      <div className="flex items-center justify-end gap-2">
        <IconButton onClick={onPostCreate}>
          <FaPlus />
        </IconButton>
        {user ? (
          user.avatarUrl ? (
            <button>
              <img
                src={user.avatarUrl}
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
            </button>
          ) : (
            <Button>{user.walletAddress.slice(0, 5)}</Button>
          )
        ) : (
          <Button onClick={onWalletConnect}>Connect Wallet</Button>
        )}
      </div>
    </nav>
  );
};
