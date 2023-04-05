import React, { useEffect, useState } from 'react'
import Modal from '../../../components/modal';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import ButtonDark from '../../../components/buttons/ButtonDark';
import ButtonSecondary from '../../../components/buttons/ButtonSecondary';
import { addVariant, removeVariant, setNewModalIsOpen } from '../../../redux/slices/product/productSlice';
import { Attribute, NewProduct } from '../../../redux/slices/product/interfaces/NewProduct';
import { addNewProduct } from '../../../redux/slices/product/thunks/addNewProduct';
import { getAttribute, handleAttribute } from './utils';

interface Props {
    parent_id?: number|undefined,
    title: string,
}

export default function NewProductModal(props: Props) {
    const dispatch = useAppDispatch();
    const newModalIsOpen = useAppSelector((state) => state.product.newModalIsOpen);
    const categories = useAppSelector((state) => state.category.categories);
    const variants = useAppSelector((state) => state.variant.variants);
    const [selectedVariant, setSelectedVariant] = useState(0);
    const errors = useAppSelector((state) => state.product.errors);
    const selectedVariants = useAppSelector((state) => state.product.selectedVariants);
    const initialState = {
        sku: "",
        name: "",
        parent_id: props.parent_id,
        category_id: null,
        price: null,
        stock_amount: 0,
        attributes: [] as Attribute[],
    } as NewProduct;
    const [form, setForm] = useState(initialState);

    useEffect(() => {
        if(!newModalIsOpen) {
            setForm(initialState);
        }
    }, [newModalIsOpen]);

    return (
        <Modal title={props.title} isOpen={newModalIsOpen} setOpen={() => dispatch(setNewModalIsOpen(false))} footer={
            <>
                <ButtonDark onClick={() => {
                    dispatch(addNewProduct(form))
                }}>
                    Ekle
                </ButtonDark>
                <ButtonSecondary onClick={() => dispatch(setNewModalIsOpen(false))}>
                    İptal et
                </ButtonSecondary>
            </>
        }>
            <div className="mb-4">
                <label htmlFor="newProductSku" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SKU</label>
                <input type="text" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} id="newProductSku" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ürünün SKU değerini giriniz." required />
                {
                    errors != null && Object.keys(errors).includes("errors") && Object.keys(errors.errors).includes("sku") ? <p id="helper-text-explanation" className="mt-2 text-xs text-red-500">{errors.errors.sku[0]}</p> : null
                }
            </div>
            <div className="mb-4">
                <label htmlFor="newProductName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">İsim</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} id="newProductName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ürünün ismini giriniz." required />
                {
                    errors != null && Object.keys(errors).includes("errors") && Object.keys(errors.errors).includes("name") ? <p id="helper-text-explanation" className="mt-2 text-xs text-red-500">{errors.errors.name[0]}</p> : null
                }
            </div>
            <div className="mb-4">
                <label htmlFor="newProductCategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kategori</label>
                <select name="" value={form.category_id ?? ""} onChange={(e) => setForm({ ...form, category_id: parseInt(e.target.value) })} id="newProductCategory" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="">Kategori seçiniz.</option>
                    {
                        categories.length > 0 ? categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>) : null
                    }
                </select>
                {
                    errors != null && Object.keys(errors).includes("errors") && Object.keys(errors.errors).includes("category_id") ? <p id="helper-text-explanation" className="mt-2 text-xs text-red-500">{errors.errors.category_id[0]}</p> : null
                }
            </div>
            <div className="mb-4">
                <label htmlFor="newProductPrice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fiyat</label>
                <input type="number" value={form.price ?? ""} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })} step="any" id="newProductPrice" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Eğer alt ürün olmayacaksa giriniz." />
                {
                    errors != null && Object.keys(errors).includes("errors") && Object.keys(errors.errors).includes("price") ? <p id="helper-text-explanation" className="mt-2 text-xs text-red-500">{errors.errors.price[0]}</p> : null
                }
            </div>
            <div className="mb-4">
                <label htmlFor="newProductStock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stok miktarı</label>
                <input type="number" value={form.stock_amount} onChange={(e) => setForm({ ...form, stock_amount: parseInt(e.target.value) })} id="newProductStock" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ürünün stok miktarını giriniz." />
                {
                    errors != null && Object.keys(errors).includes("errors") && Object.keys(errors.errors).includes("stock_amount") ? <p id="helper-text-explanation" className="mt-2 text-xs text-red-500">{errors.errors.stock_amount[0]}</p> : null
                }
            </div>
            {
                selectedVariants.map((attribute) => {
                    return (
                        <div key={attribute.id} className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{attribute.name} <button onClick={() => { dispatch(removeVariant(attribute)); setForm({...form, attributes: form.attributes.filter((att) => att.attribute_id !== attribute.id)}) }}>( Kaldır )</button></label>
                            <select name="" value={getAttribute(form, attribute.id) ?? 0} onChange={e => setForm(handleAttribute(form, attribute.id, parseInt(e.target.value)))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="0">Seçiniz.</option>
                                {
                                    attribute.data != null && attribute.data.length > 0 ? attribute.data.map((attribute) => <option key={attribute.id} value={attribute.id}>{attribute.value}</option>) : null
                                }
                            </select>
                        </div>
                    );
                })
            }
            {
                variants.filter((variant) => {
                    return !selectedVariants.includes(variant);
                }).length > 0 ?
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Özellik</label>
                        <div className="grid grid-cols-2 gap-2 items-center">
                            <span>
                                <select name="" id="" value={selectedVariant} onChange={(e) => setSelectedVariant(parseInt(e.target.value))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="">Özellik seç</option>
                                    {
                                        variants.length > 0 ? variants.filter((variant) => {
                                            return !selectedVariants.includes(variant);
                                        }).map((variant) => <option key={variant.id} value={variant.id}>{variant.name}</option>) : null
                                    }
                                </select>
                            </span>
                            <span>
                                <ButtonSecondary className=" min-w-full py-3" onClick={() => {
                                    if (selectedVariant > 0) {
                                        dispatch(addVariant(variants.filter((variant) => {
                                            return variant.id == selectedVariant;
                                        })[0]));
                                        setSelectedVariant(0);
                                    }
                                }}>
                                    EKLE
                                </ButtonSecondary>
                            </span>
                        </div>
                    </div> : null
            }
        </Modal>
    )
}
