import { combineReducers } from "redux";
import global from "./global";

export const rootReducer = combineReducers({
    global: global
})

const reducers = (state, action) => rootReducer(state, action);

export default reducers;