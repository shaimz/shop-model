<template>
    <div class="content d-flex justify-content-around">
        <div class="categories">
            <h4>Categories</h4>
            <div class="padding">
                <div class="category-name" @click="selectCategory('all')" data-id="all">All Products</div>
            </div>

            <recursive-component :goto="selectCategory" :selected="() => {}" :item="categories">

            </recursive-component>

        </div>
        <div class="products">
            <div class="product-cards d-grid ">
                <div class="card" v-for="product in products">
                    <h3>{{product.name}}</h3>
                    <p>{{product.description}}</p>
                    <div class="body">
                        <p>{{formatPrice(product.price)}}</p>
                    </div>
                    <div class="footer mt-auto">
                        <button class="btn btn-primary mr-4" @click="add(product)">Add to cart</button>
                        <router-link :to="{name:'product',params:{slug:product.url}}" class="btn btn-primary">See product</router-link>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
    import {defineComponent, ref, reactive, computed, watch, getCurrentInstance} from 'vue';
    import {useStore} from "vuex";
    import axios from "axios";
    import { useRoute, useRouter } from 'vue-router';

    export default defineComponent({
        setup() {
            const store = useStore();
            const router = useRoute();
            const route = useRouter();
            const categories = computed(() => store.state.categories);
            const products = computed(() => store.state.products);
            const cart = localStorage.getItem('cart') ? JSON.parse(String(localStorage.getItem('cart'))) : [];

            store.commit('SET_CART', cart);

            store.dispatch('fetchCategories');

            console.log(typeof router.params.slug === 'undefined')
            if(typeof router.params.slug === 'undefined') store.dispatch('fetchProducts','');
            else store.dispatch('fetchCategoryProducts',router.params.slug);


            const formatPrice = (price: number) => {
                return price.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
            }

            const add = (product: object) => {
                store.commit('ADD_CART', product);
            }

            const remove = (product: object) => {
                store.commit('REMOVE_ITEM', product);
            }

            const update = (product: object) => {
                store.commit('UPDATE_CART', product);
            }

            const selectCategory = (value: any) => {
                if(value === 'all'){
                    store.dispatch('fetchProducts',value.slug);
                    route.push({name:'home'})
                    return 0;
                }
                store.dispatch('fetchCategoryProducts',value.slug);
                route.push({name:'category',params:{slug:value.slug ? value.slug : 'all'}})
            }

            return{
                categories,
                products,
                cart,
                selectCategory,
                formatPrice,
                add,
                update,
                remove
            }
        }
    })
</script>
<style scoped>
    .categories{
        padding:20px 0;
        background-color: white;
        max-width: 450px;
        width:100%;
    }

    .categories h4{
        padding:0 20px
    }

    .content{
        margin-top:80px
    }

    .product-cards{
        display:grid;
        grid-template-columns: repeat(3,minmax(350px,400px));
    }
    .product-cards .card{
        margin:25px;
        padding:20px;
    }

</style>
