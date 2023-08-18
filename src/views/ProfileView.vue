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
                        <!-- Button -->
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
                                <small>Posts</small>
                            </div>
                            <div class="vr"></div>
                            <!-- User stat item -->
                            <div>
                                <RouterLink :to="{ name: 'friends', params: { id: user.id } }" class="text-success">
                                    <h6 class="mb-0">
                                        {{ user.friends_count }}</h6>
                                    <small>Following</small>
                                </RouterLink>
                            </div>
                            <div>
                                <button @click="sendFriendshipRequest"
                                    v-if="userStore.user.id !== user.id && can_send_friendship_request"
                                    class="badge bg-success">
                                    Follow
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- My profile END -->


                <div class="row g-2">
                    <!-- Main content START -->
                    <div v-for="post in posts" v-bind:key="post.id" class="col-sm-8 col-lg-6">
                        <FeedItem v-bind:post="post" />
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
import { useToastStore } from '@/stores/toast'

export default {
    name: 'FeedView',

    setup() {
        const userStore = useUserStore()
        const toastStore = useToastStore()

        return {
            userStore,
            toastStore
        }
    },

    components: {
        PeopleYouMayKnow,
        Trends,
        FeedItem,
    },

    data() {
        return {
            posts: [],
            user: {
                id: ''
            },
            can_send_friendship_request: null,
        }
    },

    mounted() {
        this.getFeed()
    },

    watch: {
        '$route.params.id': {
            handler: function () {
                this.getFeed()
            },
            deep: true,
            immediate: true
        }
    },

    methods: {
        deletePost(id) {
            this.posts = this.posts.filter(post => post.id !== id)
        },

        sendFriendshipRequest() {
            if ((localStorage.getItem('user.access'))) {
                axios
                    .post(`/api/friends/${this.$route.params.id}/request/`)
                    .then(response => {
                        console.log('data', response.data)

                        this.can_send_friendship_request = false

                        if (response.data.message == 'request already sent') {
                            this.toastStore.showToast(5000, 'The request has already been sent!', 'bg-red-300')
                        } else {
                            this.toastStore.showToast(5000, 'The request was sent!', 'bg-emerald-300')
                        }
                    })
                    .catch(error => {
                        console.log('error', error)
                    })
            } else {
                this.toastStore.showToast(5000, 'Please login!', 'bg-emerald-500')
            }
        },

        getFeed() {
            if ((localStorage.getItem('user.access'))) {
                axios
                    .get(`/api/posts/profile/${this.$route.params.id}/`)
                    .then(response => {
                        console.log('data', response.data)

                        this.posts = response.data.posts
                        this.user = response.data.user
                        this.can_send_friendship_request = response.data.can_send_friendship_request
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
