import Product from "./Product";

export default interface ProductPaginate {
    page: number,
    has_next: boolean,
    has_prev: boolean,
    total: number,
    per_page: number,
    page_list: number[],
    items: Product[]
}