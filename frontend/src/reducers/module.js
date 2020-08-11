const initialState = {
  id:null,
  name:"",
  intents:[]
}

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case 'UPDATE_MODULE':
      return { ...state, ...action.payload }
    case 'STORE_MODULE':
      return { ...state, ...action.payload }
    default:
      return {
        ...state
      }
  }
}
