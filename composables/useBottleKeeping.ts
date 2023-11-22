import KeepingData from "~/models/KeepingData";

export const useBottleKeeping = definePiniaStore("bottleKeeping", {
  state: () => ({
    bottleDatas: <KeepingData[]>[],
    selectedBottle: <KeepingData | null>null,
  }),
  actions: {
    async getBottleDatas() {
      const api = useApi();
      const _loading = useLoading();

      try {
        _loading.show();
        const { data } = await api.post({
          url: "api/v1/holyboard/bottles",
          params: { paginate: 100 },
        });

        this.bottleDatas = data.data.map((bottleData: any) =>
          KeepingData.fromJson(bottleData)
        );

        _loading.hide();
      } catch (error) {
        api.handleError(error);
        _loading.hide();
      }
    },
  },
});
