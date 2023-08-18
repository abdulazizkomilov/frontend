<template>
    <div class="container">
        <div class="col-md-12 col-lg-10 vstack gap-4">
            <!-- Create a page START -->
            <div class="card rounded-lg">
                <!-- Title START -->
                <div class="card-header border-0 pb-0">
                    <h1 class="h4 card-title mb-0">Create a post</h1>
                </div>
                <!-- Title END -->
                <!-- Create a page form START -->
                <div class="card-body">
                    <form class="row g-3" v-on:submit.prevent="submitForm" method="post">
                        <!-- Page information -->
                        <div class="col-12">
                            <label class="form-label">Post title</label>
                            <input type="text" v-model="title" class="form-control" placeholder="Title (Required)">
                            <small>Title that describes what the post is about.</small>
                        </div>

                        <div class="col-12">
                            <label class="form-label">Summary</label>
                            <input type="text" v-model="summary" class="form-control" placeholder="Summary (Required)">
                            <small>Summary that describes what the post is about.</small>
                        </div>

                        <!-- Page information -->
                        <div class="col-12">
                            <label class="form-label">About post</label>
                            <textarea class="form-control" v-model="body" rows="3"
                                placeholder="Description (Required)"></textarea>
                        </div>

                        <li class="nav-item">
                            <input type="file" ref="file" @change="onFileChange">
                        </li>

                        <!-- Button  -->
                        <div class="col-12 text-end">
                            <button type="submit" class="btn btn-primary mb-0">Create a page</button>
                        </div>
                    </form>
                </div>
                <!-- Create a page form END -->
            </div>
            <!-- Create a page END -->
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import { useToastStore } from '@/stores/toast'


export default {
    setup() {
        const toastStore = useToastStore()

        return {
            toastStore
        }
    },

    data() {
        return {
            posts: [],
            title: '',
            summary: '',
            body: '',
        }
    },

    methods: {
        submitForm() {
            if ((localStorage.getItem('user.access'))) {
                console.log('submitForm', this.title, this.summary, this.body)

                let formData = new FormData()
                formData.append('image', this.$refs.file.files[0])
                formData.append('title', this.title)
                formData.append('summary', this.summary)
                formData.append('body', this.body)

                axios
                    .post('/api/posts/create/', formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    })
                    .then(response => {
                        this.posts.unshift(response.data)
                        this.title = ''
                        this.summary = ''
                        this.body = ''
                        this.$refs.file.value = null
                        this.toastStore.showToast(5000, 'The post successfully created!', 'bg-emerald-300')

                        if (this.user) {
                            this.user.posts_count += 1
                        }

                    })
                    .catch(error => {
                        console.log('error', error)
                    })
            } else {
                this.toastStore.showToast(5000, 'Please login!', 'bg-emerald-500')
            }
        }
    }
}
</script>