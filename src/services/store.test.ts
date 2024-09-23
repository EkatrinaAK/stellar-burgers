import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store';
import { constructorSlice } from './slice/constructorSlice';
import { AppDispatch, RootState } from './store';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

type TestRootState = ReturnType<typeof rootReducer>;

describe('тест Redux Store', () => {
  test('проверка хранилища', () => {
    expect(store).toBeDefined();
    expect(store.getState()).toBeDefined();
  });

  test('проверка RootState type', () => {
    const state: RootState = store.getState();
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('constructor');
    expect(state).toHaveProperty('auth');
  });

  test('проверка AppDispatch type', () => {
    const dispatch: AppDispatch = store.dispatch;
    expect(dispatch).toBeDefined();
  });

  test('правильный dispatch actions and update state', () => {
    const testAction = constructorSlice.actions.addIngredients({
      id: 'testId',
      _id: 'testId',
      name: 'Test Ingredient',
      type: 'main',
      proteins: 10,
      fat: 5,
      carbohydrates: 15,
      calories: 100,
      price: 200,
      image: '',
      image_large: '',
      image_mobile: ''
    });

    store.dispatch(testAction);

    const state = store.getState() as TestRootState;

    expect(state.burgerConstructor.ingredients).toContainEqual({
      id: 'testId',
      _id: 'testId',
      name: 'Test Ingredient',
      type: 'main',
      proteins: 10,
      fat: 5,
      carbohydrates: 15,
      calories: 100,
      price: 200,
      image: '',
      image_large: '',
      image_mobile: ''
    });
  });
});
