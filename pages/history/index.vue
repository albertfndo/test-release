<script setup lang="ts">
const openDetailModal = ref(false);
const actions = reactive<Action[]>([
  {
    text: "Refresh",
    icon: "ic:round-refresh",
    color: "white",
    hbid: "res-refresh",
    click: async () => console.log("refresh"),
  },
]);
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
      <div class="rsvp-card" @click="openDetailModal = true">
        <div class="rsvp-card-head bg-[#A38954]">
          <p>Refined Cotton Bike</p>
        </div>

        <div class="rsvp-card-body my-2">
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
              <p>Picked Up</p>
            </div>
          </div>
          <div v-show="false" class="mt-4 flex justify-between gap-2">
            <button class="btn-general w-full">
              <p>Release</p>
            </button>
            <button class="btn-general w-full">
              <p>Unlock</p>
            </button>
            <button v-show="false" class="btn-general w-full">
              <p>Lock</p>
            </button>
            <button class="btn-full no-bg">
              <p>Detail</p>
            </button>
          </div>
        </div>
      </div>
      <div class="rsvp-card" @click="openDetailModal = true">
        <div class="rsvp-card-head bg-[#A38954]">
          <p>Refined Cotton Bike</p>
        </div>

        <div class="rsvp-card-body my-2">
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
              <p>Picked Up</p>
            </div>
          </div>
          <div v-show="false" class="mt-4 flex justify-between gap-2">
            <button class="btn-general w-full">
              <p>Release</p>
            </button>
            <button class="btn-general w-full">
              <p>Unlock</p>
            </button>
            <button v-show="false" class="btn-general w-full">
              <p>Lock</p>
            </button>
            <button class="btn-full no-bg">
              <p>Detail</p>
            </button>
          </div>
        </div>
      </div>
      <div class="rsvp-card" @click="openDetailModal = true">
        <div class="rsvp-card-head bg-[#A38954]">
          <p>Refined Cotton Bike</p>
        </div>

        <div class="rsvp-card-body my-2">
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
              <p>Picked Up</p>
            </div>
          </div>
          <div v-show="false" class="mt-4 flex justify-between gap-2">
            <button class="btn-general w-full">
              <p>Release</p>
            </button>
            <button class="btn-general w-full">
              <p>Unlock</p>
            </button>
            <button v-show="false" class="btn-general w-full">
              <p>Lock</p>
            </button>
            <button class="btn-full no-bg">
              <p>Detail</p>
            </button>
          </div>
        </div>
      </div>
      <div class="rsvp-card" @click="openDetailModal = true">
        <div class="rsvp-card-head bg-[#A38954]">
          <p>Refined Cotton Bike</p>
        </div>

        <div class="rsvp-card-body my-2">
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
              <p>Picked Up</p>
            </div>
          </div>
          <div v-show="false" class="mt-4 flex justify-between gap-2">
            <button class="btn-general w-full">
              <p>Release</p>
            </button>
            <button class="btn-general w-full">
              <p>Unlock</p>
            </button>
            <button v-show="false" class="btn-general w-full">
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
