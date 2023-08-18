<template>
  <header class="navbar-light fixed-top header-static bg-mode">
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <RouterLink :to="{ name: 'home' }" class="navbar-brand">
          <img class="rounded-lg navbar-brand-item" src="/src/assets/logo.png" alt="">
        </RouterLink>
        <template v-if="userStore.user.isAuthenticated && userStore.user.id">
          <ul class="nav flex-nowrap align-items-center ms-sm-3 list-unstyled">
            <li class="nav-item ms-2">
              <RouterLink :to="{ name: 'search' }" class="nav-link icon-md btn btn-light p-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                </svg>
              </RouterLink>
            </li>
            <li class="nav-item dropdown ms-2">
              <a class="nav-link icon-md btn btn-light p-0" href="#" id="notifDropdown" role="button"
                data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                <span class="badge-notif animation-blink"></span>
                <i class="bi bi-bell-fill fs-6"> </i>
              </a>
              <div class="dropdown-menu dropdown-animation dropdown-menu-end dropdown-menu-size-md p-0 shadow-lg border-0"
                aria-labelledby="notifDropdown">
                <div class="card">
                  <div class="card-header d-flex justify-content-between align-items-center">
                    <h6 class="m-0">Notifications <span class="badge bg-success">{{ notifications.length }}</span>
                    </h6>
                  </div>
                  <div class="card-body p-0">
                    <ul class="list-group list-group-flush list-unstyled p-2">
                      <!-- Notif item -->
                      <li v-for="notification in notifications" v-bind:key="notification.id">
                        <div class="list-group-item list-group-item-action rounded badge-unread d-flex border-0 mb-1">
                          <div class="ms-sm-3">
                            <div class=" d-flex">
                              <p class="text-ls mb-2">{{ notification.body }} </p>
                            </div>
                            <div class="d-flex">
                              <p class="badge bg-success bg-opacity-10 text-success">
                                <span style="cursor: pointer;" @click="readNotification(notification)">Read More</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item ms-2 dropdown">
              <a class="nav-link btn icon-md p-0" id="profileDropdown" role="button" data-bs-auto-close="outside"
                data-bs-display="static" data-bs-toggle="dropdown" aria-expanded="false">
                <img class="avatar-img rounded-2" :src="userStore.user.avatar" alt="">
              </a>
              <ul class="dropdown-menu dropdown-animation dropdown-menu-end pt-3 small me-md-n3"
                aria-labelledby="profileDropdown">
                <!-- Profile info -->
                <li class="px-3">
                  <div class="d-flex align-items-center position-relative">
                    <!-- Avatar -->
                    <div class="avatar me-3">
                      <img class="avatar-img rounded-circle" :src="userStore.user.avatar" alt="avatar">
                    </div>
                    <div>
                      <RouterLink :to="{ name: 'profile', params: { 'id': userStore.user.id } }"
                        class="h6 stretched-link">
                        {{ userStore.user.name }}</RouterLink>
                      <p class="small m-0">{{ userStore.user.email }}</p>
                    </div>
                  </div>
                  <RouterLink :to="{ name: 'profile', params: { 'id': userStore.user.id } }"
                    class="dropdown-item btn btn-primary-soft btn-sm my-2 text-center">View
                    profile</RouterLink>
                </li>
                <!-- Links -->
                <li>
                  <RouterLink style="cursor: pointer;" to="/profile/edit" class="dropdown-item">
                    <i class="bi bi-gear fa-fw me-2"></i>Settings &amp; Privacy
                  </RouterLink>
                </li>
                <li>
                  <RouterLink :to="{ name: 'create' }" class="dropdown-item">
                    <i class="fa-fw bi bi-card-text me-2"></i>Create post
                  </RouterLink>
                </li>
                <li>
                  <RouterLink :to="{ name: 'saved', params: { 'id': userStore.user.id } }" class="dropdown-item">
                    <i class="bi bi-bookmark fa-fw me-2"></i>Saved Posts
                  </RouterLink>
                </li>
                <li>
                  <button class="dropdown-item" @click="this.userStore.removeToken()">
                    <i class="bi bi-power fa-fw me-2"></i> Logout</button>
                </li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <!-- Dark mode options START -->
                <li>
                  <div
                    class="modeswitch-item theme-icon-active d-flex justify-content-center gap-3 align-items-center p-2 pb-0">
                    <span>Mode:</span>
                    <button type="button" class="btn btn-modeswitch nav-link text-primary-hover mb-0 active"
                      data-bs-theme-value="light" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Light">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-sun fa-fw mode-switch" viewBox="0 0 16 16">
                        <path
                          d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z">
                        </path>
                        <use href="#"></use>
                      </svg>
                    </button>
                    <button type="button" class="btn btn-modeswitch nav-link text-primary-hover mb-0"
                      data-bs-theme-value="dark" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Dark">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-moon-stars fa-fw mode-switch" viewBox="0 0 16 16">
                        <path
                          d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z">
                        </path>
                        <path
                          d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z">
                        </path>
                        <use href="#"></use>
                      </svg>
                    </button>
                    <button type="button" class="btn btn-modeswitch nav-link text-primary-hover mb-0"
                      data-bs-theme-value="auto" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-circle-half fa-fw mode-switch" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"></path>
                        <use href="#"></use>
                      </svg>
                    </button>
                  </div>
                </li>
                <!-- Dark mode options END-->
              </ul>
            </li>
          </ul>
        </template>
        <template v-else>
          <ul class="nav flex-nowrap align-items-center ms-sm-3 list-unstyled">
            <li class="nav-item ms-2 dropdown">
              <a class="nav-link btn icon-md p-0" href="#" id="profileDropdown" role="button" data-bs-auto-close="outside"
                data-bs-display="static" data-bs-toggle="dropdown" aria-expanded="false">
                <img class="avatar-img rounded-2" src="/src/assets/placeholder.jpg" alt="">
              </a>
              <ul class="dropdown-menu dropdown-animation dropdown-menu-end pt-3 small me-md-n3"
                aria-labelledby="profileDropdown">
                <li>
                  <RouterLink :to="{ name: 'login' }" class="dropdown-item" href="settings.html">
                    <i class="bi bi-person-fill-check"></i>
                    Login
                  </RouterLink>
                </li>
                <li class="dropdown-divider"></li>
                <li>
                  <RouterLink :to="{ name: 'signup' }" class="dropdown-item bg-danger-soft-hover"
                    href="sign-in-advance.html">
                    <i class="bi bi-person-add"></i>
                    Sign Up
                  </RouterLink>
                </li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <!-- Dark mode options START -->
                <li>
                  <div
                    class="modeswitch-item theme-icon-active d-flex justify-content-center gap-3 align-items-center p-2 pb-0">
                    <span>Mode:</span>
                    <button type="button" class="btn btn-modeswitch nav-link text-primary-hover mb-0 active"
                      data-bs-theme-value="light" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Light">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-sun fa-fw mode-switch" viewBox="0 0 16 16">
                        <path
                          d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z">
                        </path>
                        <use href="#"></use>
                      </svg>
                    </button>
                    <button type="button" class="btn btn-modeswitch nav-link text-primary-hover mb-0"
                      data-bs-theme-value="dark" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Dark">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-moon-stars fa-fw mode-switch" viewBox="0 0 16 16">
                        <path
                          d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z">
                        </path>
                        <path
                          d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z">
                        </path>
                        <use href="#"></use>
                      </svg>
                    </button>
                    <button type="button" class="btn btn-modeswitch nav-link text-primary-hover mb-0"
                      data-bs-theme-value="auto" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-circle-half fa-fw mode-switch" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"></path>
                        <use href="#"></use>
                      </svg>
                    </button>
                  </div>
                </li>
                <!-- Dark mode options END-->
              </ul>
            </li>
            <!-- Profile START -->

          </ul>
        </template>
      </div>
    </nav>
  </header>
  <main>

    <Toast />
    <!-- Container START -->
    <RouterView />
    <!-- Container END -->
    <footer class="bg-mode py-3 mt-3">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <!-- Footer nav START -->
            <ul class="nav justify-content-center justify-content-md-start lh-1">
              <li class="nav-item">
                <RouterLink style="cursor: pointer;" to="/about" class="nav-link">
                  About
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink style="cursor: pointer;" to="/profile/edit" class="nav-link">
                  Privacy &amp; terms
                </RouterLink>
              </li>
            </ul>
            <!-- Footer nav START -->
          </div>
          <div class="col-md-6">
            <!-- Copyright START -->
            <p class="text-center text-md-end mb-0">©2023 Abdulaziz Komilov All rights reserved.</p>
            <!-- Copyright END -->
          </div>
        </div>
      </div>
    </footer>

  </main>
  <div class="">
    <a class="icon-md btn btn-primary position-fixed end-0 bottom-0 me-5 mb-5" data-bs-toggle="offcanvas"
      href="#offcanvasChat" role="button" aria-controls="offcanvasChat">
      <i class="bi bi-grid-1x2-fill"></i>
    </a>
    <div class="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasChat">
      <div class="offcanvas-header d-flex justify-content-between">
        <h5 class="offcanvas-title">News</h5>
        <div class="d-flex">
          <a href="#" class="btn btn-secondary-soft-hover py-1 px-2" data-bs-dismiss="offcanvas" aria-label="Close">
            <i class="fa-solid fa-xmark"></i>
          </a>

        </div>
      </div>
      <div
        class="offcanvas-body pt-0 custom-scrollbar os-host os-theme-dark os-host-resize-disabled os-host-scrollbar-horizontal-hidden os-host-transition os-host-overflow os-host-overflow-y">
        <div class="os-resize-observer-host observed">
          <div class="os-resize-observer" style="left: 0px; right: auto;"></div>
        </div>
        <div class="os-size-auto-observer observed" style="height: calc(100% + 1px); float: left;">
          <div class="os-resize-observer"></div>
        </div>
        <div class="os-content-glue" style="margin: 0px -24px -16px;"></div>
        <div class="os-padding">
          <div class="os-viewport os-viewport-native-scrollbars-invisible" style="overflow-y: scroll;">
            <div class="os-content" style="padding: 0px 24px 16px; height: 100%; width: 100%;">

              <div class="col-lg-12">
                <div class="row g-4">
                  <Trends />
                  <PeopleYouMayKnow />
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden">
          <div class="os-scrollbar-track os-scrollbar-track-off">
            <div class="os-scrollbar-handle" style="transform: translate(0px, 0px); width: 100%;"></div>
          </div>
        </div>
        <div class="os-scrollbar os-scrollbar-vertical os-scrollbar-auto-hidden">
          <div class="os-scrollbar-track os-scrollbar-track-off">
            <div class="os-scrollbar-handle" style="transform: translate(0px, 0px); height: 37.798%;"></div>
          </div>
        </div>
        <div class="os-scrollbar-corner"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import PeopleYouMayKnow from './components/PeopleYouMayKnow.vue'
import Trends from './components/Trends.vue'
import Toast from '@/components/Toast.vue'
import { useUserStore } from '@/stores/user'
import { RouterLink } from 'vue-router'

export default {
  setup() {
    const userStore = useUserStore()

    return {
      userStore
    }
  },

  components: {
    PeopleYouMayKnow,
    Trends,
    Toast,
    RouterLink
  },

  data() {
    return {
      notifications: []
    }
  },

  mounted() {
    this.getNotifications()
  },

  beforeCreate() {
    this.userStore.initStore()

    const token = this.userStore.user.access

    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },

  methods: {
    getNotifications() {
      if ((localStorage.getItem('user.access'))) {
        axios
          .get('/api/notifications/')
          .then(response => {
            console.log(response.data)

            this.notifications = response.data
          })
          .catch(error => {
            console.log('Error: ', error)
          })
      }
    },

    async readNotification(notification) {
      console.log('readNotification', notification.id)

      await axios
        .post(`/api/notifications/read/${notification.id}/`)
        .then(response => {
          console.log(response.data)

          if (notification.type_of_notification == 'post_like' || notification.type_of_notification == 'post_comment') {
            this.$router.push({ name: 'postview', params: { id: notification.post_id } })
          } else {
            this.$router.push({ name: 'friends', params: { id: notification.created_for_id } })
          }
        })
        .catch(error => {
          console.log('Error: ', error)
        })
    }
  }

}
</script>