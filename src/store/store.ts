import authApi from "@/api/Ath";
import CartApi, { CartReducer } from "@/api/cart";
import OrderApi, { OrderReducer } from "@/api/order";
import productsApi, { productReducer } from "@/api/product";
import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
}
const rootReducer = combineReducers({
    [productsApi.reducerPath]: productReducer,
    [authApi.reducerPath]: authApi.reducer,
    [OrderApi.reducerPath]: OrderReducer,
    [CartApi.reducerPath]: CartReducer,

})
const middleware = [
    productsApi.middleware,
    authApi.middleware,
    OrderApi.middleware,
    CartApi.middleware
]
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(...middleware),
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
export default persistStore(store)