<template>
    <div v-if="permission">
        <h1>Admin panel</h1>

        <div class="add-category" :class="add ? 'd-flex align-items-center' : 'd-none'">
            <div class="mr-4">
                <p class="mb-0">Name:</p>
                <input type="text" id="name" v-model="input.name">
            </div>
            <div>
                <h3 class="mt-4">Select category:</h3>
                <div class="category-dropdown">
                    <recursive-component :active-class="category" :selected="selectCategory" :goto="() => {}" :item="categories">

                    </recursive-component>
                </div>
                <button class="btn btn-primary" @click="create">Add category</button>
            </div>
        </div>


        <div class="data-items">
            <div class="categories">
                <h3>Categories</h3>
                <div class="add" @click="add = !add">
                    <font-awesome-icon :icon='["fas","plus"]'></font-awesome-icon>
                </div>
                <div class="list-group list-group-root well mt-8">
                    <recursive-categories :categories="categories"></recursive-categories>
                </div>

            </div>
        </div>

    </div>
    <div v-else>
        <h1>Please log in...</h1>
    </div>
</template>

<script lang="ts">
    import {defineComponent, ref, computed} from 'vue';
    import {useStore} from "vuex";
    import axios from "axios";
    import RecursiveCategories from "../../components/RecursiveCategories.vue";

    export default defineComponent({
        components: {RecursiveCategories},
        setup(props, {attrs}) {
            const store = useStore();
            const user = computed(() => store.state.user);
            const permission = ref(false);
            const categories = computed(() => store.state.categories);
            const add = ref(false);
            const input = ref({name: '', parent_id: 0});
            const parent = ref({});
            const open = ref(false);
            const products = computed(() => store.state.products)
            const category = ref(0);

            store.dispatch('fetchCategories')

            const getUser = (): void => {
                axios.get('/api/user/' + attrs['user']).then((r) => permission.value = r.data)
            }
            const create = () => {
                if (input.value.name) {
                    store.dispatch('createCategory', input.value).then(() => {
                        store.dispatch('fetchCategories');
                        input.value.name = '';
                        input.value.parent_id = 0;
                    });
                }
            }
            const selectCategory = (value: number) => {
                if(category.value === value) category.value = 0;
                else category.value = value;
                input.value.parent_id = value;
            }


            getUser();

            return {
                user,
                store,
                permission,
                categories,
                add,
                input,
                parent,
                open,
                products,
                category,
                getUser,
                selectCategory,
                create
            }
        }
    })
</script>

<style scoped>
    .add {
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 50px;
        max-height: 50px;
        height: 50px;
        border: 1px solid #cdcdcd;
        cursor: pointer;
    }

    input {
        border: 1px solid #cdcdcd;
    }
</style>
