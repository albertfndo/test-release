import Delivery, { DeliveryStatus } from "~/models/Delivery";
import type { PageMeta, Links } from "~/models/Pagination";

export const useDelivery = definePiniaStore("delivery", {
  state: () => ({
    delivery: <Delivery>{},
    deliveryList: <Delivery[]>[],
    deliveryStatus: <number>1,
    meta: <PageMeta>{},
    links: <Links>{},
    form: {
      deliveryNumber: <string>"",
      outletId: <number>0,
      bottles: <any>[],
      notes: <string>"",
    },
  }),
  actions: {
    async getDeliveryList(page: number = 1) {
      const api = useApi();
      const _loading = useLoading();
      try {
        _loading.show();

        const { data } = await api.get({
          url: "api/v1/holyboard/bottles/delivery-order",
          params: {
            paginate: 10,
            page: page,
          },
        });

        this.deliveryList = data.data.map((delivery: any) =>
          Delivery.fromJson(delivery)
        );

        this.meta = data.meta;
        this.links = data.links;

        _loading.hide();
      } catch (error) {
        api.handleError(error);
        _loading.hide();
      }
    },
    async getDeliveryById(id: number) {
      const api = useApi();
      const _loading = useLoading();
      try {
        _loading.show();

        const { data } = await api.get({
          url: `api/v1/holyboard/bottles/delivery-order/${id}`,
        });

        this.delivery = Delivery.fromJson(data.data);

        _loading.hide();
      } catch (error) {
        api.handleError(error);
        _loading.hide();
      }
    },

    async submitDelivery() {
      const api = useApi();
      const _loading = useLoading();
      const _snackbar = useSnackbar();
      const userData = useUserData();
      try {
        _loading.show();

        await api.post({
          url: "api/v1/holyboard/bottles/delivery-order/store",
          params: {
            outlet_id: userData.value.user?.outlet?.id,
            bottle_keep_ids: this.form.bottles,
            notes: this.form.notes,
          },
        });

        _snackbar.success("Success", "Data berhasil disimpan", true);
        _loading.hide();

        navigateTo("/delivery");
      } catch (error) {
        api.handleError(error);
        _loading.hide();
      }
    },

    async updateDelivery(id: number, status: number) {
      const api = useApi();
      const _loading = useLoading();
      const _snackbar = useSnackbar();
      try {
        _loading.show();

        const params = {
          status: status,
        };

        if (status == DeliveryStatus.selesai) {
          params.notes = this.form.notes;
          params.lost_bottle_ids = this.form.bottles;
        }

        await api.post({
          url: `api/v1/holyboard/bottles/delivery-order/change-status/${id}`,
          params: params,
        });

        _snackbar.success(
          "Success",
          `Status data pengiriman berhasil ${
            status == DeliveryStatus.publish ? "dipublish" : "diubah ke sampai"
          } `,
          true
        );
        _loading.hide();

        navigateTo(`/delivery/${id}`);
      } catch (error) {
        api.handleError(error);
        _loading.hide();
      }
    },

    async deleteDelivery(id: number) {
      const api = useApi();
      const _loading = useLoading();
      const _snackbar = useSnackbar();
      try {
        _loading.show();

        await api.del({
          url: `api/v1/holyboard/bottles/delivery-order/delete/${id}`,
        });

        _snackbar.success("Success", "Data berhasil dihapus", true);
        _loading.hide();

        navigateTo("/delivery");
      } catch (error) {
        api.handleError(error);
        _loading.hide();
      }
    },
  },
});
