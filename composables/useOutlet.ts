import Outlet from "../models/Outlet";

export const useOutlet = definePiniaStore("outlet", {
  state: () => ({
    outlets: <Outlet[]>[],
    outlet: <Outlet | null>null,
  }),
  actions: {
    async getOutlets() {
      const api = useApi();

      try {
        const { data } = await api.get({
          url: "api/v1/outlets",
        });

        this.outlets = data.data.map((outlet: any) => Outlet.fromJson(outlet));
      } catch (error) {
        api.handleError(error);
      }
    },
  },
});
