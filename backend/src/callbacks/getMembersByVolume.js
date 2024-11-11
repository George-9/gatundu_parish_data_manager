import { DATABASE_CONTRACT } from "../../database/databaseClient.js";

export async function GET_MEMBERS_BY_VOLUME(req, resp) {
    const { volume_name } = req.body;
    console.log('//', req.body);

    const response = { 'msg': '', 'data': null };

    if (!volume_name) {
        response.msg = 'bad request';
        return await resp.json(response);
    }

    console.log('fetching members from volume: ', volume_name);
    try {
        const members = await DATABASE_CONTRACT
            .memberVolumeCollectionInstance(volume_name)
            .find()
            .toArray()

        response.msg = 'success';
        response.data = members;
    } catch (error) {
        console.log('error: ', error);
        response.msg = 'something went wrong: ' + error;
        response.data = [];
    }

    await resp.json(response);
}
