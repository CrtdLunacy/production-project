import { Profile } from 'enteties/Profile';
import { ValidateProfileError } from '../../model/const/const';

export interface EditableProfileCardSchema {
    data?: Profile;
    form?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
    validateErrors?: ValidateProfileError[];
}
