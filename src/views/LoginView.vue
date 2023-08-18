<template>
    <div class="container py-5">
        <div class="row justify-content-center align-items-center vh-120">
            <!-- Main content START -->
            <div class="col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5">
                <!-- Sign up START -->
                <div class="card card-body rounded-3 p-4 p-sm-5">
                    <div class="text-center">
                        <!-- Title -->
                        <h1 class="mb-2">Login</h1>
                        <span class="d-block">If you don't have an account?
                            <RouterLink :to="{ 'name': 'signup' }">Sign up here
                            </RouterLink>
                        </span>
                    </div>
                    <!-- Form START -->
                    <form class="mt-4" v-on:submit.prevent="submitForm" action="" method="POST">

                        <template v-if="errors.length > 0">
                            <div class="alert alert-success alert-dismissible fade show p-2">
                                <p class="mt-2" v-for="error in errors" v-bind:key="error">{{ error }}</p>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        </template>

                        <!-- Email -->
                        <div class="mb-3 input-group-lg">
                            <input v-model="form.email" type="email" class="form-control" placeholder="Enter email">
                        </div>
                        <!-- password -->
                        <div class="mb-3 position-relative">
                            <!-- Input group -->
                            <div class="input-group input-group-lg">
                                <input v-model="form.password" class="form-control" type="password" id="psw-input"
                                    placeholder="Enter new password">
                            </div>
                        </div>
                        <!-- Keep me signed in -->
                        <div class="mb-3 text-start">
                            <input type="checkbox" class="form-check-input" id="keepsingnedCheck">
                            <label class="form-check-label ms-1" for="keepsingnedCheck"> Keep me signed in</label>
                        </div>

                        <!-- Button -->
                        <div class="d-grid mt-2"><button type="submit" class="btn btn-lg btn-primary">Login</button></div>

                        <p class="mt-4 mb-4 text-center">©2022 <a target="_blank"
                                href="http://blogcodes.online/">blogscodes.</a> All rights reserved</p>
                    </form>
                    <!-- Form END -->
                </div>
                <!-- Sign up END -->
            </div>
        </div> <!-- Row END -->
    </div>
</template>

<script>
import axios from 'axios'

import { useUserStore } from '@/stores/user'

export default {
    setup() {
        const userStore = useUserStore()

        return {
            userStore
        }
    },

    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            errors: []
        }
    },
    methods: {
        async submitForm() {
            this.errors = []

            if (this.form.email === '') {
                this.errors.push('Your e-mail is missing')
            }

            if (this.form.password === '') {
                this.errors.push('Your password is missing')
            }

            if (this.errors.length === 0) {
                await axios
                    .post('/api/login/', this.form)
                    .then(response => {
                        this.userStore.setToken(response.data)

                        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access;
                    })
                    .catch(error => {
                        console.log('error', error)

                        this.errors.push('The email or password is incorrect! Or the user is not activated!')
                    })
            }

            if (this.errors.length === 0) {
                await axios
                    .get('/api/me/')
                    .then(response => {
                        this.userStore.setUserInfo(response.data)

                        this.$router.push('/')
                    })
                    .catch(error => {
                        console.log('error', error)
                    })
            }
        }
    }
}
</script>
