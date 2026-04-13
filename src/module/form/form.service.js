// service/form.service.js

import SchemaModel from "./form.model.js";

const processCreateForm = async ({ name, organizationId, createdBy }) => {
  const form = await SchemaModel.create({
    name,
    organizationId,
    createdBy,
    updatedBy: createdBy,
    fields: []
  });

  return form;
};

const processAddFields = async ({ formId, fields, updatedBy }) => {
  const form = await SchemaModel.findByIdAndUpdate(
    formId,
    {
      $push: {
        fields: { $each: fields }
      },
      updatedBy
    },
    { new: true }
  );

  return form;
};

const formService = {
  processCreateForm,
  processAddFields
};

export default formService;