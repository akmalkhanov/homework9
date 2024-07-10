import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice/Index";

const store = configureStore({
    reducer: {
        todo: todoSlice,
    }
})

export default store;