import axios from 'axios';

const API_URL = 'http://localhost/api'

export function createAgent(){
  return function(dispatch, getState){
    const agent = getState().agent;
    const data = {
        name: agent.name,
        description: agent.description
    }
    axios.post(`${API_URL}/agents`, {data})
    .then((response) => {
        dispatch(storeAgent(response))
        dispatch(navToAgentEditForm())
    });
  }
};

export function loadAgents(){
    return function(dispatch){
        dispatch(loadingAgents)
        axios.get(`${API_URL}/agents`)
        .then((response) => {
            dispatch(storeAgents(response))
        });
    }
};

export function loadingAgents(){
  return {
    type: 'LOADING_AGENTS',
    payload: null
  }
};

export function storeAgents(response){
  return {
    type: 'STORE_AGENTS',
    payload: response.data.results
  }
};

export function loadAgent(id){
    return function(dispatch){
        axios.get(`${API_URL}/agents/${id}`)
        .then((response) => {
            dispatch(storeAgent(response))
        });
    }
};

export function storeAgent(response){
  return {
    type: 'STORE_AGENT',
    payload: response.data.result
  }
};

export function updateAgent(data){
  return {
    type: 'UPDATE_AGENT',
    payload: data
  }
};

export function patchAgent(){
  return function(dispatch, getState){
    const agent = getState().agent;
    const data = {
        name: agent.name,
        description: agent.description
    }
    axios.patch(`${API_URL}/agents/${agent.id}`, {data})
    .then((response) => {
        dispatch(storeAgent(response))
    });
  }
};

export function deleteAgent(id){
  return function(dispatch){
    axios.delete(`${API_URL}/agents/${id}`)
    .then((response) => {
        dispatch(deletedAgent(id))
    });
  }
};

export function deletedAgent(id){
  return {
    type: 'DELETED_AGENT',
    payload: id
  }
};

export function postAgentModule(){
  return function(dispatch, getState){
    const agent = getState().agent;
    if(agent.selected_module_id !== null){
        const data = {
          module_id: agent.selected_module_id,
        }
        axios.post(`${API_URL}/agents/${agent.id}/modules`, {data})
        .then((response) => {
            dispatch(storeAgent(response))
        });
    }
  }
};

export function deleteAgentModule(module_id, agent_id=null){
  return function(dispatch, getState){
    if(agent_id === null){
        agent_id = getState().agent.id;
    }
    axios.delete(`${API_URL}/agents/${agent_id}/modules/${module_id}`)
    .then((response) => {
        dispatch(storeAgent(response))
    });
  }
};

export function loadModules(){
    return function(dispatch){
        axios.get(`${API_URL}/modules`)
        .then((response) => {
            dispatch(storeModules(response))
        });
    }
};

export function navToAgentEditForm(id=null){
    return function(dispatch, getState){
        if(id === null){
            id = getState().agent.id;
        }
        if(id !== null){
            dispatch(navTo(`/agent/${id}/edit`))
        }
    }
};

export function navTo(uri){
    return function(dispatch){
        window.location.href = window.location.origin + uri;
    }
};

export function storeModules(response){
  return {
    type: 'STORE_MODULES',
    payload: response.data.results
  }
};
