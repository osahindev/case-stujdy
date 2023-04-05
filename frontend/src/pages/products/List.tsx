import { AdjustmentsHorizontalIcon, ArrowDownTrayIcon, ChevronLeftIcon, ChevronRightIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import ButtonDark from "../../components/buttons/ButtonDark";
import ButtonSecondary from "../../components/buttons/ButtonSecondary";
import SubHeader from "../../components/header/SubHeader";
import EmptyTable from "../../components/table/EmptyTable";
import Table from "../../components/table/Table";
import Thead from "../../components/table/Thead";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { getProducts } from "../../redux/slices/product/thunks/getProducts";
import ProductRow from "./Partials/Row";
import { getCategories } from "../../redux/slices/category/thunks/getCategories";
import { getVariantsWithData } from "../../redux/slices/variant/thunks/getVariantsWithData";
import NewProductModal from "./Partials/NewModal";
import { setNewModalIsOpen } from "../../redux/slices/product/productSlice";
import { Link, useSearchParams } from "react-router-dom";
import DeleteModal from "./Partials/DeleteModal";
import EditModal from "./Partials/EditModal";
import { FilterProduct } from "../../redux/slices/product/interfaces/FilterProduct";

export default function ProductList() {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.product.products);
    const categories = useAppSelector((state) => state.category.categories);
    const [searchParams] = useSearchParams();
    const pageStr = searchParams.get("page");
    const page = pageStr != undefined ? parseInt(pageStr) : 1;
    const perPage = products.per_page;
    const filterName = searchParams.get("name");
    const filterCategoryId = searchParams.get("category_id");
    const filterStockAmount = searchParams.get("stock_amount");
    const filterStockDetails = searchParams.get("stock_details");
    const initialFilters = {
        page: page,
        name: filterName != undefined ? filterName : undefined,
        stock_amount: filterStockAmount != undefined && !Number.isNaN(filterStockAmount) ? parseInt(filterStockAmount) : undefined,
        stock_details: (filterStockDetails != undefined) ? filterStockDetails : "fazla",
        category_id: filterCategoryId != undefined ? parseInt(filterCategoryId) : undefined,
    } as FilterProduct;

    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        dispatch(getVariantsWithData());
        dispatch(getCategories());
    }, [dispatch, getCategories, getVariantsWithData]);

    useEffect(() => {
        dispatch(getProducts(filters));
    }, [dispatch, getProducts, filters.page]);
    return (
        <>
            <SubHeader text="Ürün listesi">
                <ButtonDark
                    onClick={() => dispatch(setNewModalIsOpen(true))}
                    icon={
                        <PlusCircleIcon
                            className="-ml-0.5 mr-2 h-4 w-4"
                            aria-hidden="true"
                        />
                    }
                >
                    Yeni Ürün
                </ButtonDark>
            </SubHeader>
            <EditModal />
            <DeleteModal />
            <NewProductModal title={"Yeni ürün formu"} />
            <div className="flex flex-col mb-10 sm:mx-0 mx-4 bg-white rounded p-4 shadow ring-1 ring-black ring-opacity-5">
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-between gap-4">
                    <div className="flex flex-1 flex-col">
                        <label htmlFor="filterProductName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">İsim</label>
                        <input type="text" id="filterProductName" value={filters.name ?? ""} onChange={e => setFilters({ ...filters, name: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ürünün ismini girebilirsiniz." />
                    </div>
                    <div className="flex flex-1 flex-col">
                        <label htmlFor="filterProductStockAmount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stok miktarı</label>
                        <div className="relative rounded-md shadow-sm">
                            <input
                                type="number"
                                name="price"
                                id="filterProductStockAmount"
                                min={0}
                                value={filters.stock_amount ?? ""}
                                onChange={e => setFilters({ ...filters, stock_amount: parseInt(e.target.value) <= 0 ? undefined : parseInt(e.target.value) })}
                                className="no-spinner bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Adet giriniz."
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                                <label htmlFor="currency" className="sr-only">
                                    Currency
                                </label>
                                <select
                                    id="currency"
                                    value={filters.stock_details ?? "fazla"}
                                    onChange={e => setFilters({ ...filters, stock_details: e.target.value })}
                                    name="currency"
                                    className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm"
                                >
                                    <option value="fazla">Daha fazlası</option>
                                    <option value="az">Daha azı</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col">
                        <label htmlFor="filterProductCategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kategori</label>
                        <select name="" value={filters.category_id ?? ""} onChange={e => setFilters({ ...filters, category_id: e.target.value != "" ? parseInt(e.target.value) : undefined })} id="filterProductCategory" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="">Kategori seçiniz.</option>
                            {
                                categories.length > 0 ? categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>) : null
                            }
                        </select>
                    </div>
                    <div className="grid grid-cols-2 col-span-1 md:col-span-3 lg:col-span-1 justify-between gap-4">
                        <div className="flex flex-1 flex-col">
                            <label htmlFor="newProductCategory" className="sr-only">asd</label>
                            <ButtonDark icon={
                                <AdjustmentsHorizontalIcon className="-ml-0.5 mr-2 h-4 w-4" />
                            } className={"mt-7 py-2.5"} onClick={() => dispatch(getProducts(filters))}>
                                FİLTRELE
                            </ButtonDark>
                        </div>
                        <div className="flex flex-1 flex-col">
                            <label htmlFor="newProductCategory" className="sr-only">asd</label>
                            <ButtonDark icon={
                                <AdjustmentsHorizontalIcon className="-ml-0.5 mr-2 h-4 w-4" />
                            } className={"mt-7 py-2.5"} onClick={() => {
                                setFilters(initialFilters);
                                dispatch(getProducts(initialFilters));
                            }}>
                                SIFIRLA
                            </ButtonDark>
                        </div>
                    </div>
                </div>
            </div>
            <Table>
                <Thead>
                    <tr>
                        <th
                            scope="col"
                            className="py-3.5 px-6 text-left text-sm font-semibold text-gray-900"
                        >
                            İsim
                        </th>
                        <th
                            scope="col"
                            className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                        >
                            Kategori
                        </th>
                        <th
                            scope="col"
                            className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                        >
                            SKU
                        </th>
                        <th
                            scope="col"
                            className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                        >
                            Stok / Varyasyon
                        </th>
                        <th
                            scope="col"
                            className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                        >
                            Fiyat
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </Thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {products.items && products.items.length > 0 ? products.items.map((product) => <ProductRow key={product.id} product={product} />) : <EmptyTable key={0} colSpan={8} />}
                </tbody>
            </Table>
            <div className="flex items-center mt-4 mx-4 sm:mx-0 justify-between shadow ring-1 ring-black ring-opacity-5 border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <a
                        href="#"
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Önceki
                    </a>
                    <a
                        href="#"
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Sonraki
                    </a>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Toplam <span className="font-medium">{products.total}</span> sonuçtan <span className="font-medium">{page}.</span> sayfasındaki <span className="font-medium">{products.items != undefined && perPage > products.items.length ? products.items.length : perPage}</span> adet veri gösteriliyor.
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <a
                                href="#"
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                            {
                                products.page_list != null && products.page_list.length > 0 ? products.page_list.map((pPage) => {
                                    return <Link
                                        onClick={() => setFilters({ ...filters, page: pPage })}
                                        key={pPage}
                                        to={"/products?page=" + pPage + (filters.name != undefined ? "&name=" + filters.name : "") + (filters.category_id != undefined ? "&category_id=" + filters.category_id : "") + (filters.stock_amount != undefined && !Number.isNaN(filters.stock_amount) ? "&stock_amount=" + filters.stock_amount + "&stock_details=" + filters.stock_details : "")}
                                        aria-current="page"
                                        className={
                                            ((page == null && 1 == pPage) || (page != null && page == pPage)) ?
                                                `relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600` :
                                                `relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"`
                                        }
                                    >
                                        {pPage}
                                    </Link>;
                                }) : null
                            }
                            <a
                                href="#"
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}
