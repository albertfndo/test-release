<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const _controller = useLogin();
const userData = useUserData();

const showPassword = ref(false);
const errorMessage = reactive({
  username: "",
  password: "",
});

onMounted(() => {
  if (userData.value.token) {
    navigateTo("/");
  }

  _controller.$reset();
});

async function login() {
  if (!isValid()) return;
  await _controller.login();
}

function isValid() {
  const { username, password } = _controller.form;

  errorMessage.username = username === "" ? "Your NIK is required" : "";
  errorMessage.password = password === "" ? "Password is required" : "";

  return errorMessage.username === "" && errorMessage.password === "";
}
</script>

<template>
  <section id="login">
    <div class="login-wrapper">
      <div class="hidden lg:block">
        <h1 class="headline-3 text-primaryText leading-relaxed">
          Welcome to Bottle Keeping System
        </h1>
      </div>
      <div>
        <img
          preload
          src="/images/logo/hwg-logo.svg"
          class="mx-auto"
          width="160px"
          loading="lazy"
          quality="80"
          alt="Outlet Management Tools"
        />
        <form class="login-form" @keypress.enter="login()">
          <div class="form-group">
            <input
              v-model="_controller.form.username"
              type="text"
              placeholder="User ID"
              autofocus
            />
            <small>{{ errorMessage.username }}</small>
          </div>
          <div class="form-group">
            <input
              v-model="_controller.form.password"
              :type="showPassword ? `text` : 'password'"
              placeholder="Password"
            />

            <button type="button" @click="showPassword = !showPassword">
              <Iconify
                :icon="
                  showPassword ? `ic:outline-visibility-off` : 'ic:outline-visibility'
                "
                class="text-brand text-3xl"
              />
            </button>

            <small>{{ errorMessage.password }}</small>
          </div>

          <div class="flex justify-between items-center">
            <h2 class="bodytext-2 text-primaryText">Sign In</h2>
            <button type="button" class="btn-login" @click="login()">
              <Iconify icon="ic:outline-arrow-forward" class="text-3xl" />
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
