import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../components/features/auth/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import orderReducer from "../components/features/order/orderSlice";


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth","order"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
