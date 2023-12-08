<script setup lang="ts">
import Datepicker from "@vuepic/vue-datepicker";
import { DeliveryStatus } from "~/models/Delivery";
// import moment from "moment";
import Outlet from "~/models/Outlet";

const _outlet = useOutlet();
const _delivery = useDelivery();

const date = ref("");
const searchKey = ref("");
const filterModal = ref(false);
const selectedOption = ref(null);
const outletsOptions = ref<Outlet[]>([]);

await nextTick();

onMounted(() => {
  nextTick(async () => {
    await initializaData();
    await getOutlet();
  });
});

watch(
  () => _delivery.deliveryStatus,
  (newValue) => {
    _delivery.deliveryStatus = newValue;
  }
);

async function initializaData(page?: number) {
  await _delivery.getDeliveryList(page);
}

async function changePage(page: any) {
  const nextPage = page?.split("page=")[1].split("&")[0];
  await initializaData(nextPage);
}

async function getOutlet() {
  await _outlet.getOutlets();
  outletsOptions.value = _outlet.outlets;
}

const actions = reactive<Action[]>([
  {
    text: "Refresh",
    icon: "ic:round-refresh",
    color: "white",
    click: async () => initializaData(),
  },
]);

const format = (date: any) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

function setDate() {
  // date.value = moment(date.value).format("DD-MM-YYYY");
}

function searchOutlet(search: string) {
  const filtered = _outlet.outlets.filter((option) =>
    fuzzySearch(option.name, search)
  );
  outletsOptions.value = filtered;
}

function getColor(status: number) {
  const colorMap = {
    1: "bg-primaryText",
    2: "bg-blue-400",
    3: "bg-success",
  };

  return colorMap[status as keyof typeof colorMap];
}
</script>
<template>
  <section id="deliveryHead">
    <Topbar
      page-title="Pengiriman Botol"
      :use-actions="true"
      :actions="actions"
    />

    <div class="menu-bar my-6">
      <div class="flex gap-2 mb-4 md:mb-0">
        <p>Status:</p>
        <div class="button-group">
          <button
            type="button"
            class="btn-status pending"
            :class="_delivery.deliveryStatus === 0 ? 'active' : ''"
            @click="_delivery.deliveryStatus = 0"
          >
            Semua
          </button>
          <button
            type="button"
            class="btn-status"
            :class="
              _delivery.deliveryStatus === DeliveryStatus.draft ? 'active' : ''
            "
            @click="_delivery.deliveryStatus = DeliveryStatus.draft"
          >
            Draft
          </button>
          <button
            type="button"
            class="btn-status new"
            :class="
              _delivery.deliveryStatus === DeliveryStatus.publish
                ? 'active'
                : ''
            "
            @click="_delivery.deliveryStatus = DeliveryStatus.publish"
          >
            Publish
          </button>
          <button
            type="button"
            class="btn-status arrived"
            :class="
              _delivery.deliveryStatus === DeliveryStatus.selesai
                ? 'active'
                : ''
            "
            @click="_delivery.deliveryStatus = DeliveryStatus.selesai"
          >
            Selesai
          </button>
        </div>
      </div>

      <div class="search-row">
        <form class="search" @submit.prevent="console.log(1)">
          <input
            v-model="searchKey"
            type="text"
            placeholder="Cari sesuatu..."
          />
          <button @click="console.log(1)">
            <Iconify icon="material-symbols:search" class="text-xl" />
          </button>
        </form>
        <button type="button" class="btn-add-guest" @click="filterModal = true">
          <div class="new">
            <Iconify icon="mdi:filter" class="text-primaryBg text-xl" />
            <p>Filter</p>
          </div>
          <p class="block lg:hidden">
            <Iconify icon="mdi:filter" class="mx-auto text-primaryBg text-xl" />
          </p>
        </button>
        <div class="devider hidden md:block"></div>
        <button
          type="button"
          class="btn-add-guest"
          @click="navigateTo('/delivery/add')"
        >
          <div class="new">
            <Iconify icon="mdi:plus-circle" class="text-primaryBg text-xl" />
            <p>Tambah Data</p>
          </div>
          <p class="block lg:hidden">
            <Iconify
              icon="mdi:plus-circle"
              class="mx-auto text-primaryBg text-xl"
            />
          </p>
        </button>
      </div>
    </div>
  </section>
  <section id="deliveryBody" class="page-body">
    <div class="mt-8 overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th class="text-center">No</th>
            <th>No Surat</th>
            <th>Tanggal Kirim</th>
            <th>Tanggal Terima</th>
            <th>Outlet</th>
            <th class="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(deliveryData, index) in _delivery.deliveryList"
            v-show="_delivery.deliveryList.length"
            :key="index"
            class="cursor-pointer hover:bg-primaryBg/40 duration-200"
            @click="navigateTo(`/delivery/${deliveryData.id}`)"
          >
            <td class="text-center">{{ _delivery.meta.from + index }}</td>
            <td>{{ deliveryData.noDelivery }}</td>
            <td>{{ formatDate(deliveryData.createdAt) }}</td>
            <td>{{ formatDate(deliveryData.arrivedAt) }}</td>
            <td>{{ deliveryData.outlet.name }}</td>
            <td class="text-center">
              <span
                :class="getColor(deliveryData.status)"
                class="status-pill"
                >{{ deliveryData.deliveryStatusIndonesian }}</span
              >
            </td>
          </tr>
          <tr v-show="!_delivery.deliveryList.length">
            <td colspan="6" class="text-center">Tidak ada data</td>
          </tr>
        </tbody>
      </table>
    </div>

    <Pagination
      v-if="_delivery.meta.total > 10"
      :from="_delivery.meta.from"
      :to="_delivery.meta.to"
      :total="_delivery.meta.total"
      :prev="_delivery.links.prev"
      :next="_delivery.links.next"
      :links="_delivery.meta.links"
      @changepage="changePage"
    />
  </section>
  <Modal
    v-if="filterModal"
    :use-button="true"
    :use-small-modal="true"
    :form-mode="true"
    :open-global-modal="filterModal"
    :format="'DD/MM/YYYY'"
    @close="filterModal = false"
  >
    <form class="filter-form" @submit.prevent="">
      <h2>Filter</h2>
      <div class="form-group">
        <label class="text-primaryText">No Surat</label>
        <input type="text" class="" placeholder="Masukkan No Surat" />
      </div>
      <div class="form-group">
        <label class="text-primaryText" for="date">Tanggal</label>
        <Datepicker
          v-model="date"
          dark
          auto-apply
          placeholder="Pilih Tanggal"
          position="center"
          class="mx-auto w-full"
          mode-height="170"
          :format="format"
          :enable-time-picker="false"
          @update:model-value="setDate()"
        />
      </div>
      <div class="form-group">
        <label class="text-primaryText" for="date">Outlet</label>
        <CustomSelect
          v-model="selectedOption"
          :options="
            outletsOptions.map((option) => ({
              id: option.id,
              text: option.name,
            }))
          "
          placeholder="Pilih Outlet"
          @search="searchOutlet"
        />
      </div>
    </form>
  </Modal>
</template>
