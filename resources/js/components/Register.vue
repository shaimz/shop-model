<template>
    <div v-if="!isLoggedIn" id="login">
        <h1>Register</h1>
        <input type="text" name="Username" v-model="input.name" placeholder="Username"/>
        <input type="text" name="Email" v-model="input.email" placeholder="Email"/>
        <input type="password" name="password" v-model="input.password" placeholder="Password"/>
        <input type="password" name="password_confirmation" v-model="input.password_confirmation" placeholder="Password"/>
        <button type="button" v-on:click="register()">Register</button>
        <p class="text-red">{{error}}</p>
    </div>
</template>

<script>
    import { defineComponent, ref, getCurrentInstance, computed } from 'vue';
    import { useStore } from 'vuex';
    import axios from "axios";

    export default defineComponent({
        setup() {
            const input = ref({name:'',password:'',password_confirmation:'',email:''});
            const error = ref('');
            const store = useStore();
            const isLoggedIn = computed(() => store.state.isLoggedIn);
            const { appContext : { config: { globalProperties } } } = getCurrentInstance()

            const clearInput = () => {
                input.value.name = '';
                input.value.password = '';
                input.value.password_confirmation = '';
                input.value.email = '';
            }

            const register = () => {
                if (input.value.email !== "" && input.value.password !== "") {
                    axios.post('/api/checkUser',{email:input.value.email}).then((response)=>{
                        if (response.errors) {
                            error.value = 'User already registered!'
                        } else {
                            axios.post('/register',input.value).then(()=>{
                                store.dispatch('isLogged');
                                globalProperties.$router.push({name:'home'})
                            });
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
                isLoggedIn,
                register,
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
