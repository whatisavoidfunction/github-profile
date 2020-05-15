import errorList from "../Static-codes/ErrorList";
export const retrieveBasicUserData = (usernameFieldValue) => {
  // Response object mapping
  const responseObject = {
    data: null,
    error: {
      exists: false,
      type: null,
    },
  };
  fetch(`https://api.github.com/users/${usernameFieldValue}`)
    .then((response) => {
      if (response.status === 404) {
        responseObject.error.exists = true;
        responseObject.error.type = errorList.userNotFoundError;
        return responseObject;
      } else if (response.status === 200) {
        responseObject.data = response.json();
      } else if (response.status !== 200 && response.status !== 404) {
        responseObject.error.exists = true;
        responseObject.error.type = errorList.apiGeneralError;
      }
      return responseObject;
    })
    .catch((error) => {
      responseObject.error.exists = true;
      responseObject.error.type = errorList.apiGeneralError;
      responseObject.data = null;
    });
  // return responseObject;
  return responseObject.error;
};
