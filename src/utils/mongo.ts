import mongoose from "mongoose";
export async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/graphql-api");
    console.log("Db..");
  } catch (e) {
    console.error("Khalad:", e);

    process.exit(1);
  }
}
