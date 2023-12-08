<script setup lang="ts">
const _guest = useGuest();

onMounted(async () => {
  _guest.$reset();
  await lazyLoadFetch();
});

async function search() {
  _guest.guestDatas = [];
  await _guest.searchGuest();
}

async function lazyLoadFetch() {
  window.onscroll = () => {
    const bottomOfWindow =
      Math.max(
        window.scrollY,
        document.documentElement.scrollTop,
        document.body.scrollTop
      ) +
        window.innerHeight ===
      document.documentElement.offsetHeight;

    if (bottomOfWindow && _guest.links.next != null) {
      _guest.searchGuest(getNextPage(_guest.links.next));
    }
  };
}

function getGuestData(isMember: boolean, guest?: Customer) {
  if (isMember) {
    const guestData = guestStorage();
    guestData.value = guest;
  }

  navigateTo({
    path: "/bottle-keeping/add/form",
    query: {
      use_member: isMember.toString(),
    },
  });
}
</script>
<template>
  <section id="addBottleKeepHead" class="without-topbar">
    <div class="flex items-center gap-4">
      <button
        type="button"
        class="btn-regular-nav"
        @click="navigateTo('/bottle-keeping')"
      >
        <Iconify
          icon="ic:round-chevron-left"
          class="text-primaryText text-2xl"
        />
      </button>
      <h1 class="subtitle-2 text-primaryText">Tambah Bottle Keeping</h1>
    </div>
  </section>

  <section id="addBottleKeepBody" class="page-body">
    <div class="menu-bar">
      <form class="form-guest" @submit.prevent="search()">
        <div class="form-group">
          <input
            v-model="_guest.form.searchKey"
            type="text"
            placeholder="Masukan Nama / No. Tlpn"
            autofocus
          />
          <div class="devider hidden md:block"></div>
          <button
            type="button"
            class="btn-add-guest"
            @click="getGuestData(false)"
          >
            <div class="hidden lg:flex justify-center items-center gap-2">
              <Iconify icon="mdi:plus-circle" />
              <p>Tambah Baru</p>
            </div>
            <p class="block lg:hidden">
              <Iconify icon="mdi:plus-circle" class="text-xl mx-auto" />
            </p>
          </button>
        </div>
      </form>
    </div>

    <div
      v-if="_guest.guestDatas.length"
      class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8"
    >
      <div
        v-for="(guest, index) in _guest.guestDatas"
        :key="index"
        class="guest-card"
        @click="getGuestData(true, guest)"
      >
        <div class="guest-name bg-brand">
          <p>{{ guest.name }}</p>
        </div>
        <div class="guest-data">
          <div class="grid grid-cols-2 gap-y-5">
            <div class="guest-detail">
              <Iconify icon="ic:baseline-person-outline" class="text-xl" />
              <p>{{ guest.membershipTypeText }}</p>
            </div>
            <div class="guest-detail">
              <Iconify icon="ic:outline-workspace-premium" class="text-xl" />
              <p>{{ guest.typeText }}</p>
            </div>
            <div class="guest-detail">
              <Iconify icon="ic:outline-phone" class="text-xl" />
              <p>+{{ guest.phone }}</p>
            </div>
            <div class="guest-detail">
              <Iconify icon="ic:round-people-outline" class="text-xl" />
              <p>{{ guest.genderText }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center mt-10">
      <img
        preload
        src="/images/icon-not-found.svg"
        class="m-auto"
        alt="No Data"
      />
      <h4 class="mt-2 text-primaryText subtitle-1-r">No Data</h4>
    </div>
  </section>
</template>
