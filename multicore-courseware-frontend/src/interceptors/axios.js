// import axios from "axios";

// let refresh = false;
// let baseUrl = process.env.REACT_APP_API_BASE_URL;

// axios.interceptors.response.use(
//     (resp) => resp,
//     async (error) => {
//         if (error.response.status === 401 && !refresh) {
//             refresh = true;
//             console.log(localStorage.getItem('refresh_token'));
//             try {
//                 const response = await axios.post(
//                     `${baseUrl}/api/token/refresh/`,
//                     {
//                         refresh: localStorage.getItem('refresh_token')
//                     },
//                     {
//                         headers: {
//                             'Content-Type': 'application/json'
//                         },
//                         // withCredentials: true
//                     }
//                 );
//                 if (response.status === 200) {
//                     axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;
//                     localStorage.setItem('access_token', response.data.access);
//                     localStorage.setItem('refresh_token', response.data.refresh);
//                     return axios(error.config);
//                 }
//             } catch (error) {
//                 console.error('Error while refreshing token:', error);
//             }
//         }
//         refresh = false;
//         return Promise.reject(error);
//     }
// );

// export default axios;
