import { MongoClient } from 'mongodb';
let clientPromise: Promise<MongoClient> | undefined;
export async function db() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not configured');
  if (!clientPromise)
    clientPromise = new MongoClient(uri, { maxPoolSize: 6 }).connect();
  return (await clientPromise).db(process.env.MONGODB_DB || 'cpj_foundation');
}
export async function prepareDonationIndexes() {
  const database = await db();
  await database
    .collection('donations')
    .createIndex({ reference: 1 }, { unique: true });
  return database.collection('donations');
}
