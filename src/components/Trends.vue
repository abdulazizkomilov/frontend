<template>
    <div class="col-sm-6 col-lg-12">
        <div class="card">
            <!-- Card header START -->
            <div class="card-header pb-0 border-0">
                <h5 class="card-title mb-0">Trends</h5>
            </div>
            <div class="card-body">
                <div v-for="trend in trends" v-bind:key="trend.id" class="hstack gap-2 mb-3">
                    <div class="overflow-hidden">
                        <RouterLink :to="{ name: 'trendview', params: { id: trend.hashtag } }" class="h6 mb-0">
                            #{{ trend.hashtag }}
                        </RouterLink>
                        <p class="mb-0 small text-truncate">{{ trend.occurences }} posts</p>
                    </div>
                    <RouterLink :to="{ name: 'trendview', params: { id: trend.hashtag } }"
                        class="btn btn-xs btn-outline-success ms-auto">
                        Explore
                    </RouterLink>
                </div>
            </div>
            <!-- Card body END -->
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'trends',

    data() {
        return {
            trends: []
        }
    },

    mounted() {
        this.getTrends()
    },

    methods: {
        getTrends() {
            axios
                .get('/api/posts/trends/')
                .then(response => {
                    console.log(response.data)

                    this.trends = response.data
                })
                .catch(error => {
                    console.log('Error: ', error)
                })
        }
    }
}
</script>
