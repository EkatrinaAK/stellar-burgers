import {
    getFeedsApi,
    getOrdersApi,
    orderBurgerApi,
    getOrderByNumberApi
  } from '@api';
  import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
  import { TOrder } from '@utils-types';
  
  interface IOrderState {
    order: TOrder | null;
    name: string | null;
    error: string | null | undefined;
    isLoading: boolean;
    orders: TOrder[];
    orderModal: TOrder[];
    profileOrders: TOrder[];
    total: number | null;
    totalToday: number | null;
  }
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
  
  export const getFeeds = createAsyncThunk('order/getFeeds', async () => {
    const response = await getFeedsApi();
    return response;
  });
  export const getOrders = createAsyncThunk('order/getOrders', async () => {
    const response = await getOrdersApi();
    return response;
  });
  export const getOrderByNum = createAsyncThunk(
    'order/getOrderByNum',
    async (number: number) => {
      const response = await getOrderByNumberApi(number);
      return response;
    }
  );
  export const postOrder = createAsyncThunk(
    'order/postOrder',
    async (data: string[]) => {
      const response = await orderBurgerApi(data);
      return response;
    }
  );
  export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
      resetOrder: (state) => {
        state.order = null;
        state.name = null;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(getFeeds.fulfilled, (state, action) => {
          state.isLoading = false;
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        })
        .addCase(getFeeds.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
          state.total = 0;
          state.totalToday = 0;
          state.orders = [];
        });
      builder
        .addCase(getOrders.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getOrders.fulfilled, (state, action) => {
          state.isLoading = false;
          state.profileOrders = action.payload;
        })
        .addCase(getOrders.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        });
      builder
        .addCase(getOrderByNum.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getOrderByNum.fulfilled, (state, action) => {
          state.isLoading = false;
          state.orderModal = action.payload.orders;
        })
        .addCase(getOrderByNum.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        });
      builder
        .addCase(postOrder.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(postOrder.fulfilled, (state, action) => {
          state.isLoading = false;
          state.name = action.payload.name;
          state.order = action.payload.order;
        })
        .addCase(postOrder.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        });
    },
    selectors: {
      orderSelector: (state) => state.order,
      isLoadingSelector: (state) => state.isLoading,
      ordersSelector: (state) => state.orders,
      orderModalSelector: (state) => state.orderModal[0],
      profileOrdersSelector: (state) => state.profileOrders,
      totalSelector: (state) => state.total,
      totalTodaySelector: (state) => state.totalToday
    }
  });
  
  export const {
    orderSelector,
    isLoadingSelector,
    ordersSelector,
    orderModalSelector,
    profileOrdersSelector,
    totalSelector,
    totalTodaySelector
  } = orderSlice.selectors;
  
  export const { resetOrder } = orderSlice.actions;
  