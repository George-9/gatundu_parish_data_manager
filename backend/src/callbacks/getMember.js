import { ObjectId } from "mongodb";
import { DATABASE_CONTRACT } from "../../database/databaseClient.js";

export async function GET_MEMBER_BY_BAPTISMAL_NUMBER(req, resp) {
    const { volume_name, id } = req.body;
    const details = { 'msg': '', 'data': '' }

    try {

        if (!volume_name || !id) {
            return resp.json('bad request');
        }

        const theMember = await DATABASE_CONTRACT
            .memberVolumeCollectionInstance(volume_name)
            .findOne({ '_id': new ObjectId(id) });

        // console.log('got member: ', theMember);

        details.msg = 'success';
        details.data = theMember;
    } catch (error) {
        details.msg = 'something went wrong';
        details.data = {};
    }
    await resp.json(details);
}