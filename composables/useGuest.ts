import { useLocalStorage, type RemovableRef } from "@vueuse/core";
import Customer from "~/models/Customer";
import type { Meta, PageLinks } from "~/models/Pagination";

export const guestStorage = () => {
  const data = useLocalStorage(
    "selected_guest_data",
    {}
  ) as RemovableRef<Customer>;

  return data;
};

export const useGuest = defineStore("guest", {
  state: () => ({
    guestDatas: <Customer[]>[],
    selectedGuest: <Customer | null>null,
    form: {
      searchKey: <string>"",
    },
    meta: <Meta>{},
    links: <PageLinks>{},
  }),
  actions: {
    async searchGuest(page: number = 1) {
      const api = useApi();
      const _loading = useLoading();

      _loading.show();
      try {
        const { data } = await api.get({
          url: "api/v1/holyboard/guest/search",
          params: {
            page: page,
            keyword: this.form.searchKey,
          },
        });

        const result = data.data.map((guest: any) => Customer.fromJson(guest));
        for (const item of result) {
          this.guestDatas.push(item);
        }

        this.meta = data.meta;
        this.links = data.links;

        _loading.hide();
      } catch (error) {
        _loading.hide();
        api.handleError(error);
      }
    },
  },
});
