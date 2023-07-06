import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileForm } from './getProfileForm';

describe('getProfileForm.test', () => {
    test('Should return form', () => {
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
                form: data,
            },
        };
        expect(getProfileForm(state as StateSchema)).toEqual(data);
    });

    test('Should return undefined', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileForm(state as StateSchema)).toEqual(undefined);
    });
});
