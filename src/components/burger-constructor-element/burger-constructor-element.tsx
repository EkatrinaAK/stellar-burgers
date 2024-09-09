import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  deleteIngredient,
  moveIngredientDown,
  moveIngredientUp
} from '../../services/slice/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    //const handleMoveDown = () => {};
    const dispatch = useDispatch();
    const handleMoveDown = () => {
      dispatch(moveIngredientDown(index));
    };

    //const handleMoveUp = () => {};
    const handleMoveUp = () => {
      dispatch(moveIngredientUp(index));
    };

    //const handleClose = () => {};
    const handleClose = () => {
      dispatch(deleteIngredient(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
