const initialState = {
  modules:[]
}

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case 'STORE_MODULES':
      return {
        ...state,
        modules: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
