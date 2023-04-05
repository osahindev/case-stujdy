import { VariantData } from "./VariantData"

export default interface Variant {
    id: number,
    name: string
    data?: VariantData[],
}