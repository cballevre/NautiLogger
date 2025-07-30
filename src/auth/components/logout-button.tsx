import { useLogout, useTranslation } from '@refinedev/core';
import type { FC } from 'react';

interface LogoutButtonProps {
  style?: React.CSSProperties;
}

export const LogoutButton: FC<LogoutButtonProps> = ({ style }) => {
  const { mutate: logout } = useLogout();

  const { translate } = useTranslation();

  return (
    <button type="button" style={style} onClick={() => logout()}>
      {translate('auth.logout')}
    </button>
  );
};
