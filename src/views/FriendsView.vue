<template>
    <div class="p-2">
        <div class="row g-4">

            <!-- Main content START -->
            <div class="col-lg-8 vstack gap-4">
                <!-- My profile START -->
                <div class="card">
                    <!-- Cover image -->
                    <div class="h-200px rounded-top"
                        style="background-image:url(/src/assets/poster.jpg); background-position: center; background-size: cover; background-repeat: no-repeat;">
                        <div class="d-flex mt-3 justify-content-end me-3 ms-sm-auto">
                            <div class="dropdown">
                                <!-- Card share action menu -->
                                <button class="icon-md btn btn-success" type="button" id="profileAction2"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-three-dots"></i>
                                </button>
                                <!-- Card share action dropdown menu -->
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileAction2">
                                    <li>
                                        <RouterLink to="/profile/edit" v-if="userStore.user.id === user.id"
                                            class="dropdown-item">
                                            <i class="bi bi-pencil-square"></i>
                                            Edit profile
                                        </RouterLink>
                                    </li>
                                    <li>
                                        <button @click="logout" v-if="userStore.user.id === user.id" class="dropdown-item">
                                            <i class="bi bi-power fa-fw me-2"></i>
                                            Sign Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- Card body START -->
                    <div class="card-body py-0">
                        <div class="d-sm-flex align-items-start text-center text-sm-start">
                            <div>
                                <!-- Avatar -->
                                <div class="avatar avatar-xxl mt-n5 mb-3">
                                    <img class="avatar-img rounded-circle border border-white border-3"
                                        :src="user.get_avatar" alt="">
                                </div>
                            </div>
                            <div class="ms-sm-4 mt-sm-3">
                                <!-- Info -->
                                <h1 class="mb-0 h5">{{ user.name }} <i
                                        class="bi bi-patch-check-fill text-success small"></i>
                                </h1>
                                <p>{{ user.email }}</p>
                            </div>
                        </div>
                        <!-- List profile -->
                        <div v-if="user.id" class="hstack gap-2 gap-xl-3 justify-content-center py-3">
                            <!-- User stat item -->
                            <div>
                                <h6 class="mb-0">
                                    {{ user.posts_count }}
                                </h6>
                                <small>Post</small>
                            </div>
                            <!-- Divider -->
                            <div class="vr"></div>
                            <!-- User stat item -->
                            <div>
                                <h6 class="mb-0">{{ user.friends_count }}</h6>
                                <small>Following</small>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- My profile END -->


                <div v-if="friends.length" class="col-md-6 col-lg-12">
                    <div class="card">
                        <!-- Card header START -->
                        <div class="card-header d-sm-flex justify-content-between align-items-center border-0">
                            <h5 class="card-title">Following
                                <span class="badge bg-success bg-opacity-10 text-success">
                                    fsdfsadf
                                </span>
                            </h5>
                        </div>
                        <!-- Card header END -->

                        <div class="d-flex gap-2 mb-n3 p-3">

                            <!-- Stories -->
                            <div id="stories"
                                class="storiesWrapper stories-square stories user-icon carousel scroll-enable stories user-icon carousel snapgram ">
                                <div v-for="user in friends" v-bind:key="user.id" class="story">
                                    <div class="tns-item tns-slide-cloned tns-slide-active">
                                        <!-- Card add friend item START -->
                                        <div class="card shadow-none text-center">
                                            <!-- Card body -->
                                            <div class="card-body p-2 pb-0">
                                                <div class="avatar avatar-story avatar-xl">
                                                    <RouterLink :to="{ name: 'profile', params: { 'id': user.id } }">
                                                        <img class="avatar-img rounded-circle" :src="user.get_avatar"
                                                            alt="">
                                                    </RouterLink>
                                                </div>
                                                <p class="card-title mb-1 mt-3 text-xs">
                                                    <RouterLink :to="{ name: 'profile', params: { 'id': user.id } }">
                                                        {{ user.name }}
                                                    </RouterLink>
                                                </p>
                                            </div>
                                        </div>
                                        <!-- Card add friend item END -->
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div v-if="friendshipRequests.length" class="col-md-6 col-lg-12 mb-5">
                    <div class="card">
                        <!-- Card header START -->
                        <div class="card-header d-sm-flex justify-content-between align-items-center border-0">
                            <h5 class="card-title">Followers
                                <span class="badge bg-success bg-opacity-10 text-success">
                                    fsad
                                </span>
                            </h5>
                        </div>
                        <!-- Card header END -->

                        <div class="d-flex gap-2 mb-n3 p-3">

                            <!-- Stories -->
                            <div id="stories"
                                class="storiesWrapper stories-square stories user-icon carousel scroll-enable stories user-icon carousel snapgram ">
                                <div v-for="friendshipRequest in  friendshipRequests " v-bind:key="friendshipRequest.id"
                                    class="story">
                                    <div class="tns-item tns-slide-cloned tns-slide-active">
                                        <!-- Card add friend item START -->
                                        <div class="card shadow-none text-center">
                                            <!-- Card body -->
                                            <div class="card-body p-2 pb-0">
                                                <div class="avatar rounded-circle">
                                                    <RouterLink
                                                        :to="{ name: 'profile', params: { 'id': friendshipRequest.created_by.id } }">
                                                        <img class=" avatar rounded-circle"
                                                            :src="friendshipRequest.created_by.get_avatar" alt="">
                                                    </RouterLink>
                                                </div>
                                                <p class="text-xs mt-1">
                                                    <RouterLink
                                                        :to="{ name: 'profile', params: { 'id': friendshipRequest.created_by.id } }">
                                                        {{ friendshipRequest.created_by.name }}
                                                    </RouterLink>
                                                </p>
                                                <div class="card-footer p-2 border-0">
                                                    <button
                                                        @click="handleRequest('accepted', friendshipRequest.created_by.id)"
                                                        class="btn btn-sm btn-primary me-3">
                                                        <i class="bi bi-person-check"></i>
                                                    </button>
                                                    <button
                                                        @click="handleRequest('rejected', friendshipRequest.created_by.id)"
                                                        class="btn btn-sm btn-danger">
                                                        <i class="bi bi-person-x"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Card add friend item END -->
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <div class="col-lg-3">
                <div class="row g-4">
                    <Trends />
                    <PeopleYouMayKnow />
                </div>
            </div>

        </div> <!-- Row END -->
    </div>
    <!-- Container END -->
</template>



<script>
import axios from 'axios'
import PeopleYouMayKnow from '../components/PeopleYouMayKnow.vue'
import Trends from '../components/Trends.vue'
import FeedItem from '../components/FeedItem.vue'
import { useUserStore } from '@/stores/user'
import { RouterLink } from 'vue-router'

export default {
    name: 'FriendsView',

    setup() {
        const userStore = useUserStore()

        return {
            userStore
        }
    },

    components: {
        PeopleYouMayKnow,
        Trends,
        RouterLink
    },

    data() {
        return {
            user: {},
            friendshipRequests: [],
            friends: []
        }
    },

    mounted() {
        this.getFriends()
    },

    methods: {
        getFriends() {
            if ((localStorage.getItem('user.access'))) {
                axios
                    .get(`/api/friends/${this.$route.params.id}/`)
                    .then(response => {
                        console.log('data', response.data)

                        this.friendshipRequests = response.data.requests
                        this.friends = response.data.friends
                        this.user = response.data.user
                    })
                    .catch(error => {
                        console.log('error', error)
                    })
            }
        },

        handleRequest(status, pk) {
            if ((localStorage.getItem('user.access'))) {
                console.log('handleRequest', status)

                axios
                    .post(`/api/friends/${pk}/${status}/`)
                    .then(response => {
                        console.log('data', response.data)
                    })
                    .catch(error => {
                        console.log('error', error)
                    })
            }
        },

        logout() {
            console.log('Log out')

            this.userStore.removeToken()

            this.$router.push('/login')
        }
    }
}
</script>
