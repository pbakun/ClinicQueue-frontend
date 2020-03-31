import { AuthAction } from './auth/interface';
import * as authActions from "./auth/authActions";

const Actions = {
    auth: authActions
};

export default Actions;

export type RootActions = AuthAction;