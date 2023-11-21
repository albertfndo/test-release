<script setup lang="ts">
const bottleStatus = ref(0);
const openDetailModal = ref(false);

const actions = reactive<Action[]>([
  {
    text: "Refresh",
    icon: "ic:round-refresh",
    color: "white",
    hbid: "res-refresh",
    click: async () => console.log("refresh"),
  },
  {
    text: "Export",
    icon: "ic:outline-file-upload",
    color: "white",
    hbid: "res-export",
    click: async () => console.log("export"),
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
            class="btn-rsvp-status"
            :class="bottleStatus === 1 ? 'active' : ''"
            data-hbid="res-status-arrived"
            @click="bottleStatus = 1"
          >
            Picked Up
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
            class="btn-rsvp-status confirmed"
            :class="bottleStatus === 3 ? 'active' : ''"
            data-hbid="res-status-confirmed"
            @click="bottleStatus = 3"
          >
            Locked
          </button>
        </div>
      </div>

      <div class="flex gap-2 lg:w-1/4">
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
    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="rsvp-card">
        <div @click="openDetailModal = true">
          <div class="rsvp-card-head bg-[#A38954]">
            <h1 class="text-primaryText font-poppins-sb">
              Refined Cotton Bike
            </h1>
            <Iconify
              icon="game-icons:beer-bottle"
              class="text-2xl text-primaryText"
            />
          </div>
          <div class="rsvp-card-body">
            <div class="flex flex-col gap-y-5 gap-x-2">
              <div class="rsvp-card-detail">
                <Iconify icon="ic:baseline-person-outline" class="text-xl" />
                <p>Rendhy Widjaja</p>
              </div>
              <div class="rsvp-card-detail">
                <Iconify icon="ic:outline-phone" class="text-xl" />
                <p>+6282115831114</p>
              </div>
              <div class="rsvp-card-detail">
                <Iconify icon="ic:outline-access-time" class="text-xl" />
                <p>Expired in 7 days</p>
              </div>
              <div class="rsvp-card-detail">
                <Iconify icon="ic:round-lens" class="text-xl" />
                <p class="status">Picked Up</p>
              </div>
            </div>
          </div>
        </div>
        <div v-show="true" class="rsvp-card-footer">
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
      <div class="rsvp-card">
        <div @click="openDetailModal = true">
          <div class="rsvp-card-head bg-brand">
            <p>Refined Cotton Bike</p>
            <Iconify icon="game-icons:beer-bottle" class="text-2xl" />
          </div>
          <div class="rsvp-card-body">
            <div class="flex flex-col gap-y-5 gap-x-2">
              <div class="rsvp-card-detail">
                <Iconify icon="ic:baseline-person-outline" class="text-xl" />
                <p>Rendhy Widjaja</p>
              </div>
              <div class="rsvp-card-detail">
                <Iconify icon="ic:outline-phone" class="text-xl" />
                <p>+6282115831114</p>
              </div>
              <div class="rsvp-card-detail">
                <Iconify icon="ic:outline-access-time" class="text-xl" />
                <p>Expired in 7 days</p>
              </div>
              <div class="rsvp-card-detail text-success">
                <Iconify icon="ic:round-lens" class="text-xl" />
                <p class="status">Unlocked</p>
              </div>
            </div>
          </div>
        </div>
        <div v-show="true" class="rsvp-card-footer">
          <div class="rsvp-footer-items">
            <button v-show="false" class="btn-general w-full">
              <p>Release</p>
            </button>
            <button v-show="true" class="btn-general w-full">
              <p>Unlock</p>
            </button>
            <button v-show="false" class="btn-danger w-full">
              <p>Lock</p>
            </button>
            <button class="btn-full no-bg">
              <p>Detail</p>
            </button>
          </div>
        </div>
      </div>
      <div class="rsvp-card">
        <div @click="openDetailModal = true">
          <div class="rsvp-card-head bg-brand">
            <p>Refined Cotton Bike</p>
          </div>
          <div class="rsvp-card-body">
            <div class="flex flex-col gap-y-5 gap-x-2">
              <div class="rsvp-card-detail">
                <Iconify icon="ic:baseline-person-outline" class="text-xl" />
                <p>Rendhy Widjaja</p>
              </div>
              <div class="rsvp-card-detail">
                <Iconify icon="ic:outline-phone" class="text-xl" />
                <p>+6282115831114</p>
              </div>
              <div class="rsvp-card-detail">
                <Iconify icon="ic:outline-access-time" class="text-xl" />
                <p>Expired in 7 days</p>
              </div>
              <div class="rsvp-card-detail text-[#FF5D97]">
                <Iconify icon="ic:round-lens" class="text-xl" />
                <p class="status">Locked</p>
              </div>
            </div>
          </div>
        </div>
        <div v-show="true" class="rsvp-card-footer">
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
    :open-detail-modal="openDetailModal"
    :is-rekeep="false"
    @close="openDetailModal = false"
  />
</template>
