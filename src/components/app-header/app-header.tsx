import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { UserNameSelector } from '../../services/slice/userSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(UserNameSelector);
  return <AppHeaderUI userName={userName ? userName : 'Личный кабинет'} />;
};
