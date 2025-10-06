import axios, {
    type AxiosRequestConfig,
    type AxiosResponse,
    isAxiosError,
} from "axios";
import type { RefreshTokenResponse } from "./ApiRequestsTypes";

type QueueItem = {
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// // --- START: SIMULATION INTERCEPTOR ---
// // This interceptor will run BEFORE every request is sent.
// axiosInstance.interceptors.request.use(
//     config => {
//         const urlParams = new URLSearchParams(window.location.search);
//         const shouldSimulate = urlParams.get("simulateError") === "true";

//         if (shouldSimulate) {
//             const simulateFor = urlParams.get("simulateFor"); // e.g., "/user/profile"
//             const simulateStatus = parseInt(
//                 urlParams.get("simulateStatus") || "500",
//                 10
//             ); // Default to 500

//             // If 'simulateFor' is specified, only intercept that specific route.
//             // Otherwise, intercept all routes (original behavior).
//             if (!simulateFor || config.url === simulateFor) {
//                 console.warn(
//                     `⚠️ SIMULATING ${simulateStatus} ERROR FOR ROUTE: ${config.url} ⚠️`
//                 );

//                 const fakeError = {
//                     isAxiosError: true,
//                     response: {
//                         status: simulateStatus,
//                         data: { message: `Simulated ${simulateStatus} Error` },
//                     },
//                     message: `Simulated ${simulateStatus} Error for ${config.url}`,
//                 };

//                 return Promise.reject(fakeError);
//             }
//         }

//         // If not simulating, let the request proceed normally
//         return config;
//     },
//     error => {
//         // Handle any errors that might occur during request setup
//         return Promise.reject(error);
//     }
// );
// // --- END: SIMULATION INTERCEPTOR ---

// -- This interceptor auto-refreshes access token when it expires
let isRefreshing = false;
let failedQueue: QueueItem[] = [];

function processQueue(error: Error | null) {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) reject(error);
        else resolve();
    });

    failedQueue = [];
}

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async error => {
        if (!isAxiosError(error) || !error.config) return Promise.reject(error);

        const originalRequest = error.config as AxiosRequestConfig & {
            _retry?: boolean;
        };

        const tokenExpired = error.response?.data?.code === "TOKEN_EXPIRED";

        if (tokenExpired && !originalRequest._retry) {
            // if a refresh is already happening, queue this request and return a promise
            if (isRefreshing) {
                return new Promise<void>((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => axiosInstance(originalRequest)) // after refresh resolves, retry original request
                    .catch(err => Promise.reject(err));
            }

            // start a new refresh
            isRefreshing = true;
            originalRequest._retry = true;

            try {
                await axiosInstance.post<RefreshTokenResponse>("/auth/refresh");

                // at this point, refresh must have succeeded
                // so queued requests can be allowed to continue
                isRefreshing = false;
                processQueue(null);

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // at this point, refresh failed; so we notify
                //  queued requests
                isRefreshing = false;
                processQueue(refreshError as Error);

                return Promise.reject(refreshError);
            }
        }

        // other errors are handled here
        // const errorMessage = error.response?.data?.message || error.message;
        return Promise.reject(error);
    }
);

export { axiosInstance };
