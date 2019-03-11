<template>
    <div>
        <div class="row mb-5">
            <div class="col-md-10">
                <div class="input-group">
                    <input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)" v-model="inputText" @keyup.enter="createSearch">
                    <div class="input-group-append btn-group">
                        <bt-dropdown-button type="button"
                            :values="['Trivia', 'Math', 'Date']"
                            @valueChanged="onOptionChanged"
                        ></bt-dropdown-button>
                        <button type="button" class="btn btn-secondary" @click="createSearch"> <i class="fas fa-search"></i> </button>
                    </div>
                </div>
            </div>
            <div class="col-md-2">
                <button type="button" class="btn btn-secondary" @click="getRandomFact">Get Random</button>
            </div>
        </div>

        <div class="row">
            <div class="col-md-2 offset-md-5">
                <i class="fa fa-spinner fa-pulse fa-3x fa-fw align-middle" v-if="isLoading"></i>
            </div>
            <div class="col-md-12" v-if="!isLoading">
                <bt-card :cardTitle="'#' + res.number" v-for="(res, index) in result" :key="index" class="mb-2">
                    {{res.text}}
                </bt-card>
            </div>
        </div>
    </div>
        
        
</template>

<script>
import 'core-js/shim'
import 'regenerator-runtime/runtime'

import BtCard from 'UI/BtCard'
import BtDropdownButton from 'UI/BtDropdownButton';
import { RepositoryFactory } from 'API/RepositoryFactory';

const randomRepository = RepositoryFactory.get('numbers');

const optionsMap = {
    0: '',
    1: 'math',
    2: 'date'
}

export default {
    name: 'RandomNumberFact',
    components: {
        BtCard,
        BtDropdownButton
    },
    data: function() {
        return {
            result: [],
            isLoading: false,
            fact: {
                number: undefined,
                text: undefined
            },
            inputText: '',
            selectedOption: 0,
            
        }
    },
    methods: {
        async getRandomFact() {
            var randomFact = {};
            
            this.isLoading = true;
            await randomRepository.getRandomFact().then(result => {
                randomFact.number = result.data.number;
                randomFact.text   = result.data.text;   
            }).catch(err => {
                console.log(err);
            });
            this.isLoading = false;

            this.result = [randomFact];
        },
        
        async getFactByCategory(searchTerm, category) {
            var categoryFact = {};

            
            await randomRepository.getNumberFactByCategory(searchTerm, category).then(result => {
                categoryFact.number = result.data.number;
                categoryFact.text   = result.data.text;   
            }).catch(err => {
                console.log(err);
            });
            

            return categoryFact;
        },

        async createSearch() {
            this.isLoading = true;

            this.result = [];
            var searchTerms = [];

            // Set regex to igonre '/' for Date searches
            var separators  = (this.selectedOption === 2) ? /[ ,.;]/g : /[ ,.;/]/g;
            var forbidden   = (this.selectedOption === 2) ? /[ a-zA-Z]/g : /[ /a-zA-Z]/g;

            this.inputText.split(separators).forEach(term => {
                term = term.replace(forbidden, '');

                if(term != "" && (term.split('/').length - 1) <= 1)
                    searchTerms.push(term);
            });
            
            for(var i = 0; i < searchTerms.length; i++) {
                this.result.push(await this.getFactByCategory(searchTerms[i], optionsMap[this.selectedOption]));
            }

            this.isLoading = false;
            
        },

        onOptionChanged(newOption) {
            this.selectedOption = newOption;
        }
    }
}
</script>
