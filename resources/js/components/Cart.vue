<template>
    <div class="container-fluid mb-4 px-5 py-5">
        <div class="row d-flex flex-row-reverse justify-content-around">
            <checkout :validate="checkForm" :cart="cartProducts" :total="total"></checkout>
            <div class="col-4">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col"> </th>
                            <th scope="col">Product</th>
                            <th scope="col">Quantity</th>
                            <th scope="col" class="text-center">Price</th>
                            <th> </th>
                        </tr>
                        </thead>
                        <tbody>
                        <cart-item v-for="product in cartProducts" :key="product.id" :product="product">

                        </cart-item>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><strong>Total</strong></td>
                            <td class="text-right"><strong>{{formatPrice(total)}}</strong></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-12 mb-2">
            <div class="row">
                <div class="col-sm-12  col-md-6">
                    <router-link :to="{name:'home'}" class="btn btn-block btn-light">Continue Shopping</router-link>
                </div>
                <div class="col-sm-12 col-md-6 text-right">
                    <button class="btn btn-lg btn-block btn-success text-uppercase" @click="checkForm = true">Checkout</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, computed, defineAsyncComponent } from 'vue'
    import {useStore} from "vuex";

    export default defineComponent({
        components:{
            cartItem: defineAsyncComponent(() => import('./cart/CartItem.vue')),
            checkout: defineAsyncComponent(() => import('./Checkout.vue'))
        },
        setup(){
            const store = useStore();
            const cartProducts = computed(() => store.state.cart );
            const total = computed(() => store.state.total);
            const formatPrice = (price: number) => {
                return price.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
            }
            const checkForm = ref(false);

            return{
                store,
                cartProducts,
                total,
                checkForm,
                formatPrice
            }
        }
    })
</script>
