import axios from "axios";
import { ADMIN_TOKEN_KEY } from "./values";
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

            headers: {
                Authorization: getToken(pathname),
            },
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

            headers: {
                Authorization: getToken(pathname),
            },
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

            headers: {
                Authorization: getToken(pathname),
            },
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

            headers: {
                Authorization: getToken(pathname),
            },
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

            headers: {
                Authorization: getToken(pathname),
            },
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

function getToken(pathname: string): string | undefined {
    if (
        pathname.startsWith("/admin") &&
        localStorage.getItem(ADMIN_TOKEN_KEY)
    ) {
        return "Bearer " + localStorage.getItem(ADMIN_TOKEN_KEY);
    }

    // return "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNjgzODMxNTE2fQ.guVTj6rlz8iSt3vjKe5RTkrabWJ_VKKLxTgLxIrjPhE";
}
