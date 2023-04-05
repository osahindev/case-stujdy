export interface FilterProduct {
    parent_id: number | undefined,
    page: number | undefined,
    name: string|undefined,
    stock_amount: number|undefined,
    stock_details: string,
    category_id: number|undefined,
}