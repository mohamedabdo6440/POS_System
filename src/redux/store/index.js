import { configureStore } from '@reduxjs/toolkit'
import Allproducts from './ProductsSlice'
import AllCompanies from './CompaniesSlice'
import AllSeries from './SeriesSlice'
import AllOrders from './OrdersSlice'
import AllClients from './ClientsSlice'
import AllModels from './ModelsSlice'
import AllUsers from './UsersSlice'
import AllCustomers from './CustomersSlice'
import LoginSlice from './LoginSlice'
import Carts from './CartsSlice'
import CartItems from './CartItemsSlice'
import CartDataSlice from './CartDataSlice'
import LoaderSlider from "./LoaderSlider"   
import CustomerSliceCart from "./CustomerSliceCart"
export const store = configureStore({
    reducer: {
        carts: Carts,
        companies: AllCompanies,
        products: Allproducts,
        users: AllUsers,
        series: AllSeries,
        orders: AllOrders,
        clients: AllClients,
        customers: AllCustomers,
        models: AllModels,
        login: LoginSlice,
        cartItems: CartItems,
        CartData: CartDataSlice,
        LoaderSlider,
        CustomerSliceCart
    },
})
