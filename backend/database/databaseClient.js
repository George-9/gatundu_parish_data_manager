import { MongoClient } from "mongodb";
import { DB_CONSTANTS } from "./constants.js";

export class DATABASE_CONTRACT {
    static get dbClient() {
        return new MongoClient('mongodb://127.0.0.1:27017');
    }

    static dbInstance(dbName) {
        return DATABASE_CONTRACT.dbClient.db(dbName);
    }

    static colectionInstance(dbName, collectionName) {
        return DATABASE_CONTRACT.dbInstance(dbName).collection(collectionName);
    }

    static memberVolumeCollectionInstance(volumeName) {
        return DATABASE_CONTRACT
            .colectionInstance(
                DB_CONSTANTS.databaseName,
                `members_${volumeName}`
            )
    }

    static get volumesCollection() {
        return DATABASE_CONTRACT
            .colectionInstance(
                DB_CONSTANTS.databaseName,
                DB_CONSTANTS.volumesCollectionName
            )
    }
}

