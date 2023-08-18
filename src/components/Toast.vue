<script setup>
import { useToastStore } from '@/stores/toast'

const store = useToastStore()
</script>

<template>
    <div class="position-fixed z-30 m-3">
        <div v-if="store.isVisible" class=" alert alert-success alert-dismissible fade show mb-0 mt-2"
            :class="store.classes" role="alert">
            {{ store.message }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>
</template>