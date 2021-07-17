// import {reactive, readonly} from 'vue';
//
//
// export abstract class Store<T extends Object>{
//     protected state: T;
//
//     constructor() {
//         let data = this.data();
//         this.setup(data);
//         this.state = reactive(data) as T
//     }
//
//     protected abstract data(): T;
//
//     protected setup(data: T): void{}
//
//     public getState(): T {
//         return readonly(this.state) as T
//     }
// }

import axios from "axios";
import {createStore} from "vuex";

function recalculate(state: any){
    return state.cart.reduce((r: any, currentValue: any) => {
        return r + currentValue.price * currentValue.quantity;
    },0)
}

export default createStore({
    state: {
        isLoggedIn: false,
        user: null,
        products: [],
        product:[],
        orders: [],
        cart: [],
        total:0,
        categories: [],
        userInfo:[]
    },
    mutations: {
        SET_USER(state, data) {
            state.user = data;
        },
        SET_USER_INFO(state,data){
            state.userInfo = data;
        },
        SET_ORDERS(state, data) {
            state.orders = data;
        },
        IS_LOGGED(state, data) {
            state.isLoggedIn = data;
        },
        SET_PRODUCTS(state, data) {
            state.products = data;
        },
        SET_PRODUCT(state, data){
            state.product = data;
        },
        SET_CATEGORY(state, data) {
            // @ts-ignore
            state.categories.push(data);
        },
        SET_CATEGORIES(state, data) {
            state.categories = data;
        },
        DELETE_CATEGORY(state, data) {
            state.categories = state.categories.filter((category: any) => {
                return category.id != data.id;
            });
        },
        SET_CART(state, items) {
            state.cart = items;

            state.total = recalculate(state);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        ADD_CART(state: any, item: any) {
            let exists = state.cart.find((i: any) => i.id === item.id)

            if (!exists) {
                state.cart.push({...item,quantity:1});
            } else {
                exists.quantity++;
            }

            state.total = recalculate(state);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        UPDATE_CART(state: any, updatedItem) {
            state.cart = state.cart.map((cartItem: any) => {
                if (cartItem.id == updatedItem.id) {
                    cartItem.quantity++;
                    return updatedItem;
                }
                return cartItem;
            });

            state.total = recalculate(state);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        REMOVE_ITEM(state: any, item) {
            state.cart = state.cart.filter((cartItem: any) => {
                return cartItem.id != item.id;
            });

            state.total = recalculate(state);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        DECREASE_QUANTITY(state: any, item){
            let data = state.cart.find((i: any) => i.id === item.id)

            if(data){
                if(data.quantity > 1){
                    data.quantity--;
                }else{
                    state.cart = state.cart.filter((i: any) => {return i.id !== item.id})
                }
            }

            state.total = recalculate(state);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        CALCULATE_TOTAL(state){
            state.total = recalculate(state);
        }
    },
    actions: {
        async isLogged(context, data) {
            await context.commit('IS_LOGGED', data)
        },
        async fetchUser(context, payload: object) {
            await axios.post('/login', payload).then((response) => {
                context.commit('SET_USER', true)
            }).catch((e) => {
                if (e) {
                    context.commit('SET_USER', false)
                }
            })
        },
        async fetchUserInfo(context, payload: object){
          await axios.post('/api/userInfo',{id:payload}).then((response)=>{
              context.commit('SET_USER_INFO',response.data)
          })
        },
        async fetchOrders(context, payload: object) {
            await axios.get('/api/order', payload).then((response) => {
                context.commit('SET_ORDERS', response.data)
            });
        },
        async fetchCategoryProducts(context, payload: string) {
            await axios.get('/api/products/slug=' + payload).then((response) => {
                context.commit('SET_PRODUCTS', response.data);
            })
        },
        async fetchProducts(context, payload: string) {
            await axios.get('/api/product').then((response) => {
                context.commit('SET_PRODUCTS', response.data);
            })
        },
        async fetchProduct(context, payload: object){
          await axios.get('/api/product/'+payload).then((response) => {
              context.commit('SET_PRODUCT', response.data)
          })
        },
        async fetchCategories(context, payload: object) {
            await axios.get('/api/category').then((response) => {
                if (response.status === 200) {
                    context.commit('SET_CATEGORIES', response.data);
                }
            })
        },
        async createCategory(context, payload: object) {
            await axios.post('/api/category', payload).then((response) => {
                context.commit('SET_CATEGORY', response.data);
            })
        },
        async createOrder(context,payload: object){
            await axios.post('/api/order',payload).then((r)=>{
               console.log(r)
            })
        }
    },
    getters: {
        getUser(state) {
            return state.user;
        },
        getStatusUser(state) {
            return state.isLoggedIn;
        },
        getProducts(state) {
            return state.products;
        },
        getCategories(state) {
            return state.categories;
        }
    }

});
