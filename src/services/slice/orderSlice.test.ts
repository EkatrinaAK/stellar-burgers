import orderReducer, { IOrderState, resetOrder,postOrder } from './orderSlice';
import { order } from '../../../testData';
import { TNewOrderResponse } from '@api';

describe('Тесты синхронных экшенов', () => {
    
    const initialState: IOrderState = {
        order: null,
        name: null,
        error: null,
        isLoading: false,
        orders: [],
        orderModal: [],
        profileOrders: [],
        total: null,
        totalToday: null
      };

  test('Проверяем очистку заказа', () => {
    const newOrder = orderReducer(initialState, resetOrder());
    expect(newOrder).toEqual({
      order: null,
      name: null,
      error: null,
      isLoading: false,
      orders: [],
      orderModal: [],
      profileOrders: [],
      total: null,
      totalToday: null
    });
  });

    test('Тестируем отправку запроса (pending)', async () => {
      const newState = orderReducer(
        initialState,
        postOrder.pending('pending', order.ingredients)
      );
      expect(newState.isLoading).toBeTruthy();
      expect(newState.error).toBeNull();
    });

    test('Тестируем ошибку при запросе (rejected)', async () => {
      const error: Error = {
        name: 'rejected',
        message: 'Ошибка отправки заказа'
      };
      const newState = orderReducer(
        initialState,
        postOrder.rejected(error, 'rejected', order.ingredients)
      );
      expect(newState.isLoading).toBeFalsy();
      expect(newState.error).toBe(error.message);
    });

    test('Тестируем успешный запрос (fulfilled)', async () => {
      const newOrder: TNewOrderResponse = {
        order: order,
        name: 'new order',
        success: true
      };
      const newState = orderReducer(
        initialState,
        postOrder.fulfilled(newOrder, 'fulfilled', order.ingredients)
      );
      expect(newState.order).toEqual(order);
      expect(newState.isLoading).toBeFalsy();
      expect(newState.error).toBeNull();
    });
  });


