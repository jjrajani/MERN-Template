import t from '../../actions/auth/types';

export default function(state = null, action) {
    switch (action.type) {
    case t.FETCH_USER:
        return action.payload || false;
    default:
        return state;
    }
}
