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
        <template v-if="false">
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
              <p>Rendhy Widjaja</p>
            </div>
            <div class="guest-data">
              <div class="grid grid-cols-2 gap-y-5">
                <div class="guest-detail">
                  <Iconify icon="ic:baseline-person-outline" class="text-xl" />
                  <p>Basic</p>
                </div>
                <div class="guest-detail">
                  <Iconify
                    icon="ic:outline-workspace-premium"
                    class="text-xl"
                  />
                  <p>Regular</p>
                </div>
                <div class="guest-detail">
                  <Iconify icon="ic:outline-phone" class="text-xl" />
                  <p>+6282115831114</p>
                </div>
                <div class="guest-detail">
                  <Iconify icon="ic:round-people-outline" class="text-xl" />
                  <p>Male</p>
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
          <div class="input-photo">
            <div class="items">
              <Iconify icon="mdi:plus-circle" class="text-4xl mx-auto" />
              <p>Add Photo</p>
            </div>
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
</template>
