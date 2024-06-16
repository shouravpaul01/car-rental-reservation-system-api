import { TErrorMessages, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const errorMessages: TErrorMessages = [
    {
      path: "",
      message: err?.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Invalid ID",
    errorMessages,
  };
};

export default handleDuplicateError;
