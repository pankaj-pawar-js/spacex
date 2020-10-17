export default function reducer(state, action) {
    console.log(action, state)
    switch (action.type) {
        case "SET_FILTER": {

            return { ...state, filter: { ...action.payload } }
        };

        default: return state;;
    }

}