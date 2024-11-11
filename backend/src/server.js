import { DATABASE_CONTRACT } from "../database/databaseClient.js";
import { APPLICATION_PROVIDER } from "./app/app.js";
import { ADD_MEMBER } from "./callbacks/addMember.js";
import { CREATE_VOLUME } from "./callbacks/createVolume.js";
import { GET_MEMBER_BY_BAPTISMAL_NUMBER } from "./callbacks/getMember.js";
import { GET_MEMBERS_BY_VOLUME } from "./callbacks/getMembersByVolume.js";
import { GET_VOLUMES } from "./callbacks/getVolumes.js";
import { UPDATE_MEMBER } from "./callbacks/updateMember.js";

const app = APPLICATION_PROVIDER.application.expressApp;
const PORT = 8000;

app.get('/', async function (req, resp) {
    const result = await DATABASE_CONTRACT.exec(`SELECT NOW() as date;`);
    console.table(result);

    resp.json({ 'your ip address is: ': `${req.ip}` });
});

app.post('/create/volume', CREATE_VOLUME);
app.post('/register/member', ADD_MEMBER);
app.post('/get/member/by/baptismal/number', GET_MEMBER_BY_BAPTISMAL_NUMBER);
app.post('/update/member', UPDATE_MEMBER);
app.get('/load/volumes', GET_VOLUMES);
app.post('/load/members/by/volume', GET_MEMBERS_BY_VOLUME);

/**
 * @todo COMPLETE
 */
app.post('/load/member/by/id', function (req, resp) { });

app.listen(PORT, function () { console.log('SERVER RUNNING'); });
app