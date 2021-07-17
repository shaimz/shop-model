// import {Store} from './store';
// import axios from "axios";
//
// interface Products extends Object{
//     products: object[],
//     categories: object[]
// }
//
// class ProductStore extends Store<Products>{
//     protected data(): Products{
//         return{
//             products:[],
//             categories:[]
//         }
//     }
//
//     async fetchCategories(payload: object){
//         this.state.categories = await axios.get('/api/categories',payload).then((response)=>{return response.data});
//     }
//     async fetchProducts(payload: object){
//         this.state.products = await axios.get('/api/products',payload).then((response)=>{return response.data});
//     }
// }
//
// export const productStore: ProductStore = new ProductStore();
