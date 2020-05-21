import { apiErrorList } from "../Config/ErrorList";

export const retrieveBasicUserData = (usernameFieldValue, setStateFunction) => {
  const responseObject = {
    data: null,
    error: null,
  };

  fetch(`https://api.github.com/users/${usernameFieldValue}`)
    .then((response) => {
      // control for 404 and 403 errors
      if (response.status in apiErrorList) {
        responseObject.error = apiErrorList[response.status];
        return responseObject;
      }
      // default error if response not ok and not in error list
      else if (
        response.status !== response.ok &&
        !response.status in apiErrorList
      ) {
        responseObject.error = apiErrorList[0];
        return responseObject;
      }
      return response.json();
    })
    .then((json) => setStateFunction(json))
    .catch(() => {
      responseObject.error = apiErrorList[0];
      return responseObject;
    });
};
