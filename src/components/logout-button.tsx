import { useLogout } from "@refinedev/core";
import type { FC } from "react";

interface LogoutButtonProps {
  style?: React.CSSProperties;
}

export const LogoutButton: FC<LogoutButtonProps> = ({ style }) => {
  const { mutate: logout } = useLogout();

  return <button style={style} onClick={() => logout()}>Logout</button>;
};