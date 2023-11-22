import KeepingData from "~/models/KeepingData";

export const useBottleKeeping = definePiniaStore("bottleKeeping", {
  state: () => ({
    bottleDatas: <KeepingData[]>[],
    selectedBottle: <KeepingData | null>null,
    form: {
      name: <string>"", //Bottle Name
      user_id: <number>0,
      user_fullname: <string>"", //UserName
      phone_number: <string>"",
      description: <string>"",
      image_url: <string>"",
      outlet_id: <number>0,
    },
    uploadedImage: <string>"",
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
    async submitBottleData() {
      const api = useApi();
      const _loading = useLoading();

      try {
        _loading.show();
        processUploadImage(this.form.image_url);
        // const { data } = await api.post({
        //   url: "api/v1/holyboard/bottles",
        //   params: this.form,
        // });
        _loading.hide();
      } catch (error) {
        api.handleError(error);
        _loading.hide();
      }
    },

    async processUploadImage() {
      const api = useApi();

      try {
        const { data } = await api.uploadFile({
          url: "api/v1/holyboard/bottles",
          params: this.form,
        });

        this.uploadedImage = data.data;
      } catch (error) {
        api.handleError(error);
      }
    },
  },
});
