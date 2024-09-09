import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  resetIngredients,
  stateSelector
} from '../../services/slice/constructorSlice';
import {
  isLoadingSelector,
  orderSelector,
  resetOrder,
  postOrder
} from '../../services/slice/orderSlice';
import { UserSelector } from '../../services/slice/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  /*const constructorItems = {
    bun: {
      price: 0
    },
    ingredients: []
  };

  const orderRequest = false;
  const orderModalData = null;*/

  const dispatch = useDispatch();
  const constructorItems = useSelector(stateSelector);
  const orderRequest = useSelector(isLoadingSelector);
  const orderModalData = useSelector(orderSelector);
  const user = useSelector(UserSelector);
  const navigate = useNavigate();

  const data: string[] = [
    ...constructorItems.ingredients.map((ingredient) => ingredient._id),
    constructorItems.bun?._id
  ].filter((id): id is string => id !== undefined);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }
    dispatch(postOrder(data));
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(resetIngredients());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients?.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
