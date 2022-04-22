const checkNullUndefinedEmpty = (val) =>
  val === undefined || val === null || val === '';

export const isRequired = (error, val) =>
  checkNullUndefinedEmpty(val) ? error : undefined;
