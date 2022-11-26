import React from "react";
import axios from "axios";
import ApiUtils from "../utils/ApiUtils";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  componentDidMount() {
    console.log("Running App version " + process.env.NODE_ENV);
    axios
      .get(ApiUtils.getApiUrl("/users"))
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

  render() {
    return <br />;
  }
}

export default Users;
