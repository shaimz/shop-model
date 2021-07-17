<template>
    <tr>
        <td><img src="https://dummyimage.com/50x50/55595c/fff" /> </td>
        <td>{{product.name}}</td>
        <td class="d-flex align-items-center">
            <span class="border p-2 mx-4">{{product.quantity}}</span>
            <button class="btn btn-success mr-2" @click="increment(product)">+</button>
            <button class="btn btn-danger" @click="decrement(product)">-</button>
        </td>
        <td class="text-right">{{formatPrice(itemPrice)}}</td>
        <td class="text-right"><button class="btn btn-sm btn-danger" @click="remove(product)"><i class="fa fa-trash"></i></button></td>
    </tr>
</template>

<script lang="ts">
    import { defineComponent, computed, toRefs, toRef } from 'vue';
    import {useStore} from 'vuex';

    export default defineComponent({
        props:{
            product: Object
        },
        setup(props){
            const store = useStore();
            const product: any = props.product;
            const itemPrice = computed(() => product.price * product.quantity)
            const formatPrice = (price: number) => {
                return price.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
            }

            const increment = () => {
                store.commit('UPDATE_CART',product);
            }
            const decrement = () => {
                store.commit('DECREASE_QUANTITY',product)
            }
            const remove = () => {
                store.commit('REMOVE_ITEM',product)
            }

            return{
                product,
                itemPrice,
                formatPrice,
                increment,
                decrement,
                remove
            }
        }
    })
</script>
