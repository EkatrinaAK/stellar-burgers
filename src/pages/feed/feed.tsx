import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  isLoadingSelector,
  ordersSelector,
  getFeeds
} from '../../services/slice/orderSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  //const orders: TOrder[] = [];
  const orders: TOrder[] = useSelector(ordersSelector);
  const isLoading = useSelector(isLoadingSelector);

  /*if (!orders.length) {
    return <Preloader />;
  }*/
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeeds());
  }, []);
  const handleGetFeeds = useCallback(() => {
    dispatch(getFeeds());
  }, []);

  return (
    <>
      <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />
    </>
  );
};
// <FeedUI orders={orders} handleGetFeeds={() => {}} />;
