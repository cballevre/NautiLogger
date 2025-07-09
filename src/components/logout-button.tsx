import { useLogout } from '@refinedev/core';
import type { FC } from 'react';
import { useTranslation } from '@refinedev/core';

interface LogoutButtonProps {
  style?: React.CSSProperties;
}

export const LogoutButton: FC<LogoutButtonProps> = ({ style }) => {
  const { mutate: logout } = useLogout();

  const { translate } = useTranslation();

  return (
    <button style={style} onClick={() => logout()}>
      {translate('LogoutButton.label')}
    </button>
  );
};
