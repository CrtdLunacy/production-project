import { Country } from 'enteties/Country';
import { Currency } from 'enteties/Currency';
import { updateProfileData } from 'enteties/Profile';
import { ProfileSchema, ValidateProfileError } from '../types/profile';
import { profileActions, profileReducer } from '../slice/profileSlice';

const data = {
    username: 'admin',
    age: 28,
    first: 'admin',
    lastname: 'testovich',
    city: 'Moscow',
    country: Country.Russia,
    currency: Currency.RUB,
};

describe('profileSlice.test', () => {
    test('test set readonly', () => {
        const state: DeepPartial<ProfileSchema> = { readonly: false };
        expect(profileReducer(
          state as ProfileSchema,
          profileActions.setReadonly(true),
        )).toEqual({ readonly: true });
    });

    test('test update profile', () => {
        const state: DeepPartial<ProfileSchema> = { form: { username: '123' } };
        expect(profileReducer(
          state as ProfileSchema,
          profileActions.updateProfile({
              username: '12345',
          }),
        )).toEqual({
            form: {
                username: '12345',
            },
        });
    });

    test('cancel edit', () => {
        const state: DeepPartial<ProfileSchema> = { data, form: { username: '' } };
        expect(profileReducer(
          state as ProfileSchema,
          profileActions.cancelEdit(),
        )).toEqual(
            {
                readonly: true,
                validateErrors: undefined,
                data,
                form: data,
            },
        );
    });

    test('test update profile service pending', () => {
        const state: DeepPartial<ProfileSchema> = { isLoading: false, validateErrors: [ValidateProfileError.SERVER_ERROR] };
        expect(profileReducer(
          state as ProfileSchema,
          updateProfileData.pending,
        )).toEqual({
            isLoading: true,
            validateErrors: undefined,
        });
    });

    test('test update profile service fulfilled', () => {
        const state: DeepPartial<ProfileSchema> = { isLoading: true };
        expect(profileReducer(
      state as ProfileSchema,
      updateProfileData.fulfilled(data, ''),
        )).toEqual({
            isLoading: false,
            readonly: true,
            form: data,
            data,
            validateErrors: undefined,
        });
    });
});
