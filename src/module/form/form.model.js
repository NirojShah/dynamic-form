import mongoose from "mongoose";

const FieldSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true
  },

  label: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
    // text, email, number, select, relation etc
  },

  refSchemaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schema",
    default: null
  },

  required: {
    type: Boolean,
    default: false
  }
}, { _id: false });


const SchemaDefinition = new mongoose.Schema({

  // Form Name
  name: {
    type: String,
    required: true
  },

  // Belongs to which organization
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true
  },

  // Created by which user
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // Updated by user
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  // Dynamic fields
  fields: [FieldSchema],

  // Active or Deleted
  isActive: {
    type: Boolean,
    default: true
  }

}, {
  timestamps: true
});


const SchemaModel = mongoose.model("Schema", SchemaDefinition);

export default SchemaModel;