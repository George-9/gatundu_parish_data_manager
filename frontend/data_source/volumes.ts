export class VOLUMES_SOURCE {
    static volumesLoaded = false;
    static #volumes: { id: number, vol_name: string }[] = [];

    static async allVolumes(): Promise<{ id: number, vol_name: string }[]> {
        if (VOLUMES_SOURCE.volumesLoaded) {
            return VOLUMES_SOURCE.#volumes;
        }

        const allLoadedVolumes = await VOLUMES_SOURCE.#loadVolumes();
        for (let i = 0; i < allLoadedVolumes.length; i++) {
            const volume = allLoadedVolumes[i];
            VOLUMES_SOURCE.#volumes.push(volume);
        }

        VOLUMES_SOURCE.volumesLoaded = true;
        return VOLUMES_SOURCE.#volumes;
    }

    static addVolume(
        volume: {
            id: number,
            vol_name: string
        } | {
            id: number,
            vol_name: string,
            members_count: number
        }) {
        VOLUMES_SOURCE.#volumes.push(volume);
    }

    static async #loadVolumes(): Promise<{ id: number, vol_name: string }[]> {
        const result = await fetch('http://64.227.66.13:8708/load/volumes', { 'mode': 'cors', });
        const details = (await result.json())
        const volumes = details['data'];

        console.log('loaded volumes: ', volumes);

        return volumes;
    }
}