import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const data = req.body;

  if (!data.fullName || !data.email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
    const db = client.db("resume_db");
    const collection = db.collection("resumes");

    const result = await collection.insertOne(data);

    client.close();

    res.status(200).json({ message: "Saved successfully!", id: result.insertedId });
  } catch (error) {
    console.error("MongoDB Insert Error:", error);
    res.status(500).json({ message: "Could not save data" });
  }
}
