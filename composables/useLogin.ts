import { type AxiosResponse } from 'axios';
import User from '../models/User';

export const useLogin = definePiniaStore('login', {
  state: () => ({
    form: {
      username: "",
      password: "",
    }
  }),
  actions: {
    async setUserData(user: User, response: AxiosResponse) {
      const auth = useAuth();
      await auth.setUser(user);
      await auth.setToken(response.data.data.token);
      await auth.setRoles(response.data.data.roles);
      await auth.setPermissions(response.data.data.permissions);
    },
    async login() {
      const api = useApi();
      const _loading = useLoading();

      try {
        _loading.show();
        const { response } = await api.post({
          url: "/api/v1/holyboard/auth/login",
          params: {
            username: this.form.username,
            password: this.form.password,
          }
        });

        const user = User.fromJson(response.data.data.user_data);
        this.setUserData(user, response);
        window.location.href = "/";

        _loading.hide();
      } catch (error) {
        api.handleError(error);
        _loading.hide();
      }
    }
  }
})
