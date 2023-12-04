<script setup lang="ts">
import moment from "moment";
import { nextTick } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import { BottleStatus } from "~/models/KeepingData";
import { selectedBottleData } from "~/composables/useBottleKeeping";

await nextTick();

const _dialog = useDialog();
const _outlet = useOutlet();
const _bottle = useBottleKeeping();

const date = ref("");
const searchKey = ref("");
const filterModal = ref(false);
const releaseModal = ref(false);
const openDetailModal = ref(false);
const selectedOption = ref(null);
const outletsOptions = ref<Outlet[]>([]);

const format = (date: any) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

onMounted(() => {
  _bottle.$reset();
  nextTick(async () => {
    await initializaData();
  });
});

async function initializaData(search?: string, page?: number) {
  await _bottle.getBottleDatas(search, false, page);
  await _outlet.getOutlets();
  outletsOptions.value = _outlet.outlets;
}

async function changePage(page: any) {
  const nextPage = page?.split("page=")[1].split("&")[0];
  await initializaData((page = nextPage));
}

watch(
  () => _bottle.bottleStatus,
  (newValue) => {
    _bottle.bottleStatus = newValue;
    initializaData(searchKey.value);
  }
);

function getColor(status: number) {
  const colorMap = {
    1: "bg-[#FF5D97]",
    2: "bg-success",
    3: "bg-primaryText",
  };

  return colorMap[status as keyof typeof colorMap];
}

function selectBottleCard(bottleData: KeepingData) {
  openDetailModal.value = true;
  _bottle.selectedBottle = bottleData;
}

function searchData() {
  initializaData(searchKey.value);
}

function showButton(status: number, buttonName: string) {
  const statusMap = {
    1: ["Unlock"],
    2: ["Release", "Lock"],
    3: [""],
    4: [""],
  };

  return statusMap[status as keyof typeof statusMap].includes(buttonName);
}

function releaseBottle(bottleData: KeepingData) {
  if (openDetailModal.value) openDetailModal.value = false;

  releaseModal.value = true;
  _bottle.selectedBottle = bottleData;
}

function rekeepBottle(bottleData: KeepingData) {
  const selectedBottle = selectedBottleData();
  selectedBottle.value = bottleData;

  navigateTo({
    path: "/bottle-keeping/add/form",
    query: {
      use_member: bottleData.customer ? "true" : "false",
    },
  });
}

async function submitRelease() {
  releaseModal.value = false;
  await _bottle.releaseBottleData();
  initializaData();
}

function updateStatus(bottleData: KeepingData, status: number) {
  _dialog.show({
    title: "Konfirmasi",
    content: "Apakah anda yakin ingin mengubah status botol?",
    callback: {
      onTapBack() {
        _dialog.hideDialog();
      },
      onTapConfirm() {
        _bottle.updateBottleStatus(bottleData, status).then(() => {
          _dialog.hideDialog();
          initializaData();
        });
      },
    },
    backText: "Batal",
    confirmText: "Konfirmasi",
    showBack: true,
  });
}

const actions = reactive<Action[]>([
  {
    text: "Refresh",
    icon: "ic:round-refresh",
    color: "white",
    click: async () => initializaData(),
  },
]);

if (isAdmin()) {
  actions.push({
    text: "Export",
    icon: "ic:outline-file-upload",
    color: "white",
    click: async () => initializaData(),
  });
}

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
  <section id="bottleKeepHead">
    <Topbar page-title="Bottle Keep" :use-actions="true" :actions="actions" />

    <div class="menu-bar my-6">
      <div class="flex gap-2 mb-4 md:mb-0">
        <p>Status:</p>
        <div class="button-group">
          <button
            type="button"
            class="btn-rsvp-status pending"
            :class="_bottle.bottleStatus === 0 ? 'active' : ''"
            @click="_bottle.bottleStatus = 0"
          >
            Semua
          </button>
          <button
            type="button"
            class="btn-rsvp-status confirmed"
            :class="_bottle.bottleStatus === BottleStatus.lock ? 'active' : ''"
            @click="_bottle.bottleStatus = BottleStatus.lock"
          >
            Terkunci
          </button>
          <button
            type="button"
            class="btn-rsvp-status arrived"
            :class="
              _bottle.bottleStatus === BottleStatus.unlock ? 'active' : ''
            "
            @click="_bottle.bottleStatus = BottleStatus.unlock"
          >
            Terbuka
          </button>
          <button
            type="button"
            class="btn-rsvp-status"
            :class="
              _bottle.bottleStatus === BottleStatus.release ? 'active' : ''
            "
            @click="_bottle.bottleStatus = BottleStatus.release"
          >
            Diambil
          </button>
          <button
            v-show="false"
            type="button"
            class="btn-rsvp-status border-gray-500"
            :class="
              _bottle.bottleStatus === BottleStatus.waitingExpired
                ? 'bg-gray-500 text-primaryText'
                : ''
            "
            @click="_bottle.bottleStatus = BottleStatus.waitingExpired"
          >
            Menunggu Expired
          </button>
        </div>
      </div>

      <div class="search-row">
        <form class="search" @submit.prevent="searchData()">
          <input
            v-model="searchKey"
            type="text"
            placeholder="Cari sesuatu..."
          />
          <button @click="searchData()">
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
          @click="navigateTo('/bottle-keeping/add')"
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

  <section id="bottleKeepBody">
    <div v-if="_bottle.bottleDatas.length" class="mt-8 overflow-x-auto">
      <table :class="isAdmin() ? 'w-[110%]' : 'w-full'">
        <thead>
          <tr>
            <th class="text-center">No</th>
            <th>Nama Botol</th>
            <th>Nama Tamu</th>
            <th>No. Tlpn</th>
            <th v-show="isAdmin()" class="text-center">Tgl Simpan</th>
            <th class="text-center">Tgl Expired</th>
            <th v-show="isAdmin()" class="text-center">Sisa Simpan</th>
            <th v-show="isAdmin()">Outlet</th>
            <th class="text-center">Status</th>
            <th v-show="isAdmin()" class="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(bottleData, index) in _bottle.bottleDatas"
            :key="index"
            :class="
              !isAdmin()
                ? 'hover:bg-primaryBg/40 cursor-pointer duration-200'
                : ''
            "
            @click="!isAdmin() ? selectBottleCard(bottleData) : ''"
          >
            <td class="text-center">{{ _bottle.meta.from + index }}</td>
            <td>{{ bottleData.bottleName }}</td>
            <td>{{ bottleData.userFullName }}</td>
            <td>{{ bottleData.phoneNumber }}</td>
            <td v-show="isAdmin()" class="text-center">
              {{ moment(bottleData.storedAt).format("DD MMM YYYY") }}
            </td>
            <td class="text-center">
              {{ moment(bottleData.expiredAt).format("DD MMM YYYY") }}
              <p class="table-expired-text">({{ bottleData.expiredText }})</p>
            </td>
            <td v-show="isAdmin()" class="text-center">
              {{ bottleData.remainingKeeps }}
            </td>
            <td v-show="isAdmin()">
              {{ bottleData.outlet?.name }}
            </td>
            <td class="text-center">
              <span class="status-pill" :class="getColor(bottleData.status)">
                {{ bottleData.bottleStatusIndoText }}
              </span>
            </td>
            <td v-show="isAdmin()">
              <div class="flex justify-between gap-2">
                <button
                  v-show="isAdmin() && showButton(bottleData.status, 'Release')"
                  class="btn-general w-full"
                  @click="releaseBottle(bottleData)"
                >
                  <p>Rilis</p>
                </button>
                <button
                  v-show="isAdmin() && showButton(bottleData.status, 'Unlock')"
                  class="btn-general w-full"
                  @click="updateStatus(bottleData, BottleStatus.unlock)"
                >
                  <p>Buka</p>
                </button>
                <button
                  v-show="isAdmin() && showButton(bottleData.status, 'Lock')"
                  class="btn-danger w-full"
                  @click="updateStatus(bottleData, BottleStatus.lock)"
                >
                  <p>Kunci</p>
                </button>
                <button
                  class="btn-full no-bg"
                  @click="selectBottleCard(bottleData)"
                >
                  <p>Detail</p>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-center mt-10">
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
    </div>

    <Pagination
      v-if="_bottle.meta.total > 10"
      :from="_bottle.meta.from"
      :to="_bottle.meta.to"
      :total="_bottle.meta.total"
      :prev="_bottle.links.prev"
      :next="_bottle.links.next"
      :links="_bottle.meta.links"
      @changepage="changePage"
    />
  </section>

  <BottleKeepDetail
    v-if="openDetailModal"
    :bottle-keep-detail="_bottle.selectedBottle"
    :open-detail-modal="openDetailModal"
    :is-rekeep="false"
    @close="openDetailModal = false"
    @release="releaseBottle(_bottle.selectedBottle)"
    @rekeep="rekeepBottle(_bottle.selectedBottle)"
  />

  <Modal
    v-show="releaseModal"
    :open-global-modal="releaseModal"
    :form-mode="true"
    :use-button="true"
    @submit="submitRelease()"
    @close="releaseModal = false"
  >
    <h2>Pelepasan Botol</h2>
    <p>Apakah anda yakin ingin melepas botol ini?</p>
    <textarea
      v-model="_bottle.releaseNotes"
      placeholder="Catatan Pelepasan"
      rows="5"
      class="global-textarea mt-2"
    ></textarea>
  </Modal>

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
