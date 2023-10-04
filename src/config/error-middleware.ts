/* eslint-disable @typescript-eslint/no-explicit-any */
const getErrorMessage = (errorData: any) => {
  let { message } = errorData;
  if (errorData.fieldErrors) {
    errorData.fieldErrors.forEach((fErr: any) => {
      message += `\nfield: ${fErr.field},  Object: ${fErr.objectName}, message: ${fErr.message}\n`;
    });
  }
  return message;
};

export default () => {
  return (next: any) => {
    return (action: any) => {
      /**
       *
       * The error middleware serves to log error messages from dispatch
       * It need not run in production
       */
      if (import.meta.env.DEV) {
        const { error } = action;
        if (error) {
          console.error(
            `${
              action.type
            } caught at middleware with reason: ${JSON.stringify(
              error.message,
            )}.`,
          );
          if (error.response && error.response.data) {
            const message = getErrorMessage(error.response.data);
            console.error(`Actual cause: ${message}`);
          }
        }
      }
      // Dispatch initial action
      return next(action);
    };
  };
};
