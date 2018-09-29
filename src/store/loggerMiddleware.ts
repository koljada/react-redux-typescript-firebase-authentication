import { AnyAction, Dispatch, Middleware, Store } from 'redux';

export default function logger() {

    const loggerMiddleware: Middleware = (store: Store) => (next: Dispatch) => (action: AnyAction) => {

        console.groupCollapsed('will dispatch', action.type);

        // Call the next dispatch method in the middleware chain.
        const returnValue = next(action);

        console.log('state after dispatch', store.getState());
        
        console.groupEnd();
        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        return returnValue;
    }

    return loggerMiddleware;
};