import React from 'react';

const overRideMsg = {
  400 : "Bad Request",
  401 : "Not Authorized. Check API Key",
  404 : "User Not Found",
  422 : "No Matches Found",
  429 : "API Request Rate Limit Exceeded. Try Again Later",
}

const Error = props => {
  if (!props.error)
    return null;

  let errorMsg = (props.error.response.status in overRideMsg) ? overRideMsg[props.error.response.status] :
  props.error.response.statusText;

  return (
    <div className="alert alert-danger">{errorMsg || ""}</div>
  )
};

export default Error;
