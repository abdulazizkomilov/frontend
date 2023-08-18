<template>
    <div class="container">
        <div class="row justify-content-center align-items-center vh-80 py-5">
            <!-- Main content START -->
            <div class="col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5">
                <!-- Forgot password START -->
                <div class="card card-body rounded-3 text-center p-4 p-sm-5">
                    <!-- Title -->
                    <h1 class="mb-2">Verification</h1>
                    <p>Enter the verification code.</p>
                    <!-- form START -->
                    <form v-on:submit.prevent="submitForm" class="mt-3">
                        <template v-if="errors.length > 0">
                            <div class="alert alert-success alert-dismissible fade show p-2">
                                <p class="mt-2" v-for="error in errors" v-bind:key="error">{{ error }}</p>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        </template>
                        <!-- New password -->
                        <div class="mb-3">
                            <!-- Input group -->
                            <div class="input-group input-group-lg">
                                <input class="form-control" type="text" v-model="form.code" placeholder="Enter code">
                            </div>
                            <!-- Pswmeter -->
                            <div id="pswmeter" class="mt-2 password-strength-meter">
                                <div class="password-strength-meter-score"></div>
                            </div>
                            <div class="d-flex mt-1">
                                <div id="pswmeter-message" class="rounded">Write your code...</div>
                                <!-- Password message notification -->
                                <div class="ms-auto">
                                    <i class="bi bi-info-circle ps-1" data-bs-container="body" data-bs-toggle="popover"
                                        data-bs-placement="top"
                                        data-bs-content="Include at least one uppercase, one lowercase, one special character, one number and 8 characters long."
                                        data-bs-original-title="" title=""></i>
                                </div>
                            </div>
                        </div>
                        <!-- Back to sign in -->
                        <div class="mb-3">
                            <RouterLink to="/login">Login Now</RouterLink>
                        </div>
                        <!-- Button -->
                        <div class="d-grid"><button type="submit" class="btn btn-lg btn-primary">Send</button>
                        </div>
                        <!-- Copyright -->
                        <p class="mt-4 mb-4 text-center">©2022 <a target="_blank"
                                href="http://blogcodes.online/">blogscodes.</a> All rights reserved</p>
                    </form>
                    <!-- form END -->
                </div>
                <!-- Forgot password END -->
            </div>
        </div> <!-- Row END -->
    </div>
</template>

<script>
import axios from 'axios'

import { useToastStore } from '@/stores/toast'
import { RouterLink } from 'vue-router'

export default {
    setup() {
        const toastStore = useToastStore();
        return {
            toastStore
        };
    },
    data() {
        return {
            form: { code: '' },
            errors: [],
        };
    },
    methods: {
        submitForm() {
            this.errors = [];
            if (this.form.code === '') {
                this.errors.push('Your code is missing');
            }
            if (this.errors.length === 0) {
                axios
                    .post('/api/verify-phone/', this.form)
                    .then(response => {
                        if (response.data.message === 'success') {
                            this.toastStore.showToast(5000, 'Verified! You can log in.', 'bg-emerald-500');
                            this.form.code = '';
                        }
                        else {
                            const data = JSON.parse(response.data.message);
                            for (const key in data) {
                                this.errors.push(data[key][0].message);
                            }
                            this.toastStore.showToast(5000, 'Something went wrong. Please try again', 'bg-red-300');
                        }
                    })
                    .catch(error => {
                        console.log('error', error);
                    });
            }
        }
    },
    components: { RouterLink }
}
</script>
