import { ProfileOrdersUI } from '@ui-pages';
import { TOrder, TIngredient } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  profileOrdersSelector,
  getOrders
} from '../../services/slice/orderSlice';
import {
  ingredientsSelector,
  fetchIngredients
} from '../../services/slice/ingredientsSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  // const orders: TOrder[] = [];

  const orders: TOrder[] = useSelector(profileOrdersSelector);
  const ingredients: TIngredient[] = useSelector(ingredientsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
    dispatch(getOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
