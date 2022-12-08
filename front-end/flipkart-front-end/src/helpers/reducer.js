const intialState = {
    user: null,
    adUrls: [],
    offerUrl: [],
    isLoggedIn: false,
}

export const reducer = (state = intialState, action) => {
    switch (action.type) {
        case "SET_USER":
            const { user, isLoggedIn } = action.data ?? {}
            return { ...state, user, isLoggedIn }

        case 'SET_ADS':
            return { ...state, adUrls: action.ads }

        case 'SET_OFFERS':
            return { ...state, offerUrl: action.offer }
        default: return state;
    }
}
