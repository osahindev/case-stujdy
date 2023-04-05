import { NewProduct } from "./NewProduct";

export default interface Product extends NewProduct {
    id: number|null,
    attribute_names: string,
    category_name: string,
    price_range: string,
}