import axios from '../axios';

const handleLogin = (email, password) => {
    return axios.post('api/login', {email, password});
}

const getAllUser = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

export {handleLogin, getAllUser};
