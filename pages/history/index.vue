<script setup lang="ts">
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
    await getOutlets();
  });
});

async function initializaData(search?: string, page?: number) {
  await _bottle.getBottleDatas(search, true, page);
}

async function getOutlets() {
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
  const filtered = _outlet.outlets.filter((option) =>
    fuzzySearch(option.name, search)
  );
  outletsOptions.value = filtered;
}
</script>

<template>
  <section id="bottleKeepHistoryHead">
    <Topbar
      page-title="Bottle Keeping History"
      :use-actions="true"
      :actions="actions"
    />

    <div class="menu-bar my-6">
      <div class="spacer"></div>
      <div class="search-row">
        <CustomSelect
          v-model="selectedOption"
          :options="
            outletsOptions.map((option) => ({
              id: option.id,
              text: option.name,
            }))
          "
          class="md:w-1/2"
          placeholder="Pilih Outlet"
          @search="searchOutlet"
        />
        <form class="search md:w-1/2" @submit.prevent="searchData()">
          <input
            v-model="searchKey"
            type="text"
            placeholder="Cari sesuatu..."
          />
          <button @click="searchData()">
            <Iconify icon="material-symbols:search" class="text-xl" />
          </button>
        </form>
      </div>
    </div>
  </section>

  <section id="bottleKeepHistoryBody" class="page-body">
    <div class="mt-8 overflow-x-auto">
      <table>
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
            v-show="_bottle.bottleDatas.length"
            :key="index"
            class="cursor-pointer hover:bg-primaryBg/40 duration-200"
            @click="selectBottleCard(bottleData)"
          >
            <td class="text-center">{{ _bottle.meta.from + index }}</td>
            <td>{{ bottleData.bottleName }}</td>
            <td>{{ bottleData.userFullName }}</td>
            <td>{{ bottleData.phoneNumber }}</td>
            <td v-show="isAdmin()" class="text-center">
              {{ formatDate(bottleData.storedAt) }}
            </td>
            <td class="text-center">
              {{ formatDate(bottleData.expiredAt) }}
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
          <tr v-show="!_bottle.bottleDatas.length">
            <td colspan="8" class="text-center">Tidak ada data</td>
          </tr>
        </tbody>
      </table>
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
  />
</template>
