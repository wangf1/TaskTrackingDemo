import axios from "axios";
import ApiUtils from "../utils/ApiUtils";

const UserUtils = {
  saveUser: function (user) {
    const payload = structuredClone(user);
    if (payload.roles) {
      payload.roles = payload.roles.split(","); // TODO: fix quick and dirt code, with multiple choice UI control
    } else {
      payload.roles = ["ROLE_USER"];
    }
    return axios.post(ApiUtils.getApiUrl("/users"), payload);
  },
};

export default UserUtils;
