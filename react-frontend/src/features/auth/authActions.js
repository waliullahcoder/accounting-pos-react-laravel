import { createAction } from '@reduxjs/toolkit';

// Example custom actions
export const resetAuthState = createAction('auth/resetAuthState');

// This action can be used to reset the entire auth state to its initial values without invoking specific reducers.
