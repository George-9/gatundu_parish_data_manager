import { DB_CONSTANTS } from "../../database/constants.js";
import { DATABASE_CONTRACT } from "../../database/databaseClient.js";

export async function CREATE_VOLUME(req, resp) {
    const { volume_name } = req.body;
    const response = { 'msg': '', 'data': [] };

    try {

        if (!volume_name) {
            response.msg = 'bad request: empty volume name'
            return resp.json(response);
        }

        const volumeAlreadyExists = await DATABASE_CONTRACT
            .volumesCollection
            .find({ 'vol_name': volume_name })
            .toArray();

        if (volumeAlreadyExists[0]) {
            response.msg = 'volume by the given name already exists'
            return resp.json(response);
        } else {
            try {
                const result = await DATABASE_CONTRACT
                    .volumesCollection
                    .insertOne({
                        'vol_name': volume_name
                    })

                response.data.push(result.insertedId.toString());
            } catch (error) {
                response.msg = `${error}`
                return resp.json(response);
            }
        }

    } catch (error) {
        response.msg = 'something went wrong';
    }

    response.msg = 'success';
    return resp.json(response);
}
