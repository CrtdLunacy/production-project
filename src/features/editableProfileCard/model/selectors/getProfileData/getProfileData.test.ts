import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileData } from './getProfileData';

describe('getProfileData.test', () => {
    test('Should return data', () => {
        const data = {
            username: 'admin',
            age: 28,
            first: 'admin',
            lastname: 'testovich',
            city: 'Moscow',
            country: Country.Russia,
            currency: Currency.RUB,
        };
        const state: DeepPartial<StateSchema> = {
            profile: {
                data,
            },
        };
        expect(getProfileData(state as StateSchema)).toEqual(data);
    });

    test('Should return undefined', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileData(state as StateSchema)).toEqual(undefined);
    });
});
