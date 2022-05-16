const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, 'credentialsDontPost/.env')
});
const {
    MongoClient,
    ServerApiVersion
} = require('mongodb');



class superModule {
    #userName;
    #password;
    #databaseAndCollection;
    client;

    constructor() {

        this.#userName = process.env.MONGO_DB_USERNAME;
        this.#password = process.env.MONGO_DB_PASSWORD;

        /* Our database and collection */
        this.#databaseAndCollection = {
            db: process.env.MONGO_DB_NAME,
            collection: process.env.MONGO_COLLECTION
        };

        const uri = `mongodb+srv://${this.#userName}:${this.#password}@proj6.9patr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
        this.client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1
        });

    }


    //    async function insertapplicant(applicant){
    async insertLocation(location) {
        await this.client.connect();
        const result = await this.client.db(this.#databaseAndCollection.db).collection(this.#databaseAndCollection.collection).insertOne(location);
    }

    async lookupOne(building) {
        await this.client.connect();
        let filter = {
            Building: building
        };
        const result = await this.client.db(this.#databaseAndCollection.db)
            .collection(this.#databaseAndCollection.collection)
            .findOne(filter);
        if (result) {
            return result;
        } else {
            this.alert(`No building found with name ${building}`);
        }
    }

    async lookupMany(hours) {
        await this.client.connect();
        let filter = {
            gpa: {
                $gte: gpa
            }
        };
        const cursor = this.client.db(this.#databaseAndCollection.db)
            .collection(this.#databaseAndCollection.collection)
            .find(filter);

        // Some Additional comparison query operators: $eq, $gt, $lt, $lte, $ne (not equal)
        // Full listing at https://www.mongodb.com/docs/manual/reference/operator/query-comparison/
        const result = await cursor.toArray();
        return result;
    }

    async deleteAll() {
        await this.client.connect();
        let filter = {};
        const result = await this.client.db(this.#databaseAndCollection.db)
            .collection(this.#databaseAndCollection.collection).deleteMany(filter);
        return result.deletedCount;

    }
}

module.exports = {
    superModule
};
