import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "../reducers";
import logger from "./loggerMiddleware";

const store = createStore(rootReducer, applyMiddleware(logger()));

export default store;
