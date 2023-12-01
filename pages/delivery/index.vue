<script setup lang="ts">
import Datepicker from "@vuepic/vue-datepicker";
import moment from "moment";
import Outlet from "~/models/Outlet";

const _outlet = useOutlet();

const date = ref("");
const searchKey = ref("");
const filterModal = ref(false);
const selectedOption = ref(null);
const outletsOptions = ref<Outlet[]>([]);

await nextTick();

onMounted(() => {
  nextTick(async () => {
    await initializaData();
  });
});

async function initializaData() {
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
          <button type="button" class="btn-rsvp-status pending">Semua</button>
          <button type="button" class="btn-rsvp-status new">Publish</button>
          <button type="button" class="btn-rsvp-status arrived">Selesai</button>
          <button type="button" class="btn-rsvp-status">Draft</button>
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
      <table class="w-full">
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
            class="cursor-pointer hover:bg-primaryBg/40 duration-200"
            @click="navigateTo(`/delivery/${1}`)"
          >
            <td class="text-center">1</td>
            <td>2021/0001</td>
            <td>12/12/2021</td>
            <td>12/12/2021</td>
            <td>Outlet 1</td>
            <td class="text-center">
              <span class="status-pill bg-success">Selesai</span>
            </td>
          </tr>
          <tr
            class="cursor-pointer hover:bg-primaryBg/40 duration-200"
            @click="navigateTo(`/delivery/${1}`)"
          >
            <td class="text-center">1</td>
            <td>2021/0001</td>
            <td>12/12/2021</td>
            <td>12/12/2021</td>
            <td>Outlet 1</td>
            <td class="text-center">
              <span class="status-pill bg-blue-400 text-primaryText"
                >Publish</span
              >
            </td>
          </tr>
          <tr
            class="cursor-pointer hover:bg-primaryBg/40 duration-200"
            @click="navigateTo(`/delivery/${1}`)"
          >
            <td class="text-center">1</td>
            <td>2021/0001</td>
            <td>12/12/2021</td>
            <td>12/12/2021</td>
            <td>Outlet 1</td>
            <td class="text-center">
              <span class="status-pill bg-success">Selesai</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <div v-else class="text-center mt-10">
      <NuxtImg
        preload
        src="/images/icon-not-found.svg"
        class="m-auto"
        width="160px"
        loading="lazy"
        quality="80"
        alt="No Data"
      />
      <h4 class="mt-2 text-primaryText subtitle-1-r">No Data</h4>
    </div> -->
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
