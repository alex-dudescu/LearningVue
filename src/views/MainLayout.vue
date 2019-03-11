<template>
<div>
    <site-header></site-header>
    
    <div class="container mt-5 mb-5">
        <router-view></router-view>
    </div>
    
    <site-footer></site-footer>
</div>
</template>

<script>
import SiteHeader from 'Components/partials/SiteHeader';
import SiteFooter from 'Components/partials/SiteFooter';

export default {
    name: 'MainLayout',
    components: {
        SiteHeader,
        SiteFooter
    }
}
</script>

<style lang="scss" scoped>

</style>
