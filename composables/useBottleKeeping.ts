import { useLocalStorage, type RemovableRef } from "@vueuse/core";
import KeepingData from "~/models/KeepingData";
import type { PageMeta, Links } from "~/models/Pagination";

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
    bottleStatus: <number>0,
    meta: <PageMeta>{},
    links: <Links>{},
  }),
  actions: {
    async getBottleDatas(
      keyword: string = "",
      isHistory: boolean = false,
      page: number = 1
    ) {
      const api = useApi();
      const _loading = useLoading();
      try {
        _loading.show();

        let selectedStatus = [];
        if (this.bottleStatus == 0) {
          selectedStatus = [1, 2, 3];
        } else {
          selectedStatus = [this.bottleStatus];
        }

        if (isHistory) {
          selectedStatus = [4];
        }

        const { data } = await api.post({
          url: "api/v1/holyboard/bottles",
          params: {
            paginate: 10,
            keyword: keyword,
            status: selectedStatus,
            page: page,
          },
        });

        this.bottleDatas = data.data.map((bottleData: any) =>
          KeepingData.fromJson(bottleData)
        );

        this.meta = data.meta;
        this.links = data.links;

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

    async updateBottleStatus(bottleData: KeepingData, status: number) {
      const api = useApi();
      const _loading = useLoading();
      const _snackbar = useSnackbar();

      try {
        _loading.show();
        await api.put({
          url: `api/v1/holyboard/bottles/update/${bottleData?.id}`,
          params: { status: status },
        });

        _loading.hide();
        _snackbar.success("Success", "Bottle status has been change.", true);
        return navigateTo("/bottle-keeping");
      } catch (error) {
        api.handleError(error);
        _loading.hide();
      }
    },
  },
});
