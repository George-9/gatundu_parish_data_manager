import { DB_CONSTANTS } from "../../database/constants.js";
import { DATABASE_CONTRACT } from "../../database/databaseClient.js";

export async function SEARCH_MEMBER_FROM_ALL_VOLUMES(req, resp) {
    const { search_key } = req.body;

    const matchingMembers = [];
    console.log('here...');

    if (!search_key) {
        return resp.json({ 'msg': 'bad request', data: [] });
    }

    try {
        const allVolumes = await DATABASE_CONTRACT
            .colectionInstance(DB_CONSTANTS.databaseName, DB_CONSTANTS.volumesCollectionName)
            .find()
            .toArray();
        console.log(allVolumes);


        for (let i = 0; i < allVolumes.length; i++) {
            const volumeName = `members_${allVolumes[i]['vol_name']}`;

            const thisVolumeMatch = await DATABASE_CONTRACT
                .colectionInstance(DB_CONSTANTS.databaseName, volumeName)
                .find({ 'NAME': { $regex: `${search_key}` } }).toArray();

            for (let j = 0; j < thisVolumeMatch.length; j++) {
                const member = thisVolumeMatch[j];
                member['vol'] = allVolumes[i]['vol_name'];
            }

            matchingMembers.push(...thisVolumeMatch);
        }

        return await resp.json({ msg: 'success', data: matchingMembers });
    } catch (error) {
        return await resp.json({
            msg: `error fetching members: ${error}`,
            data: matchingMembers
        });
    }
}