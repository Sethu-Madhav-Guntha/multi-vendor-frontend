export const selectToken = (state) => state.authReducer.token;
export const selectUser = (state) => state.authReducer.user;

export const selectIsUser = (state) => state.authReducer.user === "User";
export const selectIsVendor = (state) => state.authReducer.user === "Vendor";
export const selectIsAuthenticatedUser = (state) => Boolean(state?.authReducer.token);