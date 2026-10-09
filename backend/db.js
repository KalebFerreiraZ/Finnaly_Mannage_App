import { MongoClient } from "mongodb";
import "dotenv/config";

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("A variável MONGODB_URI não foi definida no arquivo .env");
}

const client = new MongoClient(uri);

await client.connect();

console.log("Conectado ao MongoDB!");

const db = client.db("sample_mflix");

export default db;