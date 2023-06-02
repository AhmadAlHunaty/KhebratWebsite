import api from '.';

const login = (data) => {
    return api.post('/auth/login', data);
}

const registerEmployer = (data) => {
    return api.post('/auth/employer/register', data);
}

const registerJobSeeker = (data) => {
    return api.post('/auth/job-seeker/register', data);
}

export default {
    login,
    registerEmployer,
    registerJobSeeker
};