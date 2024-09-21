import { TConstructorIngredient } from '@utils-types';
import constructorSlice, {
  addIngredients,
  removeIngredients,
  resetIngredients,
  moveIngredientUp,
  moveIngredientDown,
  deleteIngredient,
  TConstructorState
} from './constructorSlice';
import { buns, notBuns } from '../../../testData';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'unique-id')
}));

describe('Тесты Constructor Slice', () => {
  const clearInitialState: TConstructorState = {
    bun: null,
    ingredients: []
  };

  const filledInitialState: TConstructorState = {
    bun: {
      ...buns[0],
      id: 'unique-id'
    },
    ingredients: [
      {
        ...notBuns[0],
        id: 'unique-id'
      },
      {
        ...notBuns[1],
        id: 'unique-id'
      }
    ]
  };

  test('Добавление булочки в конструктор', () => {
    const bun: TConstructorIngredient = {
      ...buns[0],
      id: 'unique-id'
    };
    const newState = constructorSlice(clearInitialState, addIngredients(bun));
    expect(newState.bun).toEqual(bun);
  });

  test('Изменение булки в конструкторе', () => {
    const newBun: TConstructorIngredient = {
      ...buns[1],
      id: 'unique-id'
    };
    const newState = constructorSlice(
      filledInitialState,
      addIngredients(newBun)
    );
    expect(newState.bun).toEqual(newBun);
  });

  test('Добавление ингредиента в пустой конструктор', () => {
    const ingredient: TConstructorIngredient = {
      ...notBuns[0],
      id: 'unique-id'
    };
    const newState = constructorSlice(
      clearInitialState,
      addIngredients(ingredient)
    );
    expect(newState.ingredients.length).toBe(1);
    expect(newState.ingredients[0]).toEqual(ingredient);
  });

  test('Добавление ингредиента в непустой конструктор', () => {
    const ingredient: TConstructorIngredient = {
      ...notBuns[2],
      id: 'unique-id'
    };
    const newState = constructorSlice(
      filledInitialState,
      addIngredients(ingredient)
    );
    expect(newState.ingredients.length).toBe(3);
    expect(newState.ingredients[2]).toEqual(ingredient);
  });

  test('Удаление всех ингредиентов', () => {
    const newState = constructorSlice(
      filledInitialState,
      removeIngredients([])
    );

    expect(newState.ingredients).toEqual([]);
    expect(newState.bun).toEqual(filledInitialState.bun);
  });

  test('Сброс состояния', () => {
    const newState = constructorSlice(filledInitialState, resetIngredients());
    expect(newState).toEqual(clearInitialState);
  });

  test('Перемещение ингредиента вверх', () => {
    const newState = constructorSlice(filledInitialState, moveIngredientUp(1));
    expect(newState.ingredients[0]).toEqual(filledInitialState.ingredients[1]);
    expect(newState.ingredients[1]).toEqual(filledInitialState.ingredients[0]);
  });

  test('Перемещение ингредиента вниз', () => {
    const newState = constructorSlice(
      filledInitialState,
      moveIngredientDown(0)
    );
    expect(newState.ingredients[0]).toEqual(filledInitialState.ingredients[1]);
    expect(newState.ingredients[1]).toEqual(filledInitialState.ingredients[0]);
  });

  test('Удаление ингредиента', () => {
    const newState = constructorSlice(filledInitialState, deleteIngredient(0));
    expect(newState.ingredients.length).toBe(1);
    expect(newState.ingredients[0]).toEqual(filledInitialState.ingredients[1]);
  });
});