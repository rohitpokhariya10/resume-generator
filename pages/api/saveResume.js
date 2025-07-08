import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const data = req.body;

  if (!data.fullName || !data.email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("resume_db");
    const collection = db.collection("resumes");
    const result = await collection.insertOne(data);
    res.status(200).json({ message: "Saved!", id: result.insertedId });
  } catch (error) {
    console.error("SAVE ERROR:", error);
    res.status(500).json({ message: "Could not save data" });
  }
}
