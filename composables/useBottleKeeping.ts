import { useLocalStorage, type RemovableRef } from "@vueuse/core";
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

export const selectedBottleData = () => {
  const data = useLocalStorage(
    "selected_bottle_data",
    {}
  ) as RemovableRef<KeepingData>;

  return data;
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
    releaseNotes: <string>"",
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
      const _snackbar = useSnackbar();

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
        _snackbar.success("Success", "Bottle has been kept successfully", true);

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

    async releaseBottleData() {
      const api = useApi();
      const _loading = useLoading();
      const _snackbar = useSnackbar();

      try {
        _loading.show();
        await api.put({
          url: `api/v1/holyboard/bottles/release/${this.selectedBottle?.id}`,
          params: { release_notes: this.releaseNotes },
        });

        this.$reset();

        _loading.hide();
        _snackbar.success(
          "Success",
          "Bottle status has been updated to Release",
          true
        );
        return navigateTo("/bottle-keeping");
      } catch (error) {
        api.handleError(error);
        _loading.hide();
      }
    },

    async rekeepBottleData() {
      const api = useApi();
      const _loading = useLoading();
      const _snackbar = useSnackbar();

      try {
        _loading.show();

        const imageFile = await this.processUploadImage();
        if (!imageFile) {
          _loading.hide();
          return;
        }

        await api.put({
          url: `api/v1/holyboard/bottles/rekeep/${this.selectedBottle?.id}`,
          params: {
            image_url: imageFile,
            description: this.form.description,
          },
        });

        _loading.hide();
        _snackbar.success("Success", "Bottle has been Rekeeped", true);
        return navigateTo("/bottle-keeping");
      } catch (error) {
        api.handleError(error);
        _loading.hide();
      }
    },

    async lockBottleData(bottleData: KeepingData) {
      const api = useApi();
      const _loading = useLoading();
      const _snackbar = useSnackbar();
      try {
        _loading.show();
        await api.put({
          url: `api/v1/bottle/lock/${bottleData?.id}`,
        });

        _loading.hide();
        _snackbar.success("Success", "Bottle has been locked", true);
        return navigateTo("/bottle-keeping");
      } catch (error) {
        api.handleError(error);
        _loading.hide();
      }
    },
  },
});
