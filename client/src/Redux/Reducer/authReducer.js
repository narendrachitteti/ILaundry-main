const initialState = {
    isAuthenticated: sessionStorage.getItem('isAuthenticated') === 'true',
    user: JSON.parse(sessionStorage.getItem('user')) || null,
};
  
const authReducer = (state = initialState , action) => {
    switch(action.type) {
        case 'LOGIN':
            sessionStorage.setItem('isAuthenticated', 'true');
            sessionStorage.setItem('user', JSON.stringify(action.payload));
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            };
        case 'LOGOUT':
            sessionStorage.removeItem('isAuthenticated');
            sessionStorage.removeItem('user');
            return {
                ...state,
                isAuthenticated: false,
                user: null
            };
        default:
            return state;
    }
};

export default authReducer;
