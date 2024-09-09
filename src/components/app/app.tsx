import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { Auth, OnlyAuth } from '../protected-route/protected-route';
import { userAuth } from '../../services/slice/userSlice';
import { fetchIngredients } from '../../services/slice/ingredientsSlice';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userAuth());
    dispatch(fetchIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<OnlyAuth component={<Login />} />} />
        <Route
          path='/register'
          element={<OnlyAuth component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<OnlyAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<OnlyAuth component={<ResetPassword />} />}
        />
        <Route path='/profile' element={<Auth component={<Profile />} />} />
        <Route
          path='profile/orders'
          element={<Auth component={<ProfileOrders />} />}
        />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={<Auth component={<OrderInfo />} />}
        />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title='Заказ'
                children={<OrderInfo />}
                onClose={() => navigate('/feed')}
              />
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Ингредиенты'
                children={<IngredientDetails />}
                onClose={() => navigate('/')}
              />
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title='Заказ'
                children={<Auth component={<OrderInfo />} />}
                onClose={() => navigate('/profile/orders')}
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};
export default App;
