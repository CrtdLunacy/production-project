import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginError } from './getLoginError';

describe('getLoginError.test', () => {
    test('Should return error', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                error: 'Произошла ошибка',
            },
        };
        expect(getLoginError(state as StateSchema)).toEqual('Произошла ошибка');
    });

    test('Should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginError(state as StateSchema)).toEqual(undefined);
    });
});
