import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { userReducer } from 'enteties/User';

export function createReduxStore(initialState?: StateSchema) {
    const RootReducers:ReducersMapObject<StateSchema> = {
        user: userReducer,
    };

    return configureStore<StateSchema>({
        reducer: RootReducers,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
}
