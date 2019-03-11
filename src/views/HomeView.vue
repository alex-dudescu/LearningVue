
<template>
    <div id="homeView">
        <div class="row mb-4">
            <div class="col-md-12">
                <bt-card>
                    <h1>Learning vue</h1>
                    <p>Series of mini projects to learn vue js</p>
                </bt-card>
            </div>
        </div>
        <div class="row equal">
            <div class="col-lg-4" v-for="project in projects" :key="project.id">
                <bt-card 
                    class="pr-height"
                    :card-title="project.projectName"
                    :card-subtitle="getTechnologies(project)"
                    :card-links="getLinks(project)">
                <p>
                    <span class="subtitle">
                        Description: 
                    </span>
                    {{project.description}}
                </p>
                <p>
                    <span class="subtitle">
                        Features: 
                    </span>

                    <ul>
                        <li v-for="(feature, index) in project.features" :key="index">{{feature}}</li>
                    </ul>
                </p>
                </bt-card>
            </div>
        </div>
    </div>    
</template>

<script>
import BtCard   from 'UI/BtCard'
import BtButton from 'UI/BtButton'
import { mapGetters } from 'vuex';

export default {
    name: 'HomeView',
    components: {
        BtCard,
        BtButton
    },
    data: function() {
        return {
            projects: []
        }
    },
    computed: {
        ...mapGetters('miniProjects', [
            'allProjects'
        ])
    },
    methods: {
        getTechnologies(project) {
            var technologies = ''; 
            project.technologies.forEach(technology => {
                technologies += '<li>' + technology + '</li>';
            })
            return technologies;
        },

        getLinks(project) {
             return Array({path : project.link, text: 'Go to Project'});
        }
    },
    created: function () {
        this.projects = this.allProjects;
    }

}
</script>

<style lang="scss" scoped>
.subtitle {
    font-weight: 800 !important;
}

.pr-height {
  height: inherit;
}
</style>


