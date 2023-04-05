import Variant from "../../variant/interfaces/Variant";
import Product from "./Product";
import ProductPaginate from "./ProductPaginate";

export interface ErrorResponse {
    errors: {
        [key: string]: string[],
    },
    message: string,
    success: boolean,
}

export default interface ProductInitialState {
    products: ProductPaginate,
    subProducts: ProductPaginate,
    selectedRemoveProduct: Product,
    selectedProduct: Product,
    selectedSubProduct: Product|null,
    selectedVariants: Variant[],
    newModalIsOpen: boolean,
    newSubModalIsOpen: boolean,
    editModalIsOpen: boolean,
    removeModalIsOpen: boolean,
    errors: ErrorResponse,
    error: any[]|string|undefined|null,
}