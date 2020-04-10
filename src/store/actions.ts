import { RoomsAction } from './rooms/interface';
import { AuthAction } from './auth/interface';
import * as authActions from "./auth/authActions";
import * as roomsActions from "./rooms/roomsAction";

const Actions = {
    auth: authActions,
    rooms: roomsActions
};

export default Actions;

export type RootActions = AuthAction | RoomsAction;