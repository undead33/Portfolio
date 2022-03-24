import axios from 'axios';

const host = 'http://localhost:9001';
const headersObj = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
};

// export const setUpInterceptors = (logout: () => void) => {
//     axios.interceptors.request.use(
//         (config) => {
//             const isAuthorizationRequest =
//                 config.url && (new URL(config.url)).pathname.includes('Authorization');
//             const tokenIsNotExpired =
//                 Number(localStorage.getItem('tokenExpirationTime')) > Date.now();

//             if (isAuthorizationRequest || tokenIsNotExpired) {
//                 return config;
//             } else {
//                 logout();

//                 localStorage.setItem('tokenExpirationTime', 'expired');
//                 localStorage.removeItem('token');
//                 localStorage.removeItem('user');
//             }
//         },
//         (error) => Promise.reject(error)
//     );
// }


export const authorizationReq = (userData: any, requestType: string) =>
    axios.post(`${host}/Authorization/${requestType}`, userData);

export const updatedPersonalInfoReq = (updatedPersonalInfo: any, token: string | null) =>
    axios.put(`${host}/api/Users/Update`, updatedPersonalInfo, {
        headers: {
            Authorization: `Bearer ${token}`,
            ...headersObj,
        },
    });

export const getAllUsers = (token: string | null) =>
    axios.get(`${host}/api/Users/FindAll`, {
        headers: {
            Authorization: `Bearer ${token}`,
            ...headersObj,
        },
    });
