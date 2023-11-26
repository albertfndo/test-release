<script setup lang="ts">
const openDetailModal = ref(false);
const _bottle = useBottleKeeping();
const searchKey = ref("");

onMounted(() => {
  _bottle.$reset();
  nextTick(async () => {
    await initializaData();
  });
});

async function initializaData(search?: string) {
  await _bottle.getBottleDatas(search, true);
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
    <div v-if="_bottle.bottleDatas.length" class="mt-8">
      <table class="hidden md:table">
        <thead>
          <tr>
            <th class="w-[3%]">No</th>
            <th class="w-1/5">Bottle Name</th>
            <th class="w-1/5">User Name</th>
            <th class="w-1/5">Phone Number</th>
            <th class="w-1/6">Expired</th>
            <th class="w-[10%]">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(bottleData, index) in _bottle.bottleDatas"
            :key="index"
            class="cursor-pointer hover:bg-primaryBg/40"
            @click="selectBottleCard(bottleData)"
          >
            <td class="text-center">{{ index + 1 }}</td>
            <td>{{ bottleData.bottleName }}</td>
            <td>{{ bottleData.userFullName }}</td>
            <td>{{ bottleData.phoneNumber }}</td>
            <td>{{ bottleData.expiredText }}</td>
            <td>
              <div class="flex gap-1 items-center">
                <Iconify icon="ic:round-lens" class="text-xl" />
                <p>
                  {{ bottleData.statusText }}
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:hidden">
        <div
          v-for="(expiredData, index) in _bottle.bottleDatas"
          :key="index"
          class="rsvp-card"
          @click="selectBottleCard(expiredData)"
        >
          <div class="rsvp-card-head bg-[#A38954]">
            <h1 class="text-primaryText font-poppins-sb">
              {{ expiredData.bottleName }}
            </h1>
            <Iconify
              icon="game-icons:beer-bottle"
              class="text-2xl text-primaryText"
            />
          </div>

          <div class="rsvp-card-body pb-3">
            <div class="flex flex-col gap-y-3 gap-x-2">
              <div class="rsvp-card-detail">
                <Iconify icon="ic:baseline-person-outline" class="text-xl" />
                <p>{{ expiredData.userFullName }}</p>
              </div>
              <div class="rsvp-card-detail">
                <Iconify icon="ic:outline-phone" class="text-xl" />
                <p>{{ expiredData.phoneNumber }}</p>
              </div>
              <div class="rsvp-card-detail">
                <Iconify icon="ic:outline-access-time" class="text-xl" />
                <p>Expired {{ expiredData.expiredText }}</p>
              </div>
              <div class="rsvp-card-detail">
                <Iconify icon="ic:round-lens" class="text-xl" />
                <p class="status">Expired</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  </section>

  <BottleKeepDetail
    v-if="openDetailModal"
    :bottle-keep-detail="_bottle.selectedBottle"
    :open-detail-modal="openDetailModal"
    :is-rekeep="false"
    @close="openDetailModal = false"
  />
</template>
