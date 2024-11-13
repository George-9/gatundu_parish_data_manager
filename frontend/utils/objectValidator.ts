export function CAPITALISED_AND_TRIMMED_OBJECT(object: any) {
    const tmp: any = {};
    const keys = Object.keys(object);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        tmp[`${key}`.trim().split('_').join(' ').toUpperCase()] = `${object[key]}`
            .trim()
            .toUpperCase();
    }

    return tmp;
}