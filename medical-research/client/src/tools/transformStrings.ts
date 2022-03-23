import { UserObj } from 'types/user'

export const capitalize = (word: string) => `${word[0].toUpperCase()}${word.slice(1)}`;

export const splitNameByUnderscore = (name: string) => (
    `${capitalize(name.split('_')[0])} ${capitalize(name.split('_')[1])}`
);

export const sliceId = (id: string) => (
    `${id.slice(0, 8)} ${id.slice(8, 16)} ${id.slice(16)}`
);

export const splitNameByCamelCase = (name: string) => {
    for (let i = 1; i < name.length; i++) {
        if (name[i] === name[i].toUpperCase()) {
            return `${capitalize(name.slice(0, i))} ${capitalize(name.slice(i))}`
        }
    }

    return name;
};

export const getFullDate = (unformattedFullDate: string) => {
    const formattedFullDate = (new Date(Date.parse(unformattedFullDate)));
    const date = formattedFullDate.getDate();
    const month = formattedFullDate.getMonth() + 1;
    const year = formattedFullDate.getFullYear();

    return `${+date < 10 ? `0${date}` : date}.${+month < 10 ? `0${month}` : month}.${year}`
};

export const parseUserObj = () => {
    const json = localStorage.getItem('user') || "0";
    let obj: UserObj | null = JSON.parse(json);

    return obj;
};
