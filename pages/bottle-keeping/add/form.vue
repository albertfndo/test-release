<script setup lang="ts">
const route = useRoute();
const _guest = useGuest();
const _bottle = useBottleKeeping();
const guestData = guestStorage();
const useMember = ref(false);
const openCameraModal = ref(false);

onMounted(async () => {
  _guest.$reset();
  await fetchGuest();
});

onBeforeRouteLeave(() => {
  guestData.value = null;
});

function fetchGuest() {
  if (route.query.use_member === "true") {
    useMember.value = true;
    return guestData.value;
  }
}

let stream;
const cameraFeed = ref(null);

function openCamera() {
  openCameraModal.value = true;

  if (_bottle.form.image_url) {
    _bottle.form.image_url = "";
  }

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((s) => {
      stream = s;
      cameraFeed.value.srcObject = stream;
    })
    .catch((error) => {
      console.error("Error accessing the camera:", error);
    });
}

function capture() {
  const canvas = document.createElement("canvas");
  canvas.width = cameraFeed.value.videoWidth;
  canvas.height = cameraFeed.value.videoHeight;
  const context = canvas.getContext("2d");
  context.drawImage(cameraFeed.value, 0, 0, canvas.width, canvas.height);

  const photoDataURL = canvas.toDataURL("image/webp");
  _bottle.form.image_url = photoDataURL;
  openCameraModal.value = false;
}
</script>

<template>
  <section id="addNewDataHead" class="without-topbar">
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
      <h1 class="subtitle-2 text-primaryText">Add Bottle Keeping</h1>
    </div>
  </section>

  <section id="addNewDataBody" class="page-body flex w-full justify-center">
    <div class="w-3/4">
      <form class="form-new-guest">
        <template v-if="!useMember">
          <div class="form-group">
            <label for="new-guest-name"
              >Guest's Name <span class="asterisk"></span
            ></label>
            <input
              id="new-guest-name"
              type="text"
              placeholder="Type here..."
              autofocus
            />
          </div>
          <div class="form-group">
            <label for="new-guest-phone"
              >Phone Number <span class="asterisk"></span
            ></label>
            <input
              id="new-guest-phone"
              type="text"
              placeholder="Ex. 6287896395385"
            />
          </div>
        </template>
        <template v-else>
          <div class="guest-card mb-3">
            <div class="guest-name bg-brand">
              <p>{{ fetchGuest()?.name }}</p>
            </div>
            <div class="guest-data">
              <div class="grid grid-cols-2 gap-y-5">
                <div class="guest-detail">
                  <Iconify icon="ic:baseline-person-outline" class="text-xl" />
                  <p>{{ fetchGuest()?.membershipTypeText }}</p>
                </div>
                <div class="guest-detail">
                  <Iconify
                    icon="ic:outline-workspace-premium"
                    class="text-xl"
                  />
                  <p>{{ fetchGuest()?.typeText }}</p>
                </div>
                <div class="guest-detail">
                  <Iconify icon="ic:outline-phone" class="text-xl" />
                  <p>+{{ fetchGuest()?.phone }}</p>
                </div>
                <div class="guest-detail">
                  <Iconify icon="ic:round-people-outline" class="text-xl" />
                  <p>{{ fetchGuest()?.genderText }}</p>
                </div>
              </div>
            </div>
          </div>
        </template>

        <div class="form-group">
          <label for="new-guest-pax1"
            >Bottle Name <span class="asterisk"></span
          ></label>
          <input
            id="new-guest-pax1"
            type="text"
            placeholder="Type here..."
            data-hbid="gl-tt-incoming-pax"
          />
        </div>
        <div class="form-group">
          <label for="new-guest-pax2"
            >Notes <span class="asterisk"></span
          ></label>
          <textarea rows="5" placeholder="Type here..."></textarea>
        </div>
        <div class="form-group">
          <label for="new-guest-pax2"
            >Photo <span class="asterisk"></span
          ></label>
          <div
            v-if="!_bottle.form.image_url"
            class="input-photo"
            @click="openCamera"
          >
            <div class="items">
              <Iconify icon="mdi:plus-circle" class="text-4xl mx-auto" />
              <p>Add Photo</p>
            </div>
          </div>
          <div v-else class="input-photo">
            <img
              :src="_bottle.form.image_url"
              class="rounded-xl"
              alt="Captured Photo"
              @click="openCamera"
            />
          </div>
        </div>
        <div class="mt-10">
          <div class="grid grid-cols-2 gap-4">
            <button
              type="button"
              class="btn-full disabled"
              data-hbid="gl-tt-cancel"
              @click="navigateTo('/bottle-keeping')"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn-full active"
              data-hbid="gl-tt-save"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>

  <Modal
    v-show="openCameraModal"
    :open-global-modal="openCameraModal"
    :form-mode="false"
    :use-button="false"
    @close="openCameraModal = false"
  >
    <div class="relative w-full">
      <video ref="cameraFeed" class="w-full rounded-lg" autoplay></video>
      <button class="video" @click="capture">
        <Iconify icon="ic:round-camera-alt" class="text-2xl" />
      </button>
    </div>
  </Modal>
</template>
