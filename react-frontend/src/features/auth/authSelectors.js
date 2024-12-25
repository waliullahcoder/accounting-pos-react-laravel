// Selectors for the auth slice

export const selectToken = (state) => state.auth.token;
export const selectIsSuperAdmin = (state) => state.auth.isSuperAdmin;
