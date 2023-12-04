import User from "../models/User";

export const useLogin = definePiniaStore("login", {
  state: () => ({
    form: {
      username: "",
      password: "",
    },
  }),
  actions: {
    async setUserData(user: User, data: any) {
      const auth = useAuth();
      await auth.setUser(user);
      await auth.setToken(data.data.token);
      await auth.setRoles(data.data.roles);
      await auth.setPermissions(data.data.permissions);
    },
    async login() {
      const api = useApi();
      const _loading = useLoading();

      try {
        _loading.show();
        const { data } = await api.post({
          url: "api/v1/holyboard/auth/login",
          params: {
            username: this.form.username,
            password: this.form.password,
          },
        });

        const user = User.fromJson(data.data.user_data);
        this.setUserData(user, data);
        window.location.href = "/";

        _loading.hide();
      } catch (error) {
        api.handleError(error);
        _loading.hide();
      }
    },
  },
});
