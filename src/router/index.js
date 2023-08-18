import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import MessagesView from '../views/MessagesView.vue'
import SearchView from '../views/SearchView.vue'
import FormsView from '../views/FormsView.vue'
import ProfileView from '../views/ProfileView.vue'
import FriendsView from '../views/FriendsView.vue'
import PostView from '../views/PostView.vue'
import TrendView from '../views/TrendView.vue'
import EditProfileView from '../views/EditProfileView.vue'
import PageNotFound from '../views/PageNotFound.vue'
import VerifyView from '../views/VerifyView.vue'
import SavedView from '../views/SavedView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create',
      name: 'create',
      component: FormsView
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/profile/edit',
      name: 'editprofile',
      component: EditProfileView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/verify-phone',
      name: 'verify',
      component: VerifyView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/:id/saved',
      name: 'saved',
      component: SavedView
    },
    {
      path: '/messages',
      name: 'messages',
      component: MessagesView
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/profile/:id/friends',
      name: 'friends',
      component: FriendsView
    },
    {
      path: '/post/:id',
      name: 'postview',
      component: PostView
    },
    {
      path: '/trends/:id',
      name: 'trendview',
      component: TrendView
    },
    // {
    //   path: "/404",
    //   name: 'PageNotFound',
    //   component: PageNotFound
    // },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: PageNotFound,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
