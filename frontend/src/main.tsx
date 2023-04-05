import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './styles/style.css';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/HomePage';
import ProductList from './pages/products/List';
import CategoryList from './pages/categories/List';
import VariantList from './pages/variants/List';
import { Provider } from 'react-redux';
import store from "./redux/store";
import axios from 'axios';
import VariantDetails from './pages/variants/Details';
import SubProducts from './pages/products/SubProducts';
import LoginPage from './pages/auth/Login';
import Upload from './pages/import/Upload';

axios.defaults.baseURL = "http://localhost:5001/api/";
axios.defaults.headers["Content-Type"] = "application/json";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/products' element={<ProductList />}></Route>
            <Route path='/products/:productId/subProducts' element={<SubProducts />}></Route>
            <Route path='/categories' element={<CategoryList />}></Route>
            <Route path='/variants' element={<VariantList />}></Route>
            <Route path='/import' element={<Upload />}></Route>
            <Route path='/variants/:variantId/details' element={<VariantDetails />}></Route>
          </Route>
          <Route path='/auth/login' element={<LoginPage />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
