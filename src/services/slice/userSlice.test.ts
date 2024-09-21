import { userSlice, setUser, setIsAuthChecked, initialState } from './userSlice';
import {
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './userSlice';
import { TUser } from '@utils-types';

const testUser: TUser = {
  name: 'Test User',
  email: 'test@example.com'
};

describe('authSlice', () => {
  
  test('вернуть начальное состояние', () => {
    expect(userSlice.reducer(undefined, { type: 'undefined' })).toEqual(
      initialState
    );
  });

  test('установить пользователя при вызове setUser', () => {
    const nextState = userSlice.reducer(initialState, setUser(testUser));
    expect(nextState.user).toEqual(testUser);
  });

  test('установить isAuthChecked при вызове setIsAuthChecked', () => {
    const nextState = userSlice.reducer(initialState, setIsAuthChecked(true));
    expect(nextState.isAuthChecked).toBe(true);
  });

  describe('extraReducers', () => {
    
    test('сбросить ошибку при registerUser.pending', () => {
      const action = { type: registerUser.pending.type };
      const nextState = userSlice.reducer(initialState, action);
      expect(nextState.error).toBe(null);
    });

    test('установить пользователя и isAuthChecked при registerUser.fulfilled', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: { user: testUser }
      };
      const nextState = userSlice.reducer(initialState, action);
      expect(nextState.user).toEqual(testUser);
      expect(nextState.isAuthChecked).toBe(true);
    });

    test('установить ошибку и isAuthChecked при registerUser.rejected', () => {
      const action = {
        type: registerUser.rejected.type,
        error: { message: 'Error' }
      };
      const nextState = userSlice.reducer(initialState, action);
      expect(nextState.error).toBe('Error');
      expect(nextState.isAuthChecked).toBe(true);
    });

    test('установить пользователя и isAuthChecked при loginUser.fulfilled', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: { user: testUser }
      };
      const nextState = userSlice.reducer(initialState, action);
      expect(nextState.user).toEqual(testUser);
      expect(nextState.isAuthChecked).toBe(true);
    });

    test('установить ошибку и isAuthChecked при loginUser.rejected', () => {
      const action = {
        type: loginUser.rejected.type,
        error: { message: 'Error' }
      };
      const nextState = userSlice.reducer(initialState, action);
      expect(nextState.error).toBe('Error');
      expect(nextState.isAuthChecked).toBe(true);
    });

    test('очистить пользователя при logoutUser.fulfilled', () => {
      const action = { type: logoutUser.fulfilled.type };
      const nextState = userSlice.reducer(
        { ...initialState, user: testUser },
        action
      );
      expect(nextState.user).toBe(null);
    });

    test('обновить пользователя при updateUser.fulfilled', () => {
      const updatedUser = { ...testUser, name: 'Updated User' };
      const action = {
        type: updateUser.fulfilled.type,
        payload: { user: updatedUser }
      };
      const nextState = userSlice.reducer(
        { ...initialState, user: testUser },
        action
      );
      expect(nextState.user).toEqual(updatedUser);
    });
  });
});