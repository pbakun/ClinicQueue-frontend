import { UtilityAction } from './utility/interface';
import { RoomsAction } from './rooms/interface';
import { AuthAction } from './auth/interface';
import * as authActions from "./auth/authActions";
import * as roomsActions from "./rooms/roomsAction";
import * as utilityActions from "./utility/utilityAction";

const Actions = {
    auth: authActions,
    rooms: roomsActions,
    utility: utilityActions
};

export default Actions;

export type RootActions = AuthAction | RoomsAction | UtilityAction;