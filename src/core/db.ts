import { Db, MongoClient } from "mongodb";
import { formatLog } from "../lib/utils";

let cachedDB: Db | null = null;
export default async function connectToDatabase(): Promise<Db> {
  if (cachedDB) {
    console.info(formatLog("Using cached client!"));
    return cachedDB;
  }
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  console.info(formatLog("No client found! Creating a new one."));
  const client = new MongoClient(process.env.ATLAS_URI_PROD as string, opts);
  await client.connect();
  const db: Db = client.db(process.env.DB_NAME);
  cachedDB = db;
  return cachedDB;
}
