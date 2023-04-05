export interface Attribute {
    attribute_id: number,
    attribute_data_id: number,
}

export interface NewProduct {
    parent_id?:number|undefined,
    sku: string,
    name: string,
    category_id: number|null,
    price: number | null,
    stock_amount: number,
    attributes: Attribute[],
}