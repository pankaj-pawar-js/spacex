export default function reducer(state, action) {
    switch (action.type) {
        case "SET_FILTER": {

            return { ...state, filter: { ...action.payload } }
        };

        default: return state;;
    }

}