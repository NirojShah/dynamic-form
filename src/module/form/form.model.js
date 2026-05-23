import mongoose from "mongoose";

const FieldSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
    },
    helper: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      // text, email, number, select, relation etc
    },

    refSchemaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schema",
      default: null,
    },

    options: [
      {
        label: String,
        value: String,
      },
    ],

    required: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const SchemaDefinition = new mongoose.Schema(
  {
    // Form Name
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    // Belongs to which organization
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      // required: true,
    },

    // Created by which user
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Updated by user
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Dynamic fields
    fields: [FieldSchema],

    // Active or Deleted
    isActive: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["deleted", "archieve", "draft", "active"],
      default: "active",
    },
    expectedResponses: {
      type: Number,
      default: 100,
    },
    opened: {
      type: Number,
      default: 0,
    },
    public:{
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  },
);

const SchemaModel = mongoose.model("Schema", SchemaDefinition);

export default SchemaModel;
