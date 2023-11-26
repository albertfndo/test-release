<script setup lang="ts">
import { nextTick } from "vue";
import { selectedBottleData } from "~/composables/useBottleKeeping";

await nextTick();

const openDetailModal = ref(false);
const _bottle = useBottleKeeping();
const userData = useUserData();
const searchKey = ref("");
const releaseModal = ref(false);

onMounted(() => {
  _bottle.$reset();
  nextTick(async () => {
    await initializaData();
  });
});

async function initializaData(status?: number, search?: string) {
  await _bottle.getBottleDatas(search);
}

watch(
  () => _bottle.bottleStatus,
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

function searchData() {
  initializaData(_bottle.bottleStatus, searchKey.value);
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
  await _bottle.releaseBottleData();
  releaseModal.value = false;
  initializaData();
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

if (isAdmin()) {
  actions.push({
    text: "Export",
    icon: "ic:outline-file-upload",
    color: "white",
    hbid: "res-export",
    click: async () => initializaData(),
  });
}
</script>

<template>
  <section id="bottleKeepHead">
    <Topbar
      page-title="Bottle Keeping"
      :use-actions="true"
      :actions="actions"
    />

    <div class="menu-bar my-6">
      <div class="flex gap-2 mb-4 md:mb-0">
        <p>Status:</p>
        <div class="button-group">
          <button
            type="button"
            class="btn-rsvp-status pending"
            :class="_bottle.bottleStatus === 0 ? 'active' : ''"
            data-hbid="res-status-pending"
            @click="_bottle.bottleStatus = 0"
          >
            Show All
          </button>
          <button
            type="button"
            class="btn-rsvp-status confirmed"
            :class="_bottle.bottleStatus === 1 ? 'active' : ''"
            data-hbid="res-status-confirmed"
            @click="_bottle.bottleStatus = 1"
          >
            Locked
          </button>
          <button
            type="button"
            class="btn-rsvp-status arrived"
            :class="_bottle.bottleStatus === 2 ? 'active' : ''"
            data-hbid="res-status-arrived"
            @click="_bottle.bottleStatus = 2"
          >
            Unlocked
          </button>
          <button
            type="button"
            class="btn-rsvp-status"
            :class="_bottle.bottleStatus === 3 ? 'active' : ''"
            data-hbid="res-status-arrived"
            @click="_bottle.bottleStatus = 3"
          >
            Picked Up
          </button>
        </div>
      </div>

      <div class="flex gap-2 md:w-2/5 lg:w-1/4">
        <form class="search" @submit.prevent="searchData()">
          <input
            v-model="searchKey"
            type="text"
            placeholder="Search something..."
          />
          <button @click="searchData()">
            <Iconify icon="material-symbols:search" class="text-xl" />
          </button>
        </form>
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
    <div v-if="_bottle.bottleDatas.length" class="mt-8">
      <table class="hidden md:table">
        <thead>
          <tr>
            <th class="w-[3%] text-center">No</th>
            <th class="w-1/5">Bottle Name</th>
            <th class="w-1/6">User Name</th>
            <th class="w-1/6">Phone Number</th>
            <th class="w-1/6">Expired</th>
            <th class="w-[10%]">Status</th>
            <th v-show="isAdmin()" class="w-1/4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(bottleData, index) in _bottle.bottleDatas" :key="index">
            <td class="text-center">{{ index + 1 }}</td>
            <td>{{ bottleData.bottleName }}</td>
            <td>{{ bottleData.userFullName }}</td>
            <td>{{ bottleData.phoneNumber }}</td>
            <td>{{ bottleData.expiredText }}</td>
            <td>
              <div class="flex gap-1 items-center">
                <Iconify
                  icon="ic:round-lens"
                  class="text-xl"
                  :class="getColor(bottleData.status)"
                />
                <p class="status" :class="getColor(bottleData.status)">
                  {{
                    bottleData.status !== 3
                      ? bottleData.statusText
                      : "Picked Up"
                  }}
                </p>
              </div>
            </td>
            <td v-show="isAdmin()">
              <div class="flex justify-between gap-2">
                <button
                  v-show="isAdmin() && showButton(bottleData.status, 'Release')"
                  class="btn-general w-full"
                  @click="releaseBottle(bottleData)"
                >
                  <p>Release</p>
                </button>
                <button
                  v-show="isAdmin() && showButton(bottleData.status, 'Unlock')"
                  class="btn-general w-full"
                >
                  <p>Unlock</p>
                </button>
                <button
                  v-show="isAdmin() && showButton(bottleData.status, 'Lock')"
                  class="btn-danger w-full"
                  @click="_bottle.lockBottleData(bottleData)"
                >
                  <p>Lock</p>
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
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:hidden">
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
                  <p>{{ keepingData.userFullName }}</p>
                </div>
                <div class="rsvp-card-detail">
                  <Iconify icon="ic:outline-phone" class="text-xl" />
                  <p>{{ keepingData?.phoneNumber }}</p>
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
          <div class="rsvp-card-footer">
            <div v-show="isAdmin()" class="flex justify-between gap-2 py-4">
              <button
                v-show="showButton(keepingData.status, 'Release')"
                class="btn-general w-full"
                @click="releaseBottle(keepingData)"
              >
                <p>Release</p>
              </button>
              <button
                v-show="showButton(keepingData.status, 'Unlock')"
                class="btn-general w-full"
              >
                <p>Unlock</p>
              </button>
              <button
                v-show="showButton(keepingData.status, 'Lock')"
                class="btn-danger w-full"
                @click="_bottle.lockBottleData(keepingData)"
              >
                <p>Lock</p>
              </button>
              <button
                class="btn-full no-bg"
                @click="selectBottleCard(keepingData)"
              >
                <p>Detail</p>
              </button>
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
    <h2>Release Bottle</h2>
    <p>Are you sure want to release this bottle?</p>
    <textarea
      v-model="_bottle.releaseNotes"
      placeholder="Release Note"
      rows="5"
      class="global-textarea mt-2"
    ></textarea>
  </Modal>
</template>
