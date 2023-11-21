import Axios from "axios";
import User from "../models/User";

type Callback = () => void;

type LogoutParameters = {
  callback?: Callback | null;
  next?: string;
};

const USER_KEY = "user";
const TOKEN_KEY = "token";

export const useAuth = definePiniaStore("auth", {
  state: () => ({
    token: <string | null>null,
    user: <User | null>null,
    roles: <string[] | null>null,
    permissions: <string[] | null>null,
    timeout: <number>0,
    removeItemList: [USER_KEY, TOKEN_KEY],
  }),
  actions: {
    refresh() {
      const userData = useUserData();
      this.token = userData.value.token;
      this.user = userData.value.user;
      this.roles = userData.value.roles;
      this.permissions = userData.value.permissions;
    },
    getToken() {
      return this.token;
    },
    setToken(token: string) {
      const userData = useUserData();
      userData.value.token = token;
      this.refresh();
    },
    getUser() {
      this.refresh();
      return this.user;
    },
    setUser(user: User) {
      const userData = useUserData();
      userData.value.user = user;
      this.refresh();
    },
    setRoles(roles: string[]) {
      const userData = useUserData();
      userData.value.roles = roles;
      this.refresh();
    },
    setPermissions(permissions: string[]) {
      const userData = useUserData();
      userData.value.permissions = permissions;
      this.refresh();
    },
    removeAllItem() {
      const axios = Axios;
      const userData = useUserData();

      delete axios.defaults.headers.common["For-Outlet-Id"];

      userData.value = {
        token: null,
        user: null,
        roles: null,
        permissions: null,
      };
    },
    isLoggedIn(): boolean {
      this.refresh();
      return this.token != null;
    },
    async getProfile() {
      const api = useApi();

      try {
        const { response } = await api.get({
          url: "/api/v1/holyboard/get-profile",
        });
        this.setUser(response.data.data.user_data);
      } catch (error) {
        api.handleError(error);
      }
    },
    logout({ callback = null, next = "" }: LogoutParameters) {
      this.removeAllItem();

      this.refresh();
      if (callback) {
        callback();
        return;
      }

      if (next) {
        navigateTo(next);
      }
    },
  },
});
