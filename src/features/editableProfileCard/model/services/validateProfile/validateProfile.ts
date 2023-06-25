import { Profile } from 'enteties/Profile';
import { ValidateProfileError } from '../../const/const';

export const validateProfile = (profile?: Profile): ValidateProfileError[] => {
    if (!profile) {
        return [ValidateProfileError.NO_DATA];
    }
    const {
        first, lastname, age, city,
    } = profile;
    const errors: ValidateProfileError[] = [];

    if (!first || !lastname) {
        errors.push(ValidateProfileError.INCORRECT_USER_DATA);
    }

    if (!age || !Number.isInteger(age)) {
        errors.push(ValidateProfileError.INCORRECT_AGE);
    }

    if (!city) {
        errors.push(ValidateProfileError.INCORRECT_CITY);
    }

    return errors;
};
