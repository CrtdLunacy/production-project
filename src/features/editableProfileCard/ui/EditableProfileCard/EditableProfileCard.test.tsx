import { screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { Profile } from 'enteties/Profile';
import { Currency } from 'enteties/Currency';
import { Country } from 'enteties/Country';
import userEvent from '@testing-library/user-event';
import { use } from 'i18next';
import { $api } from 'shared/api/api';
import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './editableProfileCard';

const profile: Profile = {
    id: '1',
    first: 'anduin',
    lastname: 'lothar',
    age: 32,
    currency: Currency.USD,
    country: Country.Belarus,
    city: 'Pinsk',
    username: 'Blackbelt',
};

const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile,
        },
        user: {
            authData: {
                id: '1',
                username: 'Blackbelt',
            },
        },
    },
    asyncReducers: {
        profile: profileReducer,
    },
};

describe('features/EditableProfileCard', () => {
    test('Turn off readonly', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.Edit'));
        expect(screen.getByTestId('EditableProfileCardHeader.Cancel')).toBeInTheDocument();
    });

    test('Cancel click to back to defaults', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.Edit'));

        await userEvent.clear(screen.getByTestId('ProfileCard.Name'));
        await userEvent.clear(screen.getByTestId('ProfileCard.Surname'));

        await userEvent.type(screen.getByTestId('ProfileCard.Name'), 'user');
        await userEvent.type(screen.getByTestId('ProfileCard.Surname'), 'user');

        expect(screen.getByTestId('ProfileCard.Name')).toHaveValue('user');
        expect(screen.getByTestId('ProfileCard.Surname')).toHaveValue('user');

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.Cancel'));
        expect(screen.getByTestId('ProfileCard.Name')).toHaveValue('anduin');
        expect(screen.getByTestId('ProfileCard.Surname')).toHaveValue('lothar');
    });

    test('Validation test', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.Edit'));

        await userEvent.clear(screen.getByTestId('ProfileCard.Name'));
        expect(screen.getByTestId('ProfileCard.Name')).toHaveValue('');

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.Save'));

        expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
    });

    test('Edit test', async () => {
        const mockPutReq = jest.spyOn($api, 'put');

        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.Edit'));

        await userEvent.type(screen.getByTestId('ProfileCard.Name'), 'user');

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.Save'));

        expect(mockPutReq).toHaveBeenCalled();
    });
});
