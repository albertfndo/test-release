<script setup lang="ts">
import moment from "moment";

const _outlet = useOutlet();
const _bottle = useBottleKeeping();

const searchKey = ref("");
const openDetailModal = ref(false);
const selectedOption = ref(null);
const outletsOptions = ref<Outlet[]>([]);

onMounted(() => {
  _bottle.$reset();
  nextTick(async () => {
    await initializaData();
  });
});

async function initializaData(search?: string, page?: number) {
  await _bottle.getBottleDatas(search, true, page);
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

function searchData() {
  initializaData(searchKey.value);
}

function selectBottleCard(bottleData: KeepingData) {
  openDetailModal.value = true;
  _bottle.selectedBottle = bottleData;
}

async function changePage(page: any) {
  const nextPage = page?.split("page=")[1].split("&")[0];
  await initializaData("", nextPage);
}

function searchOutlet(search: string) {
  const filtered = _outlet.outlets.filter((option) => fuzzySearch(option.name, search));
  outletsOptions.value = filtered;
}
</script>

<template>
  <section id="bottleKeepHistoryHead">
    <Topbar page-title="Bottle Keeping History" :use-actions="true" :actions="actions" />

    <div class="menu-bar my-6">
      <form class="ml-auto search md:w-1/2 gap-2" @submit.prevent="searchData()">
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
        <input v-model="searchKey" type="text" placeholder="Cari sesuatu..." />
        <button @click="searchData()">
          <Iconify icon="material-symbols:search" class="text-xl" />
        </button>
      </form>
    </div>
  </section>

  <section id="bottleKeepHistoryBody" class="page-body">
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
            <th v-show="isAdmin()">Outlet</th>
            <th class="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(bottleData, index) in _bottle.bottleDatas"
            :key="index"
            class="cursor-pointer hover:bg-primaryBg/40 duration-200"
            @click="selectBottleCard(bottleData)"
          >
            <td class="text-center">{{ index + 1 }}</td>
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
            <td v-show="isAdmin()">
              {{ bottleData.outlet?.name }}
            </td>
            <td class="text-center">
              <span class="status-pill bg-primaryText">
                {{ bottleData.bottleStatusIndoText }}
              </span>
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
      v-if="_bottle.meta?.total > 10"
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
  />
</template>
