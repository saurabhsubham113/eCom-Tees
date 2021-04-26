import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

//private routes component
import AdminRoutes from "./auth/helper/AdminRoutes";
import PrivateRoutes from "./auth/helper/PrivateRoutes";

//components
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import UserDashBoard from './user/UserDashBoard'

//admin components
import AdminDashBoard from './user/AdminDashBoard'
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategories from './admin/UpdateCategories';
import Cart from './core/Cart';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/cart" exact component={Cart} />
                <PrivateRoutes path="/user/dashboard" exact component={UserDashBoard} />
                <AdminRoutes path="/admin/dashboard" exact component={AdminDashBoard} />
                <AdminRoutes path="/admin/create/category" exact component={AddCategory} />
                <AdminRoutes path="/admin/categories" exact component={ManageCategories} />
                <AdminRoutes path="/admin/create/product" exact component={AddProduct} />
                <AdminRoutes path="/admin/products" exact component={ManageProducts} />
                <AdminRoutes path="/admin/product/update/:id" exact component={UpdateProduct} />
                <AdminRoutes path="/admin/category/update/:id" exact component={UpdateCategories} />
            </Switch>
        </Router>
    )
}

export default Routes
