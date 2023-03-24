import { addCommentFormSchema } from '../types/addCommentFormSchema';
import { addCommentFormActions, addCommentFormReducer } from '../slices/addCommentFormSlice';

describe('addCommentForm.test', () => {
    test('test set text', () => {
        const state: DeepPartial<addCommentFormSchema> = { text: 'test text' };
        expect(addCommentFormReducer(
      state as addCommentFormSchema,
      addCommentFormActions.setText('new test text'),
        )).toEqual({ text: 'new test text' });
    });

    test('test with empty state', () => {
        const state: DeepPartial<addCommentFormSchema> = {};
        expect(addCommentFormReducer(
      state as addCommentFormSchema,
      addCommentFormActions.setText('321321'),
        )).toEqual({ text: '321321' });
    });
});
