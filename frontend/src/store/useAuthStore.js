import { create } from 'zustand';

const useAuthStore = create((setter, getter) => ({
    authUser: {name:"amrita", _id: 123, age: 21},
    isLoggedIn: false,

    login: () => {
        console.log("We just logged in");
        setter({isLoggedIn: true});
    }
}))

export default useAuthStore;