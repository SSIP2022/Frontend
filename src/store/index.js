import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import complainReducer from "./complainReducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer, // user is the name of the slice
    // user: userReducer,
    complains: complainReducer,
  },
});

export default store;
