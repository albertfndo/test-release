<script setup lang="ts">
import type { Action } from "~/models/Action";
import { nextTick } from "vue";
import type KeepingData from "~/models/KeepingData";

await nextTick();

const bottleStatus = ref(0);
const openDetailModal = ref(false);
const _bottle = useBottleKeeping();
const userData = useUserData();

onMounted(() => {
  nextTick(async () => {
    await initializaData();
  });
});

async function initializaData(status?: number | null) {
  _bottle.bottleDatas = [];
  await _bottle.getBottleDatas().then(() => {
    _bottle.bottleDatas = _bottle.bottleDatas.filter((bottleData) =>
      status ? bottleData.status === status : bottleData.status !== 4
    );
  });
}

watch(
  () => bottleStatus.value,
  (newValue) => {
    initializaData(newValue);
  }
);

function getColor(status: number) {
  const colorMap = {
    1: "text-[#FF5D97]",
    2: "text-success",
  };

  return colorMap[status as keyof typeof colorMap];
}

function selectBottleCard(bottleData: KeepingData) {
  openDetailModal.value = true;
  _bottle.selectedBottle = bottleData;
}

const actions = reactive<Action[]>([
  {
    text: "Refresh",
    icon: "ic:round-refresh",
    color: "white",
    hbid: "res-refresh",
    click: async () => initializaData(),
  },
  {
    text: "Export",
    icon: "ic:outline-file-upload",
    color: "white",
    hbid: "res-export",
    click: async () => initializaData(),
  },
]);
</script>

<template>
  <section id="bottleKeepHead">
    <Topbar
      page-title="Bottle Keeping"
      :use-actions="true"
      :actions="actions"
    />

    <div class="menu-bar my-6">
      <div class="flex gap-2">
        <p>Status:</p>
        <div class="button-group mb-4 md:mb-0">
          <button
            type="button"
            class="btn-rsvp-status pending"
            :class="bottleStatus === 0 ? 'active' : ''"
            data-hbid="res-status-pending"
            @click="bottleStatus = 0"
          >
            Show All
          </button>
          <button
            type="button"
            class="btn-rsvp-status confirmed"
            :class="bottleStatus === 1 ? 'active' : ''"
            data-hbid="res-status-confirmed"
            @click="bottleStatus = 1"
          >
            Locked
          </button>
          <button
            type="button"
            class="btn-rsvp-status arrived"
            :class="bottleStatus === 2 ? 'active' : ''"
            data-hbid="res-status-arrived"
            @click="bottleStatus = 2"
          >
            Unlocked
          </button>
          <button
            type="button"
            class="btn-rsvp-status"
            :class="bottleStatus === 3 ? 'active' : ''"
            data-hbid="res-status-arrived"
            @click="bottleStatus = 3"
          >
            Picked Up
          </button>
        </div>
      </div>

      <div class="flex gap-2 lg:w-1/3">
        <div class="search">
          <input type="text" placeholder="Enter Name / Phone" />
          <button>
            <Iconify icon="material-symbols:search" class="text-xl" />
          </button>
        </div>
        <div class="devider hidden md:block"></div>
        <button
          type="button"
          class="btn-add-guest"
          data-hbid="gl-tt-addnew-button"
          @click="navigateTo('/bottle-keeping/add')"
        >
          <div class="new">
            <Iconify icon="mdi:plus-circle" class="text-primaryBg text-xl" />
            <p>Add Data</p>
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
    <!-- <pre class="text-primaryText">{{ _bottle.bottleDatas }}</pre> -->
    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="(keepingData, index) in _bottle.bottleDatas"
        :key="index"
        class="rsvp-card"
      >
        <div @click="selectBottleCard(keepingData)">
          <div class="rsvp-card-head bg-[#A38954]">
            <h1 class="text-primaryText font-poppins-sb">
              {{ keepingData.bottleName }}
            </h1>
            <Iconify
              icon="game-icons:beer-bottle"
              class="text-2xl text-primaryText"
            />
          </div>
          <div
            class="rsvp-card-body"
            :class="!userData.roles?.includes('Developer') ? 'pb-3' : ''"
          >
            <div class="flex flex-col gap-y-5 gap-x-2">
              <div class="rsvp-card-detail">
                <Iconify icon="ic:baseline-person-outline" class="text-xl" />
                <p>{{ keepingData.customer?.name }}</p>
              </div>
              <div class="rsvp-card-detail">
                <Iconify icon="ic:outline-phone" class="text-xl" />
                <p>{{ keepingData.customer?.phone }}</p>
              </div>
              <div class="rsvp-card-detail">
                <Iconify icon="ic:outline-access-time" class="text-xl" />
                <p>Expired in {{ keepingData.expiredText }}</p>
              </div>
              <div class="rsvp-card-detail">
                <Iconify
                  icon="ic:round-lens"
                  class="text-xl"
                  :class="getColor(keepingData.status)"
                />
                <p class="status" :class="getColor(keepingData.status)">
                  {{
                    keepingData.status !== 3
                      ? keepingData.statusText
                      : "Picked Up"
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          v-show="userData.roles?.includes('Developer')"
          class="rsvp-card-footer"
        >
          <div class="flex justify-between gap-2 py-4">
            <button class="btn-general w-full">
              <p>Release</p>
            </button>
            <button v-show="false" class="btn-general w-full">
              <p>Unlock</p>
            </button>
            <button v-show="true" class="btn-danger w-full">
              <p>Lock</p>
            </button>
            <button class="btn-full no-bg">
              <p>Detail</p>
            </button>
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
