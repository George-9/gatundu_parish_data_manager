import { DATABASE_CONTRACT } from "../../database/databaseClient.js";

export async function ADD_MEMBER(req, resp) {
    const { volume_name, member } = req.body;
    const response = { 'msg': '', 'data': [] };

    // console.log(req.body);
    // console.log('saving to volume: ', volume_name);

    if (!volume_name || !member) {
        response.msg = 'bad request: empty or incomplete details';
        return resp.json(response);
    }

    const existstingWithBaptismalNumber = await DATABASE_CONTRACT
        .memberVolumeCollectionInstance(volume_name)
        .findOne({ 'BAPTISMAL NUMBER': member['BAPTISMAL NUMBER'] });

    if (existstingWithBaptismalNumber && existstingWithBaptismalNumber._id) {
        response.msg = 'member with the given baptismal number exists';
        return resp.json(response);
    }

    const result = await DATABASE_CONTRACT
        .memberVolumeCollectionInstance(volume_name)
        .insertOne(member);

    if (result.insertedId) {
        response.msg = 'success';
    } else {
        response.msg = 'something went wrong';
    }

    return resp.json(response);
}
