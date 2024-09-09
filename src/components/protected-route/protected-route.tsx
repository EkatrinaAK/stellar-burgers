import { Preloader } from '@ui';
import { useSelector } from '../../services/store';

import { Navigate, useLocation } from 'react-router';
import { AuthSelector, UserSelector } from '../../services/slice/userSlice';

type ProtectedRouteProps = {
  onlyAuth?: boolean;
  component: React.JSX.Element;
};

export const ProtectedRoute = ({
  onlyAuth,
  component
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(AuthSelector);
  const user = useSelector(UserSelector);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (onlyAuth && user) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return component;
};

export const Auth = ProtectedRoute;
export const OnlyAuth = ({
  component
}: {
  component: React.JSX.Element;
}): React.JSX.Element => <ProtectedRoute onlyAuth component={component} />;
