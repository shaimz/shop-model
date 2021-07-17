<template>
    <div class="col-md-6 order-md-1">
        <h4 class="mb-3">Billing address</h4>
        <form class="needs-validation" novalidate>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="firstName">Name</label>
                    <input type="text" class="form-control" id="firstName" v-model="form.name" placeholder="" required>
                </div>
            </div>

            <div class="mb-3">
                <label for="email">Email <span class="text-muted"></span></label>
                <input type="email" class="form-control" id="email" v-model="form.email" placeholder="you@example.com" required></div>

            <div class="mb-3">
                <label for="phone">Phone <span class="text-muted" ></span></label>
                <input type="text" class="form-control" id="phone" v-model="form.phone" placeholder="">
            </div>

            <hr class="mb-4">
        </form>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, watch, computed, onMounted } from 'vue';
    import {useStore} from "vuex";

    export default defineComponent({
        props:['validate','cart','total'],
        setup(props){
            const validate = props.validate;
            const cart = props.cart;
            const total = props.total;
            const store = useStore();
            const user_id = computed(() => store.state.user);
            const user = computed(() => store.state.userInfo);
            const form: any = ref({})
            store.dispatch('fetchUserInfo',user_id.value).then(() => {
                form.value = {
                    user_id:user.value.id ? user.value.id : null,
                    name:user.value.name ? user.value.name : '',
                    email: user.value.email ? user.value.email : '',
                    phone: user.value.phone ? user.value.phone : '',
                    products: cart,
                    total: total
                }
            })



            watch(() => props.validate, (newVal) => {
                if (newVal) {
                    if((form.value.email || form.value.phone) && form.value.products){
                        store.dispatch('createOrder',form.value).then(() => {
                            store.commit('SET_CART',[]);
                        })
                    }
                }
            });

            return {
                form,
                validate,
                cart,
                total,
                user_id,
                user
            }
        }
    })
</script>
