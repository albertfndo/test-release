import KeepingData from "~/models/KeepingData";

type BottleKeepRequest = {
  name: string; //Bottle Name
  user_id: number;
  user_fullname: string; //UserName
  phone_number: string;
  description: string;
  image_url: any;
  outlet_id: number;
};

export const useBottleKeeping = definePiniaStore("bottleKeeping", {
  state: () => ({
    bottleDatas: <KeepingData[]>[],
    selectedBottle: <KeepingData | null>null,
    form: {
      bottleName: <string>"", //Bottle Name
      userId: <number>0,
      userFullname: <string>"", //UserName
      phoneNumber: <string>"",
      description: <string>"",
      imageUrl: <any>"",
      outletId: <number>0,
    },
  }),
  actions: {
    async getBottleDatas(keyword: string = "") {
      const api = useApi();
      const _loading = useLoading();

      try {
        _loading.show();
        const { data } = await api.post({
          url: "api/v1/holyboard/bottles",
          params: { paginate: 100, keyword: keyword },
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
    async submitBottleData(useMember: boolean) {
      const api = useApi();
      const _loading = useLoading();
      const customerData = guestStorage();
      const userData = useUserData();

      try {
        _loading.show();

        const imageFile = await this.processUploadImage();
        if (!imageFile) {
          _loading.hide();
          return;
        }

        const requestData = {
          url: "api/v1/holyboard/bottles/store",
          params: <BottleKeepRequest>{
            name: this.form.bottleName,
            user_fullname: !useMember
              ? this.form.userFullname
              : customerData.value.name,
            phone_number: !useMember
              ? this.form.phoneNumber
              : customerData.value.phone,
            description: this.form.description,
            image_url: imageFile,
            outlet_id: userData.value.user?.outlet.id,
          },
        };

        if (useMember) {
          requestData.params.user_id = customerData.value.id;
        }

        await api.post(requestData);
        _loading.hide();
        return navigateTo("/bottle-keeping");
      } catch (error) {
        api.handleError(error);
        _loading.hide();
      }
    },

    async processUploadImage() {
      const api = useApi();

      try {
        const { data } = await api.uploadFile({
          url: "api/v1/holyboard/bottles/upload",
          params: { image: this.form.imageUrl },
        });

        return data.data.path;
      } catch (error) {
        api.handleError(error);
      }
    },
  },
});
