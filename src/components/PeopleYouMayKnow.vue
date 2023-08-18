<template>
    <div v-if="users.length" class="col-sm-6 col-lg-12">
        <div class="card">

            <div class="card-header pb-0 border-0">
                <h5 class="card-title mb-0">Be Friends</h5>
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
                            <RouterLink :to="{ name: 'profile', params: { id: user.id } }" class="h6 mb-0">{{ user.name }}
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
                        <button @click="message" class="btn btn-primary-soft rounded-circle icon-md ms-auto">
                            <i class="fa-solid fa-plus">
                            </i>
                        </button>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { useToastStore } from '@/stores/toast'

export default {
    data() {
        return {
            users: []
        }
    },

    setup() {
        const userStore = useUserStore()
        const toastStore = useToastStore()

        return {
            userStore,
            toastStore
        }
    },

    mounted() {
        this.getFriendSuggestions()
    },

    methods: {
        getFriendSuggestions() {
            axios
                .get('/api/all-users/')
                .then(response => {
                    console.log(response.data)

                    this.users = response.data.all_users
                })
                .catch(error => {
                    console.log('error', error)
                })
        },

        message() {
            if ((localStorage.getItem('user.access'))) {
            } else {
                this.toastStore.showToast(5000, 'Please login!', 'bg-emerald-500')
            }
        },
    }
}
</script>
