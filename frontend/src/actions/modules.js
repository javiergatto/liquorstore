import axios from 'axios';

const API_URL = 'http://localhost/api'

export function createModule(){
  return function(dispatch, getState){
    const module = getState().module;
    const data = {
        name: module.name
    }
    axios.post(`${API_URL}/modules`, {data})
    .then((response) => {
        dispatch(storeModule(response))
        dispatch(navToModuleEditForm())
    });
  }
};

export function createModuleIntent(data){
  return function(dispatch, getState){
    const module = getState().module;
    data['module_id'] = module.id
    axios.post(`${API_URL}/intents/`, {data})
    .then((response) => {
        dispatch(loadModule(module.id))
    });
  }
};

export function createIntentPattern(data){
  return function(dispatch, getState){
    const module = getState().module;
    axios.post(`${API_URL}/intent/patterns`, {data})
    .then((response) => {
        dispatch(loadModule(module.id))
    });
  }
};

export function createIntentResponse(data){
  return function(dispatch, getState){
    const module = getState().module;
    axios.post(`${API_URL}/intent/responses`, {data})
    .then((response) => {
        dispatch(loadModule(module.id))
    });
  }
};

export function createIntentDialog(data){
  return function(dispatch, getState){
    const module = getState().module;
    axios.post(`${API_URL}/intent/dialogs`, {data})
    .then((response) => {
        dispatch(loadModule(module.id))
    });
  }
};

export function createIntentContext(data){
  return function(dispatch, getState){
    const module = getState().module;
    axios.post(`${API_URL}/intent/contexts`, {data})
    .then((response) => {
        dispatch(loadModule(module.id))
    });
  }
};

export function loadModules(){
    return function(dispatch){
        dispatch(loadingModules)
        axios.get(`${API_URL}/modules`)
        .then((response) => {
            dispatch(storeModules(response))
        });
    }
};

export function loadingModules(){
  return {
    type: 'LOADING_MODULES',
    payload: null
  }
};

export function storeModules(response){
  return {
    type: 'STORE_MODULES',
    payload: response.data.results
  }
};

export function loadModule(id){
    return function(dispatch){
        axios.get(`${API_URL}/modules/${id}`)
        .then((response) => {
            dispatch(storeModule(response))
        });
    }
};

export function storeModule(response){
  return {
    type: 'STORE_MODULE',
    payload: response.data.result
  }
};

export function updateModule(data){
  return {
    type: 'UPDATE_MODULE',
    payload: data
  }
};

export function patchModule(){
  return function(dispatch, getState){
    const module = getState().module;
    const data = {
        name: module.name
    }
    axios.patch(`${API_URL}/modules/${module.id}`, {data})
    .then((response) => {
        dispatch(storeModule(response))
    });
  }
};

export function patchIntent(data){
  return function(dispatch, getState){
    const module = getState().module;
    axios.patch(`${API_URL}/intent/${data.id}`, {data})
    .then((response) => {
        dispatch(loadModule(module.id))
    });
  }
};

export function patchIntentPattern(data){
  return function(dispatch, getState){
    const module = getState().module;
    axios.patch(`${API_URL}/intent/patterns/${data.id}`, {data})
    .then((response) => {
        dispatch(loadModule(module.id))
    });
  }
};

export function patchIntentResponse(data){
  return function(dispatch, getState){
    const module = getState().module;
    axios.patch(`${API_URL}/intent/responses/${data.id}`, {data})
    .then((response) => {
        dispatch(loadModule(module.id))
    });
  }
};

export function patchIntentContext(data){
  return function(dispatch, getState){
    const module = getState().module;
    axios.patch(`${API_URL}/intent/contexts/${data.id}`, {data})
    .then((response) => {
        dispatch(loadModule(module.id))
    });
  }
};

export function patchIntentDialog(data){
  return function(dispatch, getState){
  const module = getState().module;
    axios.patch(`${API_URL}/intent/dialogs/${data.id}`, {data})
    .then((response) => {
        dispatch(loadModule(module.id))
    });
  }
};

export function deleteModule(id){
  return function(dispatch){
    axios.delete(`${API_URL}/modules/${id}`)
    .then((response) => {
        dispatch(deletedModule(id))
    });
  }
};

export function deleteIntent(id){
  return function(dispatch, getState){
    const module = getState().module;
    axios.delete(`${API_URL}/intents/${id}`)
    .then((response) => {
        dispatch(loadModule(module.id))
    });
  }
};

export function deleteIntentPattern(id){
  return function(dispatch, getState){
    const module = getState().module;
    axios.delete(`${API_URL}/intent/patterns/${id}`)
    .then((response) => {
        dispatch(loadModule(module.id))
    });
  }
};

export function deleteIntentResponse(id){
  return function(dispatch, getState){
    const module = getState().module;
    axios.delete(`${API_URL}/intent/responses/${id}`)
    .then((response) => {
        dispatch(loadModule(module.id))
    });
  }
};

export function deleteIntentContext(id){
  return function(dispatch, getState){
    const module = getState().module;
    axios.delete(`${API_URL}/intent/contexts/${id}`)
    .then((response) => {
        dispatch(loadModule(module.id))
    });
  }
};

export function deleteIntentDialog(id){
  return function(dispatch, getState){
    const module = getState().module;
    axios.delete(`${API_URL}/intent/dialogs/${id}`)
    .then((response) => {
        dispatch(loadModule(module.id))
    });
  }
};

export function deletedModule(id){
  return {
    type: 'DELETED_MODULE',
    payload: id
  }
};

export function navToModuleEditForm(id=null){
    return function(dispatch, getState){
        if(id === null){
            id = getState().module.id;
        }
        if(id !== null){
            dispatch(navTo(`/module/${id}/edit`))
        }
    }
};

export function navTo(uri){
    return function(dispatch){
        window.location.href = window.location.origin + uri;
    }
};

