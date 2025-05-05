<template>
    <div class="position-absolute top-0 left-0 w-100 fill-height  justify-center align-center" :class="[loading ? 'd-flex' : 'd-none']">
        <div class="loading"></div>
    </div>

</template>

<script setup>

defineProps({
  loading: Boolean,
})

</script>

<style scoped>

.loading {
    width: 128px;
    height: 128px;
    border: 4px solid rgba(var(--v-theme-on-surface));
    border-radius: 50%;
    position: relative;
    border-right-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: loader 1.2s linear infinite;
}

.loading::before {
    content: '';
    position: absolute;
    width: 96px;
    height: 96px;
	border: 4px solid rgba(var(--v-theme-on-surface));
    border-radius: 50%;
    border-left-color: transparent;

    animation: loader .5s linear infinite reverse;
}

@keyframes loader {
  
  100% {
    rotate: 1turn;
  }
}


</style>