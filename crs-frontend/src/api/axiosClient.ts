import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // port 8080
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('crs_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            // Xóa triệt để header Authorization nếu token đã bị remove
            delete config.headers.Authorization;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosClient;