import { Country } from 'enteties/Country';
import { Currency } from 'enteties/Currency';
import { ValidateProfileError } from '../../types/editableProfileCardSchema';
import { validateProfile } from './validateProfile';

const data = {
    id: '1',
    username: 'admin',
    age: 28,
    first: 'admin',
    lastname: 'testovich',
    city: 'Moscow',
    country: Country.Russia,
    currency: Currency.RUB,
};

describe('validateProfile.test', () => {
    test('success', async () => {
        const result = validateProfile(data);

        expect(result).toEqual([]);
    });

    test('without first and last name', async () => {
        const result = validateProfile({ ...data, first: '', lastname: '' });

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
        ]);
    });

    test('without age', async () => {
        const result = validateProfile({ ...data, age: undefined });

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_AGE,
        ]);
    });

    test('without country', async () => {
        const result = validateProfile({ ...data, city: undefined });

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_CITY,
        ]);
    });

    test('without all', async () => {
        const result = validateProfile({});

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_CITY,
        ]);
    });
});
