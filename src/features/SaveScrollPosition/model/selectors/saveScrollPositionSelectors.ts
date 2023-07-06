import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getSaveScrollPosition = (state: StateSchema) => state.scrollPosition.scroll;
export const getSaveScrollPositionByPath = createSelector(
    getSaveScrollPosition,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0,
);
