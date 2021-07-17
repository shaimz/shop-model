import {createApp} from 'vue'
import App from './App.vue'
import router from './router';
import store from './store/store';
import PrimeVue from 'primevue/config';
import Menubar from "primevue/menubar";
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';

import {library} from '@fortawesome/fontawesome-svg-core';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';

const app = createApp({});

app.component('Menubar', Menubar)
app.component('InputSwitch', InputSwitch)
app.component('InputText', InputText)
app.component('Button', Button)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)

app.config.globalProperties.$router = router;

import $ from 'jquery';

library.add(faPlus);
app.component('font-awesome-icon', FontAwesomeIcon);

app.component('recursive-component', {
    template: `
        <div v-if="item" v-for="e in item" class="padding">
            <div @click="() => {selected(e.id); goto(e)}" :data-parent-id="e.parent_id" :data-id="e.id"
                 :class="[$router.currentRoute.value.fullPath.includes(e.slug) ? 'active' : '',e.id === activeClass ? 'active-cat' : '']"
                 class="category-name">{{e.name}}</div>
            <div v-if="e.children" class="children" style="display:none">
                <recursive-component :active-class="activeClass" :selected="selected" :goto="goto" :item="e.children">

                </recursive-component>
            </div>
        </div>`,
    props: {
        item: Object,
        selected: Function,
        goto: Function,
        activeClass: Number
    },
    mounted() {
        if (!this.$router.currentRoute.value.path.includes('admin')) {
            let parent = $('.category-name.active').attr('data-id');
            let category = $('.category-name.active').attr('data-parent-id');
            let check = $('.category-name.active').parent().parent()

            if (typeof parent === 'undefined') {
                $('.category-name[data-parent-id="0"]').next('.children').hide()
            }
            if (check[0]) {
                while (check.prev().attr('data-parent-id')) {
                    check.show()
                    check = check.parent().parent();
                }
            }
            $('.category-name.active + .children').show()

            // $('.category-name.active').parent().prev().find('.children').hide()
            // $('.category-name.active').parent().parent().find('.category-name[data-parent-id="' + category + '"]:not(.active)').find('.children').hide()
            // $('.category-name.active').parent().find('.category-name[data-parent-id="' + parent + '"]').parent().find('.children').hide()
            // $('.category-name.active').parent().find('.category-name[data-parent-id="' + parent + '"]').parent().show()
        }
    },
    watch: {},
    methods: {
        select(id: number) {
            this.$emit('categ', id);
        }
    }
})


app.component('app', App);

app.use(router).use(store).use(PrimeVue, {ripple: true});

app.mount('#app');

require('./bootstrap');
