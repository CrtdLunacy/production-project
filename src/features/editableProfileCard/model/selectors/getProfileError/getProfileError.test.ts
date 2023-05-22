import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileError } from './getProfileError';

describe('getProfileError.test', () => {
    test('Should return error', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                error: 'true',
            },
        };
        expect(getProfileError(state as StateSchema)).toEqual('true');
    });

    test('Should return undefined', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileError(state as StateSchema)).toEqual(undefined);
    });
});
