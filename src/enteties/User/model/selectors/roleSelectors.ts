import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';

import { UserRole } from 'enteties/User/model/const/const';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

export const isUserAdmin = createSelector(getUserRoles, (roles) => Boolean(roles?.includes(UserRole.ADMIN)));
export const isUserModerator = createSelector(getUserRoles, (roles) => Boolean(roles?.includes(UserRole.MODERATOR)));
