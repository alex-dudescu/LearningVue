<!-- 
    Bootstrap card component
-->

<template>
    <div class="card">
        <!-- <img src="" class="card-img-top" alt="..."> -->
        <div class="card-body">
            <h4 class="card-title"><div v-html="cardTitle"></div> </h4>
            <h6 class="card-subtitle mb-2 text-muted"><div class="subtitle-container" v-html="cardSubtitle"></div></h6>
            
            <div class="card-text">
                <slot />
            </div>

            <router-link v-for="cardLink in cardLinks" :to="cardLink.path" :key="cardLink.path" class="btn btn-primary" >{{cardLink.text}}</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BtCard',
    data: function() {
        return {
            innerHtml: ''
        }
    },
    props: {
        'cardTitle': String, 
        'cardSubtitle': String,
        'cardButtons': [],
        'cardLinks': undefined
    }
}
</script>

<style lang="scss">
.subtitle-container > li {
    display: inline;
    margin-right: 0.3em;
    padding-right: 0.3em;
    border-right: 1px solid;
}
.subtitle-container > li:last-child {
    border-right: none;
}
</style>

