<template>
    <div class="container">
        <div class="row">

            <!-- Sidenav START -->
            <div class="col-lg-3">

                <!-- Advanced filter responsive toggler START -->
                <!-- Divider -->
                <div class="d-flex align-items-center mb-4 d-lg-none">
                    <button class="border-0 bg-transparent" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span class="btn btn-primary"><i class="fa-solid fa-sliders-h"></i></span>
                        <span class="h6 mb-0 fw-bold d-lg-none ms-2">Settings</span>
                    </button>
                </div>
                <!-- Advanced filter responsive toggler END -->

                <nav class="navbar navbar-light navbar-expand-lg mx-0">
                    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar">
                        <!-- Offcanvas header -->
                        <div class="offcanvas-header">
                            <button type="button" class="btn-close text-reset ms-auto" data-bs-dismiss="offcanvas"
                                aria-label="Close"></button>
                        </div>

                        <!-- Offcanvas body -->
                        <div class="offcanvas-body p-0">
                            <!-- Card START -->
                            <div class="card w-100">
                                <!-- Card body START -->
                                <div class="card-body">

                                    <!-- Side Nav START -->
                                    <ul class="nav nav-tabs nav-pills nav-pills-soft flex-column fw-bold gap-2 border-0"
                                        role="tablist">
                                        <li class="nav-item" data-bs-dismiss="offcanvas" role="presentation">
                                            <a class="nav-link d-flex mb-0 active" href="#nav-setting-tab-1"
                                                data-bs-toggle="tab" aria-selected="true" role="tab"> <i
                                                    class="bi bi-person-check me-2"></i><span> Account
                                                </span></a>
                                        </li>
                                        <li class="nav-item" data-bs-dismiss="offcanvas" role="presentation">
                                            <a class="nav-link d-flex mb-0" href="#nav-setting-tab-2" data-bs-toggle="tab"
                                                aria-selected="false" role="tab" tabindex="-1">
                                                <i class="bi bi-bell-fill me-2"></i><span> Notification </span></a>
                                        </li>
                                        <li class="nav-item" data-bs-dismiss="offcanvas" role="presentation">
                                            <a class="nav-link d-flex mb-0" href="#nav-setting-tab-3" data-bs-toggle="tab"
                                                aria-selected="false" role="tab" tabindex="-1">
                                                <i class="bi bi-shield-exclamation me-2"></i><span> Privacy
                                                    and safety </span></a>
                                        </li>
                                    </ul>
                                    <!-- Side Nav END -->

                                </div>
                                <!-- Card body END -->
                                <!-- Card footer -->
                                <div class="card-footer text-center py-2">
                                    <RouterLink :to="{ name: 'profile', params: { 'id': userStore.user.id } }"
                                        class="card-footer btn btn-primary-soft btn-xs text-center">View
                                        profile</RouterLink>
                                </div>
                            </div>
                            <!-- Card END -->
                        </div>
                        <!-- Offcanvas body -->
                    </div>
                </nav>
            </div>
            <!-- Sidenav END -->

            <!-- Main content START -->
            <div class="col-lg-6 vstack gap-4">
                <!-- Setting Tab content START -->
                <div class="tab-content py-0 mb-0">

                    <!-- Account setting tab START -->
                    <div class="tab-pane fade active show" id="nav-setting-tab-1" role="tabpanel">
                        <!-- Account settings START -->
                        <div class="card mb-4">

                            <!-- Title START -->
                            <div class="card-header border-0 pb-0">
                                <h1 class="h5 card-title">Account Settings</h1>
                            </div>
                            <!-- Card header START -->
                            <!-- Card body START -->
                            <div class="card-body">
                                <!-- Form settings START -->
                                <form v-on:submit.prevent="submitFormEdit" class="row g-3">
                                    <!-- First name -->
                                    <div class="col-sm-6 col-lg-4">
                                        <label class="form-label">Full name</label>
                                        <input type="text" v-model="form.name" class="form-control" placeholder="">
                                    </div>
                                    <div class="col-sm-6">
                                        <label class="form-label">Email</label>
                                        <input type="text" v-model="form.email" class="form-control" placeholder="">
                                    </div>

                                    <div class="col-sm-6">
                                        <label>Avatar</label><br>
                                        <input type="file" ref="file">
                                    </div>

                                    <template v-if="errors.length > 0">
                                        <div class="alert alert-success alert-dismissible fade show p-2">
                                            <p class="mt-2" v-for="error in errors" v-bind:key="error">{{ error }}</p>
                                            <button type="button" class="btn-close" data-bs-dismiss="alert"
                                                aria-label="Close"></button>
                                        </div>
                                    </template>

                                    <!-- Button  -->
                                    <div class="col-12 text-end">
                                        <button type="submit" class="btn btn-sm btn-primary mb-0">Save changes</button>
                                    </div>
                                </form>
                                <!-- Settings END -->
                            </div>
                            <!-- Card body END -->
                        </div>
                        <!-- Account settings END -->

                        <!-- Change your password START -->
                        <div class="card">
                            <!-- Title START -->
                            <div class="card-header border-0 pb-0">
                                <h5 class="card-title">Change your password</h5>
                            </div>
                            <!-- Title START -->
                            <div class="card-body">
                                <!-- Settings START -->
                                <form v-on:submit.prevent="submitFormPassword" class="row g-3">
                                    <!-- Current password -->
                                    <div class="col-12">
                                        <label class="form-label">Current password</label>
                                        <input type="text" v-model="form.old_password" class="form-control" placeholder="">
                                    </div>
                                    <!-- New password -->
                                    <div class="col-12">
                                        <label class="form-label">New password</label>
                                        <!-- Input group -->
                                        <div class="input-group">
                                            <input class="form-control" type="text" v-model="form.new_password1"
                                                id="psw-input" placeholder="Enter new password">
                                        </div>
                                        <!-- Pswmeter -->
                                        <div id="pswmeter" class="mt-2 password-strength-meter">
                                            <div class="password-strength-meter-score"></div>
                                        </div>
                                        <div id="pswmeter-message" class="rounded mt-1">Write your password...</div>
                                    </div>
                                    <!-- Confirm password -->
                                    <div class="col-12">
                                        <label class="form-label">Confirm password</label>
                                        <input type="password" v-model="form.new_password2" class="form-control"
                                            placeholder="">
                                    </div>

                                    <template v-if="errors.length > 0">
                                        <div class="alert alert-success alert-dismissible fade show p-2">
                                            <p class="mt-2" v-for="error in errors" v-bind:key="error">{{ error }}</p>
                                            <button type="button" class="btn-close" data-bs-dismiss="alert"
                                                aria-label="Close"></button>
                                        </div>
                                    </template>

                                    <!-- Button  -->
                                    <div class="col-12 text-end">
                                        <button type="submit" class="btn btn-primary mb-0">Update password</button>
                                    </div>
                                </form>
                                <!-- Settings END -->
                            </div>
                        </div>
                        <!-- Card END -->
                    </div>
                    <!-- Account setting tab END -->

                    <!-- Notification tab START -->
                    <div class="tab-pane fade" id="nav-setting-tab-2" role="tabpanel">
                        <!-- Notification START -->
                        <div class="card">
                            <!-- Card header START -->
                            <div class="card-header border-0 pb-0">
                                <h5 class="card-title">Notification
                                    <span class="badge bg-success">{{ notifications.length }}</span>
                                </h5>
                            </div>

                            <div class="card-body pb-0">
                                <ul class="list-group list-group-flush">
                                    <li v-for="notification in notifications" v-bind:key="notification.id"
                                        class="list-group-item d-flex justify-content-between align-items-center px-0 py-3">
                                        <div class="me-2">
                                            <p class="small mb-0">{{ notification.body }}</p>
                                        </div>
                                        <div class="form-check form-switch">
                                            <span class="badge bg-success" style="cursor: pointer;"
                                                @click="readNotification(notification)">Read
                                                More</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <!-- Notification tab END -->

                    <!-- Privacy and safety tab START -->
                    <div class="tab-pane fade" id="nav-setting-tab-3" role="tabpanel">
                        <!-- Privacy and safety START -->
                        <div class="card">
                            <!-- Card header START -->
                            <div class="card-header border-0 pb-0">
                                <h1 class="card-title">Privacy and safety</h1>
                                <p class="mb-0 text-xl">The Privacy Policy for <a
                                        href="http://blogcodes.online/">blogcodes.online</a>.</p>
                                <hr>
                                <h2 class="card-title mb-3">Privacy Policy</h2>
                                <p class="text-ls">
                                    <a href="http://blogcodes.online/">blogcodes.online</a> ("us", "we", or "our") operates
                                    the <a href="http://blogcodes.online/">http://blogcodes.online</a>
                                    website (the "Service").
                                </p>
                                <p class="text-ls">
                                    We use your data to provide and improve the Service. By using the Service, you agree to
                                    the collection and use of information in accordance with this policy. Unless otherwise
                                    defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings
                                    as in our Terms and Conditions, accessible from <a
                                        href="http://blogcodes.online/">http://blogcodes.online</a>
                                </p>

                                <h2 class="card-title mb-3">Information Collection And Use</h2>

                                <p class="text-ls">
                                    We collect several different types of information for various purposes to provide and
                                    improve our Service to you.
                                </p>

                                <h2 class="card-title mb-3">Types of Data Collected</h2>
                                <h3 class="card-title mb-3">Personal Data</h3>


                                <p class="text-ls">
                                    While using our Service, we may ask you to provide us with certain personally
                                    identifiable information that can be used to contact or identify you ("Personal Data").
                                    Personally identifiable information may include, but is not limited to:
                                    <br>
                                    Email address
                                    <br>
                                    First name and last name
                                    <br>
                                    Cookies and Usage Data
                                </p>

                                <h2 class="card-title mb-3">Social Network Service Data</h2>


                                <p class="text-ls">
                                    Should you choose to create an Account using your Gmail account, <a
                                        href="http://blogcodes.online/">blogcodes.online</a> gains access
                                    to your Gmail account data to allow creation of your account. We do not analyse, store,
                                    transfer or use your Gmail account data in any way other than for the purpose of
                                    creating your account on our Service. This is purely for the convenience of being able
                                    to login/signup into the website.
                                </p>

                                <h2 class="card-title mb-3">Usage Data</h2>


                                <p class="text-ls">
                                    We may also collect information how the Service is accessed and used ("Usage Data").
                                    This Usage Data may include information such as your computer's Internet Protocol
                                    address (e.g. IP address), browser type, browser version, the pages of our Service that
                                    you visit, the time and date of your visit, the time spent on those pages, unique device
                                    identifiers and other diagnostic data.
                                </p>

                                <h2 class="card-title mb-3">Tracking & Cookies Data</h2>


                                <p class="text-ls">
                                    We use cookies and similar tracking technologies to track the activity on our Service
                                    and hold certain information.
                                    <br>
                                    Cookies are files with small amount of data which may include an anonymous unique
                                    identifier. Cookies are sent to your browser from a website and stored on your device.
                                    Tracking technologies also used are beacons, tags, and scripts to collect and track
                                    information and to improve and analyze our Service.
                                    <br>
                                    You can instruct your browser to refuse all cookies or to indicate when a cookie is
                                    being sent. However, if you do not accept cookies, you may not be able to use some
                                    portions of our Service.
                                    <br>
                                    Examples of Cookies we use:
                                    <br>
                                <h4>Session Cookies.</h4> We use Session Cookies to operate our Service.
                                <br>
                                <h4>Preference Cookies.</h4> We use Preference Cookies to remember your your your
                                preferences and various settings.
                                <br>
                                <h4>Security Cookies.</h4> We use Security Cookies for security purposes.
                                </p>

                                <h2 class="card-title mb-3">Use of Data</h2>


                                <p class="text-ls">
                                    <a href="http://blogcodes.online/">blogcodes.online</a> uses the collected data for
                                    various
                                    purposes:
                                    <br>
                                    To provide and maintain the Service
                                    <br>
                                    To notify you about changes to our Service
                                    <br>
                                    To allow you to participate in interactive features of our Service when you choose to do
                                    so
                                    <br>
                                    To provide customer care and support
                                    <br>
                                    To provide analysis or valuable information so that we can improve the Service
                                    <br>
                                    To monitor the usage of the Service
                                    <br>
                                    To detect, prevent and address technical issues
                                </p>

                                <h2 class="card-title mb-3">Transfer Of Data</h2>


                                <p class="text-ls">
                                    Your information, including Personal Data, may be transferred to — and maintained on —
                                    computers located outside of your state, province, country or other governmental
                                    jurisdiction where the data protection laws may differ than those from your
                                    jurisdiction.
                                    <br>
                                    If you are located outside South Africa and choose to provide information to us, please
                                    note that we transfer the data, including Personal Data, to South Africa and process it
                                    there.
                                    <br>
                                    Your consent to this Privacy Policy followed by your submission of such information
                                    represents your agreement to that transfer.
                                    <br>
                                    <a href="http://blogcodes.online/">blogcodes.online</a> will take all steps reasonably
                                    necessary to ensure that your data is treated
                                    securely and in accordance with this Privacy Policy and no transfer of your Personal
                                    Data will take place to an organization or a country unless there are adequate controls
                                    in place including the security of your data and other personal information.
                                </p>

                                <h2 class="card-title mb-3">Disclosure Of Data</h2>
                                <hr>
                                <h3>Legal Requirements</h3>


                                <p class="text-ls">
                                    <a href="http://blogcodes.online/">blogcodes.online</a> may disclose your Personal Data
                                    in the
                                    good faith belief that such action is
                                    necessary to:
                                    <br>
                                    To comply with a legal obligation
                                    <br>
                                    To protect and defend the rights or property of <a
                                        href="http://blogcodes.online/">blogcodes.online</a>
                                    <br>
                                    To prevent or investigate possible wrongdoing in connection with the Service
                                    <br>
                                    To protect the personal safety of users of the Service or the public
                                    <br>
                                    To protect against legal liability
                                </p>

                                <h2 class="card-title mb-3">Service Providers</h2>


                                <p class="text-ls">
                                    We may employ third party companies and individuals to facilitate our Service ("Service
                                    Providers"), to provide the Service on our behalf, to perform Service-related services
                                    or to assist us in analyzing how our Service is used.
                                    <br>
                                    These third parties have access to your Personal Data only to perform these tasks on our
                                    behalf and are obligated not to disclose or use it for any other purpose.
                                </p>

                                <h2 class="card-title mb-3">Analytics</h2>


                                <p class="text-ls">
                                    We may use third-party Service Providers to monitor and analyze the use of our Service.
                                </p>
                                <h4>Google Analytics</h4>

                                <p class="text-ls">Google Analytics is a web analytics service offered by Google that tracks
                                    and reports website traffic. Google uses the data collected to track and monitor the use
                                    of our Service. This data is shared with other Google services. Google may use the
                                    collected data to contextualize and personalize the ads of its own advertising network.
                                    <br>
                                    You can opt-out of having made your activity on the Service available to Google
                                    Analytics by installing the Google Analytics opt-out browser add-on. The add-on prevents
                                    the Google Analytics JavaScript (ga.js, analytics.js, and dc.js) from sharing
                                    information with Google Analytics about visits activity.
                                    <br>
                                    For more information on the privacy practices of Google, please visit the Google Privacy
                                    & Terms web page: <a
                                        href="https://policies.google.com/privacy?hl=en">https://policies.google.com/privacy?hl=en</a>
                                </p>

                                <h2 class="card-title mb-3">Links To Other Sites</h2>


                                <p class="text-ls">
                                    Our Service may contain links to other sites that are not operated by us. If you click
                                    on a third party link, you will be directed to that third party's site. We strongly
                                    advise you to review the Privacy Policy of every site you visit.
                                    <br>
                                    We have no control over and assume no responsibility for the content, privacy policies
                                    or practices of any third party sites or services.
                                </p>

                                <h2 class="card-title mb-3">Children's Privacy</h2>


                                <p class="text-ls">
                                    Our Service does not address anyone under the age of 18 ("Children").
                                    <br>
                                    We do not knowingly collect personally identifiable information from anyone under the
                                    age of 18. If you are a parent or guardian and you are aware that your Children has
                                    provided us with Personal Data, please contact us. If we become aware that we have
                                    collected Personal Data from children without verification of parental consent, we take
                                    steps to remove that information from our servers.
                                </p>

                                <h2 class="card-title mb-3">Changes To This Privacy Policy</h2>


                                <p class="text-ls">
                                    We may update our Privacy Policy from time to time. We will notify you of any changes by
                                    posting the new Privacy Policy on this page.
                                    <br>
                                    We will let you know via email and/or a prominent notice on our Service, prior to the
                                    change becoming effective and update the "effective date" at the top of this Privacy
                                    Policy.
                                    <br>
                                    You are advised to review this Privacy Policy periodically for any changes. Changes to
                                    this Privacy Policy are effective when they are posted on this page.
                                </p>

                                <h2 class="card-title mb-3">Contact Us</h2>
                                <hr>
                                <p class="text-ls">
                                    If you have any questions about this Privacy Policy, please contact us:
                                    <br>
                                <h6>By email:</h6>
                                <a href="mailto:abdulazizjon.codes@gmail.com">abdulazizjon.codes@gmail.com</a>
                                </p>
                            </div>
                        </div>
                        <!-- Privacy and safety END -->
                    </div>
                    <!-- Privacy and safety tab END -->

                </div>
                <!-- Setting Tab content END -->
            </div>

        </div> <!-- Row END -->
    </div>
</template>


<script>
import axios from 'axios'

import { useToastStore } from '@/stores/toast'
import { useUserStore } from '@/stores/user'
import { queuePostFlushCb } from 'vue'

export default {
    setup() {
        const toastStore = useToastStore();
        const userStore = useUserStore();
        return {
            toastStore,
            userStore
        };
    },
    data() {
        return {
            form: {
                email: this.userStore.user.email,
                name: this.userStore.user.name,
                old_password: '',
                new_password1: '',
                new_password2: '',
            },
            errors: [],
            notifications: [],
        };
    },
    mounted() {
        this.getNotifications();
    },
    methods: {
        getNotifications() {
            if ((localStorage.getItem('user.access'))) {
                axios
                    .get('/api/notifications/')
                    .then(response => {
                        console.log(response.data);
                        this.notifications = response.data;
                    })
                    .catch(error => {
                        console.log('Error: ', error);
                    });
            }
        },
        async readNotification(notification) {
            console.log('readNotification', notification.id);
            await axios
                .post(`/api/notifications/read/${notification.id}/`)
                .then(response => {
                    console.log(response.data);
                    if (notification.type_of_notification == 'post_like' || notification.type_of_notification == 'post_comment') {
                        this.$router.push({ name: 'postview', params: { id: notification.post_id } });
                    }
                    else {
                        this.$router.push({ name: 'friends', params: { id: notification.created_for_id } });
                    }
                })
                .catch(error => {
                    console.log('Error: ', error);
                });
        },
        submitFormEdit() {
            if ((localStorage.getItem('user.access'))) {
                this.errors = [];
                if (this.form.email === '') {
                    this.errors.push('Your e-mail is missing');
                }
                if (this.form.name === '') {
                    this.errors.push('Your name is missing');
                }
                if (this.errors.length === 0) {
                    let formData = new FormData();
                    formData.append('avatar', this.$refs.file.files[0]);
                    formData.append('name', this.form.name);
                    formData.append('email', this.form.email);
                    axios
                        .post('/api/editprofile/', formData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            }
                        })
                        .then(response => {
                            if (response.data.message === 'information updated') {
                                this.toastStore.showToast(5000, 'The information was saved', 'bg-emerald-500');
                                this.userStore.setUserInfo({
                                    id: this.userStore.user.id,
                                    name: this.form.name,
                                    email: this.form.email,
                                    avatar: response.data.user.get_avatar
                                });
                            }
                            else {
                                this.toastStore.showToast(5000, `${response.data.message}. Please try again`, 'bg-red-300');
                            }
                        })
                        .catch(error => {
                            console.log('error', error);
                        });
                }
            }
            else {
                this.toastStore.showToast(5000, 'Please login!', 'bg-emerald-500');
            }
        },
        submitFormPassword() {
            if ((localStorage.getItem('user.access'))) {
                this.errors = [];
                if (this.form.password1 !== this.form.password2) {
                    this.errors.push('The password does not match');
                }
                if (this.errors.length === 0) {
                    let formData = new FormData();
                    formData.append('old_password', this.form.old_password);
                    formData.append('new_password1', this.form.new_password1);
                    formData.append('new_password2', this.form.new_password2);
                    axios
                        .post('/api/editpassword/', formData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            }
                        })
                        .then(response => {
                            if (response.data.message === 'success') {
                                this.toastStore.showToast(5000, 'The information was saved', 'bg-emerald-500');
                            }
                            else {
                                const data = JSON.parse(response.data.message);
                                for (const key in data) {
                                    this.errors.push(data[key][0].message);
                                }
                            }
                        })
                        .catch(error => {
                            console.log('error', error);
                        });
                }
            }
            else {
                this.toastStore.showToast(5000, 'Please login!', 'bg-emerald-500');
            }
        }
    },
    components: { queuePostFlushCb }
}
</script>
