import { Country } from 'enteties/Country';
import { Currency } from 'enteties/Currency';
import { TestAsyncThunk } from '../../../../../shared/lib/tests/testAsyncThunk/testAsyncThunk';
import { fetchProfileData } from './fetchProfileData';

const data = {
    username: 'admin',
    age: 28,
    first: 'admin',
    lastname: 'testovich',
    city: 'Moscow',
    country: Country.Russia,
    currency: Currency.RUB,
};

describe('fetchProfileData.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ data }));
        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toBe(data);
    });

    test('error', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
    });
});
