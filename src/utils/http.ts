import axios from "axios";
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// todo: with credentials set to false

/**
 *
 * @param pathname
 * @param data
 * @returns
 */
export function getRequest<T = any>(pathname: string): Promise<T> {
    const url = new URL(`${API_BASE_URL}${pathname}`, window.location.origin);
    console.log("GET", url.href);

    return new Promise((resolve, reject) => {
        axios({
            method: "GET",
            url: url.href,
            withCredentials: true,
        })
            .then((response) => {
                resolve(response.data as T);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

/**
 *
 * @param pathname
 * @param data
 * @returns
 */
export function postRequest<T = any>(pathname: string, data: any): Promise<T> {
    const url = new URL(`${API_BASE_URL}${pathname}`, window.location.origin);
    console.log("POST", url.href);

    return new Promise((resolve, reject) => {
        axios({
            method: "POST",
            url: url.href,
            data: data,
            withCredentials: true,
        })
            .then((response) => {
                resolve(response.data as T);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

/**
 *
 * @param pathname
 * @param data
 * @returns
 */
export function patchRequest<T = any>(pathname: string, data: any): Promise<T> {
    const url = new URL(`${API_BASE_URL}${pathname}`, window.location.origin);
    console.log("PATCH", url.href);

    return new Promise((resolve, reject) => {
        axios({
            method: "PATCH",
            url: url.href,
            data: data,
            withCredentials: true,
        })
            .then((response) => {
                resolve(response.data as T);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

/**
 *
 * @param pathname
 * @param data
 * @returns
 */
export function putRequest<T = any>(pathname: string, data: any): Promise<T> {
    const url = new URL(`${API_BASE_URL}${pathname}`, window.location.origin);
    console.log("PUT", url.href);

    return new Promise((resolve, reject) => {
        axios({
            method: "PUT",
            url: url.href,
            data: data,
            withCredentials: true,
        })
            .then((response) => {
                resolve(response.data as T);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

/**
 *
 * @param pathname
 * @param data
 * @returns
 */
export function deleteRequest<T = any>(
    pathname: string,
    data?: any
): Promise<T> {
    const url = new URL(`${API_BASE_URL}${pathname}`, window.location.origin);
    console.log("DELETE", url.href);

    return new Promise((resolve, reject) => {
        axios({
            method: "DELETE",
            url: url.href,
            data: data,
            withCredentials: true,
        })
            .then((response) => {
                resolve(response.data as T);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}
