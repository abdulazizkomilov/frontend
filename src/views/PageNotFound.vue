<template>
    <div class="errors">
        <section class="flex items-center h-full p-16">
            <div class="flex items-center container flex-col justify-center mx-auto my-8 px-5">
                <div class="max-w-md text-center">
                    <h2 class="mb-8 font-bold text-9xl"><span class="sr-only">Xatolik</span> <span
                            class="text-primary">404</span></h2>
                    <p class="font-semibold md:text-3xl text-3xl">Kecharisiz, siz qidirgan sahifa topilmadi.</p>
                    <p class="mb-8 dark:text-gray-400 mt-4 text-lg text-muted">Lekin havotir olmang. Asosiy sahifamizda juda
                        ko'p qiziqarli narsalar mavjud.</p>
                    <RouterLink to="/" class="btn btn-primary ml-4" rel="noopener noreferrer">
                        Bosh sahifaga qaytish
                    </RouterLink>
                </div>
            </div>
        </section>
    </div>
</template>

<style>
@media (min-width: 1024px) {
    .errors {
        min-height: 100%;
    }
}
</style>