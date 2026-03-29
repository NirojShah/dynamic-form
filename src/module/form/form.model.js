import mongoose from "mongoose";

const FieldSchema = new mongoose.Schema({
  key: String,              
  label: String,            
  type: String,             
  refSchemaId: mongoose.Schema.Types.ObjectId, 
  required: Boolean
});

const SchemaModelDefination = new mongoose.Schema({
  name: String,
  fields: [FieldSchema]
});

const SchemaModel =  mongoose.model("Schema", SchemaModelDefination);

export default SchemaModel;