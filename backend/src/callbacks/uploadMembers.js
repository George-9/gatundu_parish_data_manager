import { DATABASE_CONTRACT } from "../../database/databaseClient.js";

export async function UPLOAD_MEMBERS(req, resp) {
    const { volume_name, members } = req.body;
    const response = { 'msg': '', 'data': [] };

    console.log('saving to volume: ', volume_name);

    if (!volume_name || !members) {
        response.msg = 'bad request: empty or incomplete details';
        return resp.json(response);
    }

    const result = await DATABASE_CONTRACT
        .memberVolumeCollectionInstance(volume_name)
        .insertMany(members);

    if (result.insertedCount > 0) {
        response.msg = 'success';
        response.data = result.insertedCount;
    } else {
        response.msg = 'something went wrong';
    }

    return resp.json(response);
}
