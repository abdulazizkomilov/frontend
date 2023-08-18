<template>
    <div class="container">
        <div class="row g-4">
            <h2 class="text-xl">Trend: #{{ $route.params.id }}</h2>
            <!-- Main content START -->
            <div class="col-md-8 col-lg-6 vstack gap-1">


                <div v-for="post in posts" v-bind:key="post.id" class="card">

                    <FeedItem v-bind:post="post" />

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
import FeedItem from '../components/FeedItem.vue'

export default {
    name: 'FeedView',

    components: {
        PeopleYouMayKnow,
        Trends,
        FeedItem
    },

    data() {
        return {
            posts: [],
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
        getFeed() {
            axios
                .get(`/api/posts/?trend=${this.$route.params.id}`)
                .then(response => {
                    console.log('data', response.data)

                    this.posts = response.data
                })
                .catch(error => {
                    console.log('error', error)
                })
        },
    }
}
</script>
