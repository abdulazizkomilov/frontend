<template>
    <div class="container">
        <div class="row justify-content-center align-items-center vh-120">
            <!-- Main content START -->
            <div class="col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5">
                <!-- Sign up START -->
                <div class="card card-body rounded-3 p-4 p-sm-5">
                    <div class="text-center">
                        <!-- Title -->
                        <h1 class="mb-2">Sign up</h1>
                        <span class="d-block">Already have an account?
                            <RouterLink :to="{ 'name': 'login' }">
                                Sign in here
                            </RouterLink>
                        </span>
                    </div>

                    <!-- Form START -->
                    <form v-on:submit.prevent="submitForm" class="mt-2" action="" method="POST">
                        <template v-if="errors.length > 0">
                            <div class="alert alert-success alert-dismissible fade show p-2">
                                <p class="mt-2" v-for="error in errors" v-bind:key="error">{{ error }}</p>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        </template>
                        <div class="mb-3 input-group-lg py-1 mt-2">
                            <input type="name" v-model="form.name" class="form-control" placeholder="Enter full name">
                        </div>
                        <div class="mb-3 input-group-lg py-1 mt-2">
                            <input type="tel" v-model="form.phone" class="form-control" placeholder="Enter phone number">
                        </div>
                        <!-- Email -->
                        <div class="mb-3 input-group-lg py-1">
                            <input type="email" v-model="form.email" class="form-control" placeholder="Enter email">
                        </div>
                        <!-- New password -->
                        <div class="mb-3 position-relative py-1">
                            <!-- Input group -->
                            <div class="input-group input-group-lg">
                                <input class="form-control" type="password" v-model="form.password1" id="psw-input"
                                    placeholder="Enter new password">
                            </div>

                        </div>
                        <!-- Confirm password -->
                        <div class="mb-3 input-group-lg py-1">
                            <input class="form-control" v-model="form.password2" type="password"
                                placeholder="Confirm password">
                        </div>

                        <!-- errors -->

                        <!-- Button -->
                        <div class="d-grid mt-2"><button type="submit" class="btn btn-lg btn-primary">Sign Up</button></div>
                        <!-- Copyright -->
                        <p class="mb-0 mt-3 text-center">©2022 <a target="_blank"
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
            form: {
                email: '',
                name: '',
                phone: '',
                password1: '',
                password2: ''
            },
            errors: [],
        }
    },

    methods: {
        submitForm() {
            this.errors = []

            if (this.form.email === '') {
                this.errors.push('Your e-mail is missing')
            }

            if (this.form.name === '') {
                this.errors.push('Your name is missing')
            }

            if (this.form.phone === '') {
                this.errors.push('Your phone is missing')
            }

            if (this.form.password1 === '') {
                this.errors.push('Your password is missing')
            }

            if (this.form.password1 !== this.form.password2) {
                this.errors.push('The password does not match')
            }

            if (this.errors.length === 0) {
                axios
                    .post('/api/signup/', this.form)
                    .then(response => {
                        if (response.data.message === 'success') {
                            this.toastStore.showToast(5000, 'The user is registered. Please verify your phone!', 'bg-emerald-500')

                            this.form.email = ''
                            this.form.name = ''
                            this.form.phone = ''
                            this.form.password1 = ''
                            this.form.password2 = ''

                            this.$router.push('/verify-phone')

                        } else {
                            const data = JSON.parse(response.data.message)
                            for (const key in data) {
                                this.errors.push(data[key][0].message)
                            }

                            this.toastStore.showToast(5000, 'Something went wrong. Please try again', 'bg-red-300')
                        }
                    })
                    .catch(error => {
                        console.log('error', error)
                    })
            }
        }
    }
}
</script>
