export const sleep = (sec: number) =>
    new Promise((resolve) => setTimeout(() => resolve(null), sec * 1000));
