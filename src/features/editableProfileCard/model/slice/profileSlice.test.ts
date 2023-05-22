import { Country } from 'enteties/Country';
import { Currency } from 'enteties/Currency';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { EditableProfileCardSchema, ValidateProfileError } from '../types/editableProfileCardSchema';
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
        const state: DeepPartial<EditableProfileCardSchema> = { readonly: false };
        expect(profileReducer(
          state as EditableProfileCardSchema,
          profileActions.setReadonly(true),
        )).toEqual({ readonly: true });
    });

    test('test update profile', () => {
        const state: DeepPartial<EditableProfileCardSchema> = { form: { username: '123' } };
        expect(profileReducer(
          state as EditableProfileCardSchema,
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
        const state: DeepPartial<EditableProfileCardSchema> = { data, form: { username: '' } };
        expect(profileReducer(
          state as EditableProfileCardSchema,
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
        const state: DeepPartial<EditableProfileCardSchema> = { isLoading: false, validateErrors: [ValidateProfileError.SERVER_ERROR] };
        expect(profileReducer(
          state as EditableProfileCardSchema,
          updateProfileData.pending,
        )).toEqual({
            isLoading: true,
            validateErrors: undefined,
        });
    });

    test('test update profile service fulfilled', () => {
        const state: DeepPartial<EditableProfileCardSchema> = { isLoading: true };
        expect(profileReducer(
      state as EditableProfileCardSchema,
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
