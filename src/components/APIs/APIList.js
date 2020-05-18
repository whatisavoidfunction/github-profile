import errorList from "../Config/ErrorList";

export const retrieveBasicUserData = async (usernameFieldValue) => {
  const responseObject = {
    data: null,
    error: {
      exists: false,
      type: null,
    },
  };

  const response = await fetch(
    `https://api.github.com/users/${usernameFieldValue}`
  );
  const responseJSON = await response.json();

  if (response.status === 404) {
    responseObject.error.exists = true;
    responseObject.error.type = errorList.userNotFoundError;
  } else if (response.status === 200) {
    responseObject.data = responseJSON;
  } else if (response.status !== 200 && response.status !== 404) {
    responseObject.error.exists = true;
    responseObject.error.type = errorList.apiGeneralError;
  }
  return responseObject;
};
