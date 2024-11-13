import { DATABASE_CONTRACT } from "../../database/databaseClient.js";

export async function GET_VOLUMES(req, resp) {
    const response = { 'msg': '', 'data': [] };

    try {

        const result = await DATABASE_CONTRACT
            .volumesCollection
            .find()
            .toArray();

        // console.log('volumes::: ', result);
        for (let i = 0; i < result.length; i++) {
            const volumeName = result[i]['vol_name'];

            const memberCount = await DATABASE_CONTRACT
                .memberVolumeCollectionInstance(volumeName)
                .countDocuments();

            result[i]['members_count'] = memberCount;
        }

        // console.log(response);
        response.msg = 'success';
        response.data = result;
    } catch (error) {
        response.msg = 'something went wrong';
        response.data = result;
    }

    await resp.json(response);
}