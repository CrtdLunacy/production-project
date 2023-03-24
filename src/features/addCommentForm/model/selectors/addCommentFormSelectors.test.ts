import { StateSchema } from 'app/providers/StoreProvider';
import {
    getAddCommentFormError,
    getAddCommentFormText,
} from './addCommentFormSelectors';

describe('addCommentFormSelectors.test', () => {
    test('Should return text', () => {
        const text = 'comment text';
        const state: DeepPartial<StateSchema> = {
            addCommentForm: {
                text,
            },
        };
        expect(getAddCommentFormText(state as StateSchema)).toEqual(text);
    });

    test('Should return undefiend without text', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getAddCommentFormText(state as StateSchema)).toEqual(undefined);
    });

    test('Should return error', () => {
        const state: DeepPartial<StateSchema> = {
            addCommentForm: {
                error: 'error',
            },
        };
        expect(getAddCommentFormError(state as StateSchema)).toEqual('error');
    });

    test('Should work with empty error', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getAddCommentFormError(state as StateSchema)).toEqual(undefined);
    });
});
