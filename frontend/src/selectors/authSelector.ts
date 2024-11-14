import { AuthState } from "../entities";

export const authSelector = (state: { auth: AuthState }) => state.auth;
