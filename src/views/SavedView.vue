<template>
    <div class="p-2">
        <div class="row g-4">
            <h4 class="ml-2">Saved Posts</h4>

            <div class="col-md-8 col-lg-6 vstack gap-1">

                <div class="row g-2">
                    <div v-for="post in posts" v-bind:key="post.id" class="col-sm-8 col-lg-6">
                        <FeedItem v-bind:post="post" v-on:deletePost="deletePost" />
                    </div>

                </div>

            </div>

            <div class="col-lg-3">
                <div class="row g-4">
                    <Trends />
                    <PeopleYouMayKnow />
                </div>
            </div>

        </div>
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
    name: 'SavedView',

    components: {
        PeopleYouMayKnow,
        Trends,
        FeedItem
    },

    setup() {
        const userStore = useUserStore()
        const toastStore = useToastStore()

        return {
            userStore,
            toastStore
        }
    },

    data() {
        return {
            posts: [],
            body: '',
        }
    },

    mounted() {
        this.getFeed()
    },

    methods: {
        getFeed() {
            axios
                .get(`/api/posts/saved/${this.$route.params.id}/`)
                .then(response => {
                    console.log('data', response.data)

                    this.posts = response.data
                })
                .catch(error => {
                    console.log('error', error)
                })
        },

        deletePost(id) {
            this.posts = this.posts.filter(post => post.id !== id)
        },
    }
}
</script>
