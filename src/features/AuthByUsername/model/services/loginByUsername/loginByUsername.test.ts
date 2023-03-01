import axios from 'axios';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { userActions } from 'enteties/User';
import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/testAsyncThunk';

jest.mock('axios');

const mockedAxios = jest.mocked(axios, { shallow: true });

describe('loginByUsername.test', () => {
    // let dispatch: Dispatch;
    // let getState: () => StateSchema;
    //
    // beforeEach(() => {
    //     dispatch = jest.fn();
    //     getState = jest.fn();
    // });
    //
    // test('Should be fulfilled', async () => {
    //     const userValue = { username: '123', id: '1' };
    //     (mockedAxios.post as jest.Mock).mockReturnValue(Promise.resolve({ data: userValue }));
    //     const action = loginByUsername({ username: '123', password: '123' });
    //     const result = await action(dispatch, getState, undefined);
    //
    //     expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
    //     expect(dispatch).toHaveBeenCalledTimes(3);
    //     expect(mockedAxios.post).toBeCalled();
    //     expect(result.meta.requestStatus).toBe('fulfilled');
    //     expect(result.payload).toBe(userValue);
    // });
    //
    // test('Should work with 403 status', async () => {
    //     (mockedAxios.post as jest.Mock).mockReturnValue(Promise.resolve({ status: 403 }));
    //     const action = loginByUsername({ username: '123', password: '123' });
    //     const result = await action(dispatch, getState, undefined);
    //
    //     expect(mockedAxios.post).toBeCalled();
    //     expect(dispatch).toHaveBeenCalledTimes(2);
    //     expect(result.payload).toBe('Authorization Error');
    // });

    test('Should be fulfilled', async () => {
        const userValue = { username: '123', id: '1' };
        (mockedAxios.post as jest.Mock).mockReturnValue(Promise.resolve({ data: userValue }));
        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.callThunk({ username: '123', password: '123' });

        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        expect(mockedAxios.post).toBeCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toBe(userValue);
    });

    test('Should work with 403 status', async () => {
        (mockedAxios.post as jest.Mock).mockReturnValue(Promise.resolve({ status: 403 }));
        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.callThunk({ username: '123', password: '123' });

        expect(mockedAxios.post).toBeCalled();
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(result.payload).toBe('Authorization Error');
    });
});
