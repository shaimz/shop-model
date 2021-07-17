<template>
    <div v-if="!isLoggedIn" id="login">
        <h1>Login</h1>
        <input type="text" name="username" v-model="input.email" placeholder="Username"/>
        <input type="password" name="password" v-model="input.password" placeholder="Password"/>
        <button type="button" v-on:click="login()">Login</button>
        <p class="text-red">{{error}}</p>
        <p>{{isLoggedIn}}</p>
    </div>
</template>

<script>
    import { defineComponent, ref, onMounted, getCurrentInstance, computed } from 'vue';
    import { useStore } from 'vuex';

    export default defineComponent({
        setup(props,{ attrs, root }) {
            const input = ref({email:'',password:''});
            const error = ref('');
            const store = useStore();
            const user = computed(() => store.state.user );
            const isLoggedIn = computed(() => store.state.isLoggedIn )
            const { appContext : { config: { globalProperties } } } = getCurrentInstance()

            const clearInput = () => {
                input.value.email = '';
                input.value.password = '';
            }

            onMounted(()=>{
                store.dispatch('isLogged',attrs['user'])
            })
            const login = () => {
                if (input.value.email !== "" && input.value.password !== "") {
                    store.dispatch('fetchUser',input.value).then(()=>{
                        if (user) {
                            store.dispatch('isLogged',true).then(()=>{
                                localStorage.setItem('user',true);
                                window.location.href = '/';
                            })
                        } else {
                            error.value = 'Email or password is incorrect!'
                        }
                    });
                } else {
                    console.log("A email and password must be present");
                }
            }

            clearInput()

            return{
                input,
                error,
                store,
                user,
                isLoggedIn,
                login,
                clearInput
            }
        }
    })
</script>

<style scoped>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>
