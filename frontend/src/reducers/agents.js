const initialState = {
  agents:[]
}

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case 'STORE_AGENTS':
      return {
        ...state,
        agents: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
