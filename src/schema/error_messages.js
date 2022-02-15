const stringErrorMessage = (
  field,
  required = true,
  maxCharecter = undefined
) => {
  return {
    "string.base": `'${field}' should be a type of 'text'`,
    "string.empty": `'${field}' cannot be an empty field`,
    ...(maxCharecter && {
      "string.max": `'${field}' should have a maximum length of ${maxCharecter} charecters`,
    }),
    ...(required && { "any.required": `'${field}' is a required field` }),
  };
};
