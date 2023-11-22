<script setup lang="ts">
import KeepingData from "~/models/KeepingData";

const openDetailModal = ref(false);
const _bottle = useBottleKeeping();

onMounted(() => {
  nextTick(async () => {
    await initializaData();
  });
});

async function initializaData() {
  _bottle.bottleDatas = [];
  await _bottle.getBottleDatas().then(() => {
    _bottle.bottleDatas = _bottle.bottleDatas.filter(
      (bottleData) => bottleData.status === 4
    );
  });
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
  </section>
  <section id="bottleKeepHistoryBody" class="page-body">
    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <p>{{ expiredData.customer?.name }}</p>
            </div>
            <div class="rsvp-card-detail">
              <Iconify icon="ic:outline-phone" class="text-xl" />
              <p>{{ expiredData.customer?.phone }}</p>
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
  </section>

  <BottleKeepDetail
    v-if="openDetailModal"
    :bottle-keep-detail="_bottle.selectedBottle"
    :open-detail-modal="openDetailModal"
    :is-rekeep="false"
    @close="openDetailModal = false"
  />
</template>
