export class OUTSTATIONS_SOURCE {
    static volumesLoaded = false;
    static #outstations: { id: number, vol_name: string }[] = [];

    static async allOutstations(): Promise<{ id: number, vol_name: string }[]> {
        if (OUTSTATIONS_SOURCE.volumesLoaded) {
            return OUTSTATIONS_SOURCE.#outstations;
        }

        OUTSTATIONS_SOURCE.#outstations.push(...(await OUTSTATIONS_SOURCE.#loadOutstations()));
        OUTSTATIONS_SOURCE.volumesLoaded = true;

        return OUTSTATIONS_SOURCE.#outstations;
    }

    static addVolume(volume: { id: number, vol_name: string }) {
        OUTSTATIONS_SOURCE.#outstations.push(volume);
    }


    static async #loadOutstations() {
        const result = await fetch('http://64.227.66.13:8708/:8708/load/outstations', { 'mode': 'cors', });
        const details = (await result.json())
        const outstations = details['data'];

        return outstations;
    }
}