<template>
    <div class="container p-2">
        <div class="row g-4">
            <!-- Main content START -->
            <div class="col-lg-8 mx-auto">
                <div class="vstack gap-4">
                    <!-- Blog single START -->
                    <div class="card card-body">
                        <template v-if="post.attachments">
                            <img class="rounded" v-for="image in post.attachments" v-bind:key="image.id"
                                :src="image.get_image" alt="">
                        </template>
                        <div class="mt-4">
                            <h1 class="mb-2 h6">{{ post.title }}</h1>
                            <ul class="nav nav-stack gap-3 align-items-center">
                                <li class="nav-item"> <i class="bi bi-calendar-date pe-1"></i>
                                    {{ post.created_at_formatted }}
                                </li>
                                <li class="nav-item">
                                    <button @click="likePost(post.id)" class="nav-link" style="cursor: pointer;">
                                        <i class="bi bi-hand-thumbs-up-fill pe-1"></i> {{ post.likes_count }} likes</button>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link"> <i class="bi bi-chat-fill pe-1"></i>
                                        Comments {{ post.comments_count }}</a>
                                </li>
                                <li class="nav-item dropdown ms-sm-auto">
                                    <a class="nav-link mb-0" href="#" id="cardShareAction" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <i class="bi bi-reply-fill flip-horizontal ps-1"></i>Share (3)
                                    </a>
                                    <!-- Card share action dropdown menu -->
                                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="cardShareAction">
                                        <li><button @click="reportPost" class="dropdown-item">
                                                <i class="bi bi-flag fa-fw pe-2"></i> Report post
                                            </button></li>
                                    </ul>
                                </li>
                            </ul>
                            <!-- description -->
                            <p class="mt-4">
                                {{ post.summary }}
                            </p>
                            <h4 class="mt-4">
                                <hr>
                            </h4>
                            <!-- Row START -->
                            <div class="row mb-4 bg-light rounded p-3 p-sm-4 my-4">
                                <p class="mb-0">
                                    {{ post.body }}
                                </p>

                            </div>
                            <template v-if="userStore.user.isAuthenticated">
                                <div>
                                    <hr>
                                    <h6 class="text-ls">Add a comment ...</h6>
                                    <hr>
                                </div>
                                <div class="d-flex p-2">
                                    <div class="avatar avatar-xs me-2">
                                        <img class="avatar-img rounded-circle" :src="userStore.user.avatar" alt="">
                                    </div>
                                    <form v-on:submit.prevent="submitForm" method="post"
                                        class="nav nav-item w-100 position-relative">
                                        <textarea v-model="body" data-autoresize="" required
                                            class="form-control pe-5 bg-light" rows="1"
                                            placeholder="Add a comment..."></textarea>
                                        <button
                                            class="nav-link bg-transparent px-3 position-absolute top-50 end-0 translate-middle-y border-0"
                                            type="submit">
                                            <i class="bi bi-send-fill"> </i>
                                        </button>
                                    </form>
                                </div>
                            </template>
                        </div>
                    </div>
                    <!-- Card END -->
                    <!-- Comments START -->
                    <div class="card">
                        <div class="card-header pb-0 border-0">
                            <h4>{{ post.comments_count }} comments</h4>
                        </div>
                        <div v-for="comment in post.comments" v-bind:key="comment.id" class="py-2 px-3">
                            <div class="d-flex bg-light rounded p-sm-2 p-2">
                                <img class="avatar avatar-md rounded-circle float-start me-3"
                                    :src="comment.created_by.get_avatar" alt="">
                                <div>
                                    <div class="d-sm-flex">
                                        <h6 class="me-2">
                                            <a>{{ comment.created_by.name }}</a>
                                        </h6>
                                        <span class="me-3 small">{{ comment.created_at_formatted }} </span>
                                    </div>
                                    <p>{{ comment.body }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Blog single END -->
                </div>
            </div>
            <!-- Main content END -->
        </div> <!-- Row END -->
    </div>
</template>


<script>
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { useToastStore } from '@/stores/toast'

export default {
    name: 'PostView',

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
            post: {
                id: null,
                comments: []
            },
            body: ''
        }
    },

    mounted() {
        this.getPost()
    },

    methods: {
        likePost(id) {
            if ((localStorage.getItem('user.access'))) {
                axios
                    .post(`/api/posts/${id}/like/`)
                    .then(response => {
                        if (response.data.message == "like created") {
                            this.post.likes_count += 1;
                        }
                    })
                    .catch(error => {
                        console.log("error", error);
                    });
            } else {
                this.toastStore.showToast(5000, 'Please login!', 'bg-emerald-500')
            }
        },

        getPost() {
            axios
                .get(`/api/posts/${this.$route.params.id}/`)
                .then(response => {
                    console.log('data', response.data)

                    this.post = response.data.post
                })
                .catch(error => {
                    console.log('error', error)
                })
        },

        submitForm() {
            console.log('submitForm', this.body)

            axios
                .post(`/api/posts/${this.$route.params.id}/comment/`, {
                    'body': this.body
                })
                .then(response => {
                    console.log('data', response.data)

                    this.post.comments.push(response.data)
                    this.post.comments_count += 1
                    this.body = ''
                })
                .catch(error => {
                    console.log('error', error)
                })
        },

        reportPost() {
            if ((localStorage.getItem('user.access'))) {
                axios
                    .post(`/api/posts/${this.post.id}/report/`)
                    .then(response => {
                        console.log(response.data)

                        this.toastStore.showToast(5000, 'The post was reported to author!', 'bg-emerald-500')
                    })
                    .catch(error => {
                        console.log("error", error);
                    })
            } else {
                this.toastStore.showToast(5000, 'Please login!', 'bg-emerald-500')
            }
        },

        deletePost() {
            this.$emit('deletePost', this.post.id)

            axios
                .delete(`/api/posts/${this.post.id}/delete/`)
                .then(response => {
                    console.log(response.data)

                    this.toastStore.showToast(5000, 'The post was deleted', 'bg-emerald-500')
                })
                .catch(error => {
                    console.log("error", error);
                })
        },

    }
}
</script>
