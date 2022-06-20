import { GET_LOGIN_USER, LOGOUT_USER, VERIFY_USER, SET_LOADING} from "../types";

export default (state, action) => {
    switch (action.type) {
/*        case GET_LOGIN_USER:
            return {
                ...state,
                user: action.payload,
                loading: false
            }*/
        case VERIFY_USER:
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}
