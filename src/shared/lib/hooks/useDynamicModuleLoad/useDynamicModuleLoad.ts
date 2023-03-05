import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { Reducer } from '@reduxjs/toolkit';

export type ReducersList = {
  [key in StateSchemaKey]?: Reducer;
}

interface DynamicModule {
  reducers: ReducersList;
  isRemoved?: boolean;
}

export const useDynamicModuleLoad = ({ reducers, isRemoved = true }: DynamicModule): void => {
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]) => {
            store.reducerManager.add(name as StateSchemaKey, reducer);
            dispatch({ type: '@Mount' });
        });
        return () => {
            if (isRemoved) {
                Object.entries(reducers).forEach(([name, reducer]) => {
                    store.reducerManager.remove(name as StateSchemaKey);
                    dispatch({ type: '@Unmount' });
                });
            }
        };
    // eslint-disable-next-line
  }, []);
};
