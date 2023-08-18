<template>
    <div class="card h-100">
        <div class="p-2">
            <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                    <!-- Avatar -->
                    <div class="avatar avatar-story me-2">
                        <a>
                            <img class="avatar-img rounded-circle" :src="post.created_by.get_avatar" alt="">
                        </a>
                    </div>
                    <!-- Info -->
                    <div>
                        <div class="nav nav-divider">
                            <h6 class="nav-item text-xs mb-0">
                                <RouterLink :to="{ name: 'profile', params: { 'id': post.created_by.id } }">{{
                                    post.created_by.name }}</RouterLink>
                            </h6>
                            <span class="nav-item small">{{ post.created_at_formatted }} ago</span>
                        </div>
                    </div>
                </div>
                <!-- Card feed action dropdown START -->
                <div class="dropdown">
                    <a href="#" class="text-secondary btn btn-secondary-soft-hover py-1 px-2" id="cardFeedAction"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-three-dots"></i>
                    </a>
                    <!-- Card feed action dropdown menu -->
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="cardFeedAction">
                        <li><button @click="savePost(post.id)" class="dropdown-item">
                                <i class="bi bi-bookmark fa-fw pe-2"></i>
                                Save post
                            </button>
                        </li>
                        <li><button @click="deletePost" v-if="userStore.user.id == post.created_by.id"
                                class="dropdown-item">
                                <i class="bi bi-trash3-fill"></i> Delete post
                            </button>
                        </li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><button @click="reportPost" class="dropdown-item">
                                <i class="bi bi-flag fa-fw pe-2"></i> Report post
                            </button>
                        </li>
                    </ul>
                </div>
                <!-- Card feed action dropdown END -->
            </div>
        </div>
        <template v-if="post.attachments">
            <div class="p-2 rounded">
                <RouterLink :to="{ name: 'postview', params: { id: post.id } }">
                    <img class="card-img-top" v-for="image in post.attachments" v-bind:key="image.id" :src="image.get_image"
                        alt="">
                </RouterLink>
            </div>
        </template>
        <div class="card-body">
            <h5>
                <RouterLink :to="{ name: 'postview', params: { id: post.id } }" class="btn-link text-reset text-sm fw-bold">
                    {{ post.title }}
                </RouterLink>
            </h5>
            <p>{{ post.summary }}
                <span v-if="readMore"></span>
                <span v-else>...</span>
            </p>

            <p v-show="readMore">{{ post.body }}</p>

            <div>
                <p class="badge bg-success bg-opacity-10 text-success" style="cursor: pointer;"
                    @click="readMore = !readMore">
                    <span v-if="readMore">Read Less</span>
                    <span v-else>Read More</span>
                </p>
            </div>
            <ul class="nav nav-stack flex-wrap small mt-3">
                <li class="nav-item">
                    <button @click="likePost(post.id)" class="nav-link" style="cursor: pointer;">
                        <i class="bi bi-hand-thumbs-up-fill pe-1"></i>{{ post.likes_count }} likes
                    </button>
                </li>
                <li class="nav-item">
                    <RouterLink class="text-reset" :to="{ name: 'postview', params: { id: post.id } }">
                        <i class="bi bi-chat-fill pe-1"></i>{{ post.comments_count }} comments
                    </RouterLink>
                </li>
            </ul>
        </div>
        <template v-if="userStore.user.isAuthenticated">
            <div class="d-flex p-2">
                <div class="avatar avatar-xs me-2">
                    <img class="avatar-img rounded-circle" :src="userStore.user.avatar" alt="">
                </div>
                <form v-on:submit.prevent="submitForm(post.id)" method="post" class="nav nav-item w-100 position-relative">
                    <textarea v-model="body" data-autoresize="" required class="form-control pe-5 bg-light" rows="1"
                        placeholder="Add a comment..."></textarea>
                    <button class="nav-link bg-transparent px-3 position-absolute top-50 end-0 translate-middle-y border-0"
                        type="submit">
                        <i class="bi bi-send-fill"> </i>
                    </button>
                </form>
            </div>
        </template>

    </div>
</template>


<script>
import axios from 'axios'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useToastStore } from '@/stores/toast'

export default {
    props: {
        post: Object
    },

    emits: ['deletePost'],

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
            showExtraModal: false,
            body: '',
            readMore: false
        }
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

        savePost(id) {
            if ((localStorage.getItem('user.access'))) {
                axios
                    .post(`/api/posts/${id}/save/`)
                    .then(response => {
                        if (response.data.message == "post saved") {
                            this.toastStore.showToast(5000, 'Post saved!', 'bg-emerald-500')
                        } else {
                            this.toastStore.showToast(5000, 'Post removed!', 'bg-emerald-500')
                        }
                    })
                    .catch(error => {
                        console.log("error", error);
                    });
            } else {
                this.toastStore.showToast(5000, 'Please login!', 'bg-emerald-500')
            }
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

        submitForm(id) {
            console.log('submitForm', this.body)

            axios
                .post(`/api/posts/${id}/comment/`, {
                    'body': this.body
                })
                .then(response => {
                    console.log('data', response.data)

                    this.post.comments = response.data
                    this.post.comments_count += 1
                    this.body = ''
                })
                .catch(error => {
                    console.log('error', error)
                })
        },
    },
    components: { RouterLink }
}
</script>
