import ingredientsReducer, { TIngredientsState, initialState} from './ingredientsSlice';

import { buns } from '../../../testData';
import { fetchIngredients } from './ingredientsSlice';

describe('Тесты асинхронных экшенов', () => {
  describe('Тестируем fetchIngredients', () => {
    
    test('тестируем отправку запроса (pending)', async () => {
      const newState = ingredientsReducer(
        initialState,
        fetchIngredients.pending('pending')
      );

      expect(newState.isLoading).toBeTruthy();
      expect(newState.error).toBeNull();
    });

    test('тестируем ошибку при запросе (rejected)', async () => {
      const error: Error = {
        name: 'rejected',
        message: 'Ошибка выгрузки ингредиентов'
      };
      const newState = ingredientsReducer(
        initialState,
        fetchIngredients.rejected(error, 'rejected')
      );

      expect(newState.isLoading).toBeFalsy();
      expect(newState.error).toBe(error.message);
    });
    test('тестируем успешный запрос (fulfilled)', async () => {
      
      const newState = ingredientsReducer(
        initialState,
        fetchIngredients.fulfilled(buns, 'fulfilled')
      );

      expect(newState.ingredients).toEqual(buns);
      expect(newState.isLoading).toBeFalsy();
      expect(newState.error).toBeNull();
    });
  });
});
