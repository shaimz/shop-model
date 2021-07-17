//
// import axios from "axios";
//
// // interface User extends Object{
// //     user: object | null,
// //     orders: object[],
// //     userInfo: object
// // }
// //
// // class UserStore extends Store<User>{
// //     protected data(): User{
// //         return{
// //             user:null,
// //             orders:[],
// //             userInfo:{}
// //         }
// //     }
// //
// //     async isLoggedIn(payload: object){
// //         // @ts-ignore
// //         this.state.user = window.auth_user;
// //     }
// //     async fetchUser(payload: object){
// //         this.state.userInfo = await axios.post('/login',payload).then((response)=>{return response.data});
// //     }
// //
// //     async fetchOrders(payload: object){
// //         this.state.orders = await axios.get('/api/order',payload).then((response)=>{return response.data});
// //     }
// // }
// //
// // export const userStore: UserStore = new UserStore();
//
//
// import {Accessors, createStore, State, StoreAPI} from 'vue-dfs-store';
//
// type UserState = {
//     user: object | null,
//     orders: object[],
//     userInfo: object
// };
//
// type UserAccessors = {
//     isLoggedIn: () => void;
//     fetchUser: (payload: object) => void;
//     fetchOrders: (payload: object) => void;
// };
//
// const userStore = createStore<UserState, UserAccessors>({
//     name: 'userStore',
//     initialState: {
//         user: null,
//         userInfo:{},
//         orders:[]
//     },
//     accessorsCreator: (mutate, get) => ({
//         isLoggedIn: () => mutate(state => {
//             // @ts-ignore
//             state.user = window.auth_user;
//         }),
//         fetchUser: (payload: object) => mutate(async state => {
//             state.userInfo = await axios.post('/login',payload).then((response)=>{return response.data});
//
//         }),
//         fetchOrders: (payload: object) => mutate(async state => {
//             state.orders = await axios.get('/api/order',payload).then((response)=>{return response.data});
//
//         }),
//     }),
//     mutatorHook: state => console.log(state),
// });
//
// export default userStore;
//
// export type Store<T extends State, U extends Accessors> = {
//     readonly name: string;
//     storeAPI: StoreAPI<T, U>;
//     install: (app: App) => void; // makes Store implement Plugin from vue
//     readonly storeKey: symbol;
//     provider: () => void;
// };
