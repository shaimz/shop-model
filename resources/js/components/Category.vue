<template>

</template>

<script lang="ts">
    import {defineComponent, ref, computed, getCurrentInstance} from "vue";
    import { useRoute } from "vue-router";
    import { useStore } from "vuex";


    export default defineComponent({
        setup(){
            const store = useStore();
            const router = useRoute();
            const products = computed(() => store.state.products);
            store.dispatch('fetchCategoryProducts',router.params.slug);

            return{
                store,
                products,
            }
        }
    })
</script>
