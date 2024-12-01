import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Login from "./pages/Login/Login";
import AddProduct from "./components/Admin/Products/AddProduct";
import RegisterForm from "./components/Users/Forms/RegisterForm";
import Navbar from "./components/Navbar/Navbar";
import OrderPayment from "./pages/Checkout/OrderPayment";
import ManageCategories from "./components/Admin/Categories/ManageCategories";
import ManageStocks from "./components/Admin/Products/ManageStocks";
import CategoryToAdd from "./components/Admin/Categories/CategoryToAdd";
import AddCategory from "./components/Admin/Categories/AddCategory";
import AddBrand from "./components/Admin/Categories/AddBrand";
import AddColor from "./components/Admin/Categories/AddColor";
import UpdateCoupon from "./components/Admin/Coupons/UpdateCoupon";
import Product from "./pages/PDP/PDP";
import ShoppingCart from "./pages/Cart/ShoppingCart";
import AddReview from "./components/Users/Reviews/AddReview";
import UpdateCategory from "./components/Admin/Categories/UpdateCategory";
import OrdersList from "./components/Admin/Orders/OdersList";
import ManageOrders from "./components/Admin/Orders/ManageOrders";
import Customers from "./components/Admin/Orders/Customers";
import BrandsColorsList from "./components/Admin/Categories/BrandsColorsList";
import AdminAuthRoute from "./components/AuthRoute/AdminAuthRoute";
import TYP from "./pages/TYP/TYP";
import ProductUpdate from "./components/Admin/Products/ProductUpdate";
import UpdateOrders from "./components/Admin/Orders/UpdateOrders";
import LandingPage from "./pages/LP/LP";
import Footer from "./components/Footer/Footer";
import PLP from "./pages/PLP/PLP";
import UserProfile from "./pages/UserProfile/UserProfile";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import MyOrders from "./components/MyOrders/MyOrders";
import ChangeAddress from "./components/ChangeAddress/ChangeAddress";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import Logout from "./components/Logout/Logout";

const App = () => {
  return (
    <BrowserRouter>
      {/* hide navbar if admin */}
      <Navbar />
      <Routes>
        {/* nested user route */}
        <Route
          path="user-profile"
          element={
            <AuthRoute>
              <UserProfile />
            </AuthRoute>
          }
        >
          <Route path="" element={<MyOrders />} />
          <Route path="address" element={<ChangeAddress />} />
          <Route path="user-data" element={<ChangePassword />} />
          <Route path="logout" element={<Logout />} />
        </Route>

        {/* nested admin route */}
        <Route
          path="admin"
          element={
            <AuthRoute>
              <AdminAuthRoute>
                <AdminDashboard />
              </AdminAuthRoute>
            </AuthRoute>
          }
        >
          {/* products */}
          <Route path="" element={<OrdersList />} />
          <Route path="dashboard" element={<OrdersList />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="products" element={<ManageStocks />} />
          <Route path="products/edit/:id" element={<ProductUpdate />} />
          {/* Category */}
          <Route path="add-category" element={<AddCategory />} />
          <Route path="categories" element={<ManageCategories />} />
          <Route path="edit-category/:id" element={<UpdateCategory />} />
          {/* brand category */}
          <Route path="add-brand" element={<AddBrand />} />
          <Route path="all-brands" element={<BrandsColorsList />} />
          {/* color category */}
          <Route path="add-color" element={<AddColor />} />
          <Route path="colors" element={<BrandsColorsList />} />
          {/* Orders */}
          <Route path="orders" element={<ManageOrders />} />
          <Route path="order-payment" element={<OrderPayment />} />
          <Route path="customers" element={<Customers />} />
          {/* Logout */}
          <Route path="logout" element={<Logout />} />
        </Route>

        {/* public links */}
        {/* Products */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/products-filters" element={<PLP />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="success" element={<TYP />} />

        {/* review */}
        <Route path="/add-review/:id" element={<AddReview />} />

        {/* shopping cart */}
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/order-payment" element={<OrderPayment />} />

        {/* users */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
