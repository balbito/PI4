import mongoose from "mongoose";

const collection = "docuemnts";

const docuementSchema = new mongoose.Schema({
  fileName: { type: String },
  type: { type: String, enum: ["profile", "document", "product"] },
  url: { type: String },
});

const documentModel = mongoose.model(collection, docuementSchema);
export default documentModel;