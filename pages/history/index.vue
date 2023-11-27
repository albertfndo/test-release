<script setup lang="ts">
import moment from "moment";

const openDetailModal = ref(false);
const _bottle = useBottleKeeping();
const searchKey = ref("");

onMounted(() => {
  _bottle.$reset();
  nextTick(async () => {
    await initializaData();
  });
});

async function initializaData(search?: string, page?: number) {
  await _bottle.getBottleDatas(search, true, page);
}

const actions = reactive<Action[]>([
  {
    text: "Refresh",
    icon: "ic:round-refresh",
    color: "white",
    hbid: "res-refresh",
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
</script>

<template>
  <section id="bottleKeepHistoryHead">
    <Topbar
      page-title="Bottle Keeping History"
      :use-actions="true"
      :actions="actions"
    />

    <div class="menu-bar my-6">
      <form class="ml-auto search md:w-1/4" @submit.prevent="searchData()">
        <input
          v-model="searchKey"
          type="text"
          placeholder="Search something..."
        />
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
            <th>Bottle Name</th>
            <th>User Name</th>
            <th>Phone Number</th>
            <th v-show="isAdmin()" class="text-center">Stored At</th>
            <th class="text-center">Expired At</th>
            <th v-show="isAdmin()">Outlet</th>
            <th class="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(bottleData, index) in _bottle.bottleDatas"
            :key="index"
            class="cursor-pointer hover:bg-primaryBg/40"
            @click="selectBottleCard(bottleData)"
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
            <td v-show="isAdmin()">
              {{ bottleData.outlet?.name }}
            </td>
            <td class="text-center">
              <span class="status-pill bg-primaryText">
                {{ bottleData.statusText }}
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
      v-show="_bottle.bottleDatas.length"
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
