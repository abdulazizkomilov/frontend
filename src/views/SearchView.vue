<template>
    <div class="container">
        <div class="row g-4">
            <div class="w-full">
                <form v-on:submit.prevent="submitForm" class="subnav-search d-flex flex-nowrap ms-auto">
                    <label for="search" class="visually-hidden">Search</label>
                    <input v-model="query" type="search" class="form-control search mb-0 me-2" id="search"
                        placeholder="Search posts or accounts..." autocomplete="off">
                    <button class="inline-block py-2 px-3 bg-purple-900 text-white rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                        </svg>
                    </button>
                </form>
            </div>

            <h2 class="text-xl">Search: {{ query }}</h2>
            <!-- Main content START -->
            <div class="col-md-8 col-lg-6 vstack gap-1">


                <div v-for="post in posts" v-bind:key="post.id" class="card">

                    <FeedItem v-bind:post="post" />

                </div>

            </div>
            <!-- Main content END -->

            <!-- Right sidebar START -->
            <div class="col-lg-3">
                <div class="row g-4">
                    <div class="col-sm-6 col-lg-12">
                        <div class="card">

                            <div class="card-header pb-0 border-0">
                                <h5 class="card-title mb-4">Users</h5>
                            </div>
                            <div v-for="user in users" v-bind:key="user.id" class="card-body">
                                <div class="hstack gap-1">
                                    <!-- Avatar -->
                                    <div class="avatar">
                                        <img class="avatar-img rounded-circle" :src="user.get_avatar" alt="">
                                    </div>
                                    <template v-if="userStore.user.isAuthenticated">
                                        <!-- Title -->
                                        <div class="overflow-hidden">
                                            <RouterLink :to="{ name: 'profile', params: { id: user.id } }" class="h6 mb-0">
                                                {{ user.name }}
                                            </RouterLink>
                                        </div>
                                        <!-- Button -->
                                        <RouterLink :to="{ name: 'profile', params: { id: user.id } }"
                                            class="btn btn-primary-soft rounded-circle icon-md ms-auto">
                                            <i class="fa-solid fa-plus">
                                            </i>
                                        </RouterLink>
                                    </template>
                                    <template v-else>
                                        <!-- Title -->
                                        <div class="overflow-hidden">
                                            <button @click="message" class="h6 mb-0">{{ user.name }}
                                            </button>
                                        </div>
                                        <!-- Button -->
                                        <button @click="message"
                                            class="btn btn-primary-soft rounded-circle icon-md ms-auto">
                                            <i class="fa-solid fa-plus">
                                            </i>
                                        </button>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <!-- Right sidebar END -->

        </div> <!-- Row END -->
    </div>
</template>


<script>
import axios from 'axios'
import PeopleYouMayKnow from '../components/PeopleYouMayKnow.vue'
import Trends from '../components/Trends.vue'
import { useUserStore } from '@/stores/user'
import FeedItem from '../components/FeedItem.vue'
import { useToastStore } from '@/stores/toast'

export default {
    name: 'SearchView',

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
        FeedItem
    },

    data() {
        return {
            query: '',
            users: [],
            posts: []
        }
    },

    methods: {
        submitForm() {
            console.log('submitForm', this.query)

            axios
                .post('/api/search/', {
                    query: this.query
                })
                .then(response => {
                    console.log('response:', response.data)

                    this.users = response.data.users
                    this.posts = response.data.posts
                })
                .catch(error => {
                    console.log('error:', error)
                })
        }
    }
}
</script>