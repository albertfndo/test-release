<script setup lang="ts">
const route = useRoute();
const _guest = useGuest();
const _bottle = useBottleKeeping();
const guestData = guestStorage();
const selectedBottle = selectedBottleData();
const useMember = ref(false);
const openMediaType = ref(false);
const openCameraModal = ref(false);
const openUploadFile = ref(false);
const displayedPhoto = ref("");

const characterCount = computed(() => {
  return _bottle.form.description.length + "/200";
});

onMounted(async () => {
  _guest.$reset();
  await fetchGuest();
  await fetchBottleData();
});

watch(
  () => _bottle.form.description,
  (newValue) => {
    if (newValue.length > 200) {
      _bottle.form.description = newValue.slice(0, 200);
    }
  }
);

onBeforeRouteLeave(() => {
  guestData.value = null;
  selectedBottle.value = null;
});

function fetchGuest() {
  if (route.query.use_member === "true") {
    useMember.value = true;
    return guestData.value;
  }
}

function fetchBottleData() {
  if (selectedBottle.value) {
    _bottle.selectedBottle = selectedBottle.value;
    _bottle.form.bottleName = selectedBottle.value.bottleName;
    _bottle.form.userFullname = selectedBottle.value.userFullName;
    _bottle.form.phoneNumber = selectedBottle.value.phoneNumber;
  }
}

let stream: MediaStream;
const cameraFeed = ref();

function openCamera() {
  openCameraModal.value = true;

  if (_bottle.form.imageUrl) {
    _bottle.form.imageUrl = "";
  }

  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then((content) => {
      stream = content;
      cameraFeed.value.srcObject = stream as MediaStream;
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
  context!.drawImage(cameraFeed.value, 0, 0, canvas.width, canvas.height);

  const photoDataURL = canvas.toDataURL("image/webp");
  displayedPhoto.value = photoDataURL;
  processDataUrl(photoDataURL);

  closeCameraModal();
}

function closeCameraModal() {
  if (stream) {
    stream.getVideoTracks()[0].stop();
  }
  openCameraModal.value = false;
}

function processDataUrl(dataUrl: any) {
  const blobBin = atob(dataUrl.split(",")[1]);
  const array = [];
  for (let i = 0; i < blobBin.length; i++) {
    array.push(blobBin.charCodeAt(i));
  }
  const file = new Blob([new Uint8Array(array)], { type: "image/webp" });
  _bottle.form.imageUrl = file;
}

function formatPhoneNumber(event: any) {
  _bottle.form.phoneNumber = event.target?.value.replace(/[^0-9]/g, "");
}

function setFile(e: any) {
  const files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;

  displayedPhoto.value = URL.createObjectURL(files[0]);
  _bottle.form.imageUrl = files[0];

  openUploadFile.value = false;
}

function submitData() {
  if (selectedBottle.value.bottleName) {
    _bottle.rekeepBottleData();
    return;
  }

  _bottle.submitBottleData(useMember.value);
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
      <h1 class="subtitle-2 text-primaryText">
        {{
          selectedBottle.bottleName
            ? "Rekeep Bottle " + selectedBottle.bottleName
            : "Add Bottle Keeping"
        }}
      </h1>
    </div>
  </section>

  <section id="addNewDataBody" class="page-body flex w-full justify-center">
    <div class="w-3/4">
      <form class="form-new-guest" @submit.prevent="">
        <template v-if="!useMember">
          <div class="form-group">
            <label for="new-guest-name"
              >Nama Tamu <span class="asterisk"></span
            ></label>
            <input
              id="new-guest-name"
              v-model="_bottle.form.userFullname"
              type="text"
              placeholder="Ketik disini..."
              :disabled="selectedBottle.bottleName ? true : false"
              autofocus
            />
          </div>
          <div class="form-group">
            <label for="new-guest-phone"
              >No Telepon <span class="asterisk"></span
            ></label>
            <input
              id="new-guest-phone"
              v-model="_bottle.form.phoneNumber"
              type="text"
              placeholder="Ex. 6287896395385"
              :disabled="selectedBottle.bottleName ? true : false"
              @input="formatPhoneNumber($event)"
            />
          </div>
        </template>
        <template v-else>
          <div class="guest-card mb-3">
            <div class="guest-name bg-brand">
              <p>{{ fetchGuest()?.name ?? selectedBottle.customer?.name }}</p>
            </div>
            <div class="guest-data">
              <div class="grid grid-cols-2 gap-y-5">
                <div class="guest-detail">
                  <Iconify icon="ic:baseline-person-outline" class="text-xl" />
                  <p>
                    {{
                      fetchGuest()?.membershipTypeText ??
                      selectedBottle.customer?.membershipTypeText
                    }}
                  </p>
                </div>
                <div class="guest-detail">
                  <Iconify
                    icon="ic:outline-workspace-premium"
                    class="text-xl"
                  />
                  <p>
                    {{
                      fetchGuest()?.typeText ??
                      selectedBottle.customer?.typeText
                    }}
                  </p>
                </div>
                <div class="guest-detail">
                  <Iconify icon="ic:outline-phone" class="text-xl" />
                  <p>
                    +{{ fetchGuest()?.phone ?? selectedBottle.customer?.phone }}
                  </p>
                </div>
                <div class="guest-detail">
                  <Iconify icon="ic:round-people-outline" class="text-xl" />
                  <p>
                    {{
                      fetchGuest()?.genderText ??
                      selectedBottle.customer?.genderText
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </template>

        <div class="form-group">
          <label for="bottleName"
            >Nama Botol <span class="asterisk"></span
          ></label>
          <input
            id="bottleName"
            v-model="_bottle.form.bottleName"
            type="text"
            placeholder="Ketik disini..."
            :disabled="selectedBottle.bottleName ? true : false"
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-group w-full">
            <label for="gram">Gram (Gr)</label>
            <input
              id="gram"
              v-model="_bottle.form.gram"
              type="number"
              placeholder="Ketik disini..."
              :disabled="selectedBottle.bottleName ? true : false"
            />
          </div>
          <div class="form-group w-full">
            <label for="miliLiter">Mili Liter (Ml)</label>
            <input
              id="miliLiter"
              v-model="_bottle.form.miliLiter"
              type="number"
              placeholder="Ketik disini..."
              :disabled="selectedBottle.bottleName ? true : false"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="description"
            >Catatan <span class="asterisk"></span
          ></label>
          <textarea
            v-model="_bottle.form.description"
            rows="5"
            placeholder="Ketik disini..."
          ></textarea>
          <p class="text-primaryText text-end">{{ characterCount }}</p>
        </div>
        <div class="form-group">
          <label for="description"
            >Foto Botol <span class="asterisk"></span
          ></label>
          <div
            v-if="!_bottle.form.imageUrl"
            class="input-photo"
            @click="openMediaType = true"
          >
            <div class="items">
              <Iconify icon="mdi:plus-circle" class="text-4xl mx-auto" />
              <p>Tambah Foto</p>
            </div>
          </div>
          <div v-else class="input-photo">
            <NuxtImg
              preload
              :src="displayedPhoto"
              class="rounded-xl"
              alt="Captured Photo"
              quality="100"
              loading="lazy"
              :placeholder="[50, 25, 75]"
              @click="openMediaType = true"
            />
          </div>
        </div>
        <div class="flex gap-1 text-primaryText">
          <input
            id="unlimitedExpired"
            v-model="_bottle.form.unlimitedExpired"
            type="checkbox"
          />
          <label for="unlimitedExpired" class="font-poppins-m"
            >Unlimited Expired
          </label>
          <p class="font-poppins-r">(Opsional)</p>
        </div>
        <div class="mt-10">
          <div class="grid grid-cols-2 gap-4">
            <button
              type="button"
              class="btn-full disabled"
              @click="navigateTo('/bottle-keeping')"
            >
              Batal
            </button>
            <button type="button" class="btn-full active" @click="submitData()">
              Simpan
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>

  <Modal
    v-show="openMediaType"
    :open-global-modal="openMediaType"
    :form-mode="false"
    :use-button="false"
    @close="openMediaType = false"
  >
    <h2 class="text-center">Pilih Media</h2>
    <div class="grid grid-cols-2 gap-4">
      <div
        class="media-type-button"
        @click="
          openMediaType = false;
          openUploadFile = true;
        "
      >
        <Iconify icon="material-symbols:upload-file" class="type-icon" />
        <p>Upload Gambar</p>
      </div>
      <div
        class="media-type-button"
        @click="
          openMediaType = false;
          openCamera();
        "
      >
        <Iconify icon="material-symbols:photo-camera" class="type-icon" />
        <p>Buka Kamera</p>
      </div>
    </div>
  </Modal>

  <Modal
    v-show="openUploadFile"
    :open-global-modal="openUploadFile"
    :form-mode="false"
    :use-button="false"
    @close="openUploadFile = false"
  >
    <h2 class="text-center">Upload Gambar</h2>
    <div class="form-group">
      <input type="file" @change="setFile($event)" />
    </div>
  </Modal>

  <Modal
    v-show="openCameraModal"
    :open-global-modal="openCameraModal"
    :form-mode="false"
    :use-button="false"
    @close="closeCameraModal()"
  >
    <div class="relative w-full">
      <video ref="cameraFeed" class="w-full rounded-lg" autoplay></video>
      <button class="video" @click="capture">
        <Iconify icon="ic:round-camera-alt" class="text-2xl" />
      </button>
    </div>
  </Modal>
</template>
