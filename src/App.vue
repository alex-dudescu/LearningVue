<template>
	<main-layout></main-layout>
</template>

<script>
import MainLayout from 'Views/MainLayout.vue';

export default {
	name: 'app',
	components: {
		MainLayout,
	}
}
</script>

<style lang="scss">
@import 'Assets/css/main.scss';
@import '~bootstrap/scss/bootstrap.scss';

//TODO: Fix font-awesome
// @import "~font-awesome/css/font-awesome.css";
</style>