<template>
  <section id="addBottleKeepHead" class="without-topbar">
    <div class="flex items-center gap-4">
      <button
        type="button"
        class="btn-regular-nav"
        data-hbid="gl-tt-back"
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

  <section id="addBottleKeepBody" class="page-body">
    <div class="menu-bar">
      <form class="form-guest" @submit.prevent="">
        <div class="form-group">
          <input
            type="text"
            placeholder="Enter name / phone number"
            data-hbid="gl-tt-name"
          />
          <div class="devider hidden md:block"></div>
          <button
            type="button"
            class="add-guest"
            data-hbid="gl-tt-addnew-button"
            @click="navigateTo('/bottle-keeping/add/form')"
          >
            <div class="hidden lg:flex justify-center items-center gap-2">
              <Iconify icon="mdi:plus-circle" />
              <p>Add New</p>
            </div>
            <p class="block lg:hidden">
              <Iconify icon="mdi:plus-circle" class="mx-auto" />
            </p>
          </button>
        </div>
      </form>
    </div>

    <div class="mt-10">
      <div
        v-if="true"
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        <div class="guest-card">
          <div>
            <div class="guest-name bg-brand">
              <p>asd</p>
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
        </div>
        <div class="guest-card">
          <div>
            <div class="guest-name bg-brand">
              <p>asd</p>
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
        </div>
        <div class="guest-card">
          <div>
            <div class="guest-name bg-brand">
              <p>asd</p>
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
        </div>
        <div class="guest-card">
          <div>
            <div class="guest-name bg-brand">
              <p>asd</p>
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
        </div>
      </div>

      <div v-else class="text-center">
        <NuxtImg
          preload
          src="/images/icon-not-found.svg"
          class="mx-auto"
          width="160px"
          loading="lazy"
          quality="80"
          alt="No Data"
        />
        <h4 class="mt-2 text-primaryText subtitle-1-r">No Data</h4>
      </div>
    </div>
  </section>
</template>
