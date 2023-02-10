import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer, // user is the name of the slice
    // user: userReducer,
    // complain:
  },
});

export default store;
