import { ObjectId } from "mongodb";
import { DATABASE_CONTRACT } from "../../database/databaseClient.js";

export async function UPDATE_MEMBER(req, resp) {
    const { volume_name, member } = req.body;
    const details = { 'msg': '', 'data': '' }

    if (!volume_name || !member) {
        return resp.json('bad request');
    }

    try {
        let id = member['id'];
        delete member['id'];

        const update = await DATABASE_CONTRACT
            .memberVolumeCollectionInstance(volume_name)
            .updateOne(
                { _id: new ObjectId(id) },
                { $set: member }
            );

        details.msg = 'success';
        details.data = update.upsertedCount || update.modifiedCount;
    } catch (error) {
        details.msg = 'something went wrong';
    }

    await resp.json(details);
}