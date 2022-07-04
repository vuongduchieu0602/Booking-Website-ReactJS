import axios from '../axios';

const handleLogin = (email, password) => {
    return axios.post('api/login', {email, password});
}

const getAllUser = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {data: {id: userId}});
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}

export {handleLogin, getAllUser, createNewUserService, deleteUserService, editUserService};
