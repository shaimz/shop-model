<template>
    <Menubar :model="menuItems"></Menubar>
    <router-view :key="router.path" :user="$attrs.user"></router-view>
</template>

<script>
    import {computed, defineComponent, reactive, ref, watch} from 'vue'
    import {useStore} from "vuex";
    import {useRoute} from 'vue-router';
    import axios from "axios";

    export default defineComponent({
        setup(props,{attrs}) {
            const sidebar = ref(false);
            const store = useStore();
            const router = useRoute();
            const isLoggedIn = computed(() => {
                return localStorage.getItem('user');
            })

            store.commit('SET_USER',attrs.user);

            let menuItems = reactive([]);
            const setItemsDefault = () => {
                menuItems.push(
                    {
                        label: 'Home', to: '/', icon: 'pi pi-fw pi-home'
                    },
                    {
                        label: 'Sign up', to: '/signup', icon: 'pi pi-fw pi-power-off'
                    },
                    {
                        label: 'Sign in', to: '/sign', icon: 'pi pi-fw pi-users'
                    },
                    {
                        label: 'Cart', to:'/cart', icon: 'pi pi-fw pi-cart'
                    }
                )
            }

            const setItemsLogged = () => {
                menuItems.push(
                    {
                        label: 'Home', to: '/', icon: 'pi pi-fw pi-home'
                    },
                    {
                        label: 'Logout', command: () => logout(), icon: 'pi pi-fw pi-home'
                    },
                    {
                        label: 'Cart', to:'/cart', icon: 'pi pi-fw pi-cart'
                    }
                )
            }
            watch(() => isLoggedIn, () => {
                if (!isLoggedIn.value) {
                    setItemsDefault()
                } else {
                    setItemsLogged()
                }

            },{immediate:true});

            const logout = () => {
                axios.post('/logout').then(()=>{
                    localStorage.removeItem('user');
                    window.location.href = '/';
                });
            }

            store.commit('SET_CART',localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [])
            store.commit('CALCULATE_TOTAL');

            return {
                sidebar,
                menuItems,
                isLoggedIn,
                store,
                router,
                setItemsDefault,
                setItemsLogged
            }
        }
    })
</script>

<style>
    #app{
        margin-left: 20px;
    }
    .d-none{
        display:none;
    }

    .d-block{
        display:block;
    }
</style>
