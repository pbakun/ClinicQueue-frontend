import { createStore, applyMiddleware } from "redux";
import thunkMiddleware, {ThunkMiddleware} from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer, RootState } from './reducers';

export default function configureStore() {
    const middleware = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middleware);

    const store = createStore(
        rootReducer,
        composeWithDevTools(middleWareEnhancer)
    );

    return store;
}