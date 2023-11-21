<script setup lang="ts">
import moment from "moment";
import { useNetwork } from "@vueuse/core";

const network = reactive(useNetwork());
const _dialog = useDialog();
const auth = useAuth();
const userData = useUserData();
// const route = useRoute();

const time = ref(moment().format("HH:mm:ss"));
const date = ref(moment().format("DD MMM YYYY"));
const showMobileNavbar = ref(false);
const isMounted = ref(false);

const version = computed(() => {
  return useRuntimeConfig().public.version;
});

onMounted(() => {
  handleTimeInterval();
  isMounted.value = true;
});

function handleTimeInterval() {
  setInterval(() => {
    date.value = moment().format("DD MMM YYYY");
    time.value = moment().format("HH:mm:ss");
  }, 1000);
}

function logout() {
  showMobileNavbar.value = false;
  _dialog.show({
    title: "Log Out",
    content: "Are you sure you want to log out?",
    callback: {
      onTapBack() {
        _dialog.hideDialog();
      },
      onTapConfirm() {
        auth.logout({
          callback() {
            location.href = "/auth/login";
          },
        });
      },
    },
    backText: "Cancel",
    confirmText: "Confirm",
    showBack: true,
  });
  return;
}
</script>

<template>
  <aside :class="showMobileNavbar ? 'max-lg:left-0' : 'max-lg:-left-full'">
    <div class="nav-info">
      <NuxtImg
        v-show="isMounted"
        preload
        src="/images/logo/hwg-logo.svg"
        class="mx-auto"
        width="120px"
        loading="lazy"
        quality="100"
        :placeholder="[50, 25, 75]"
      />

      <h3>Hi, {{ userData.user?.name }}</h3>

      <div class="general">
        <p>{{ userData.user?.username }}</p>
        <p>{{ userData.user?.outlet.name }}</p>
      </div>

      <div class="general">
        <p>{{ date }}</p>
        <p>{{ time }}</p>
      </div>

      <div class="status">
        <div
          class="status-dot"
          :class="network.isOnline ? 'online' : 'offline'"
        ></div>
        <p>{{ network.isOnline ? "ONLINE" : "OFFLINE" }}</p>
      </div>

      <p class="version">v{{ version }}</p>
    </div>

    <nav>
      <NuxtLink
        to="/bottle-keeping"
        active-class="active"
        class="nav-link"
        data-hbid="menu-reservation"
      >
        <Iconify icon="game-icons:beer-bottle" class="text-2xl" />
        <p>Bottle Keeping</p>
      </NuxtLink>
      <NuxtLink
        to="/history"
        active-class="active"
        class="nav-link"
        data-hbid="menu-reservation"
      >
        <Iconify icon="ic:outline-access-time" class="text-2xl" />
        <p>Bottle Keeping History</p>
      </NuxtLink>
    </nav>

    <div class="logout-btn" data-hbid="logout-button" @click="logout()">
      <div class="logout-items">
        <Iconify icon="ic:round-log-out" class="mx-auto text-2xl" />
        <p>Log Out</p>
      </div>
    </div>
  </aside>

  <div
    v-if="showMobileNavbar"
    class="overlay"
    @click="showMobileNavbar = false"
  ></div>
  <div class="w-full block lg:hidden py-2 px-4 bg-cardBg shadow-lg">
    <button type="button" @click="showMobileNavbar = true">
      <Iconify icon="ic:round-menu" class="text-primaryText text-xl" />
    </button>
  </div>
</template>
