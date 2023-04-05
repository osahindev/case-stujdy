import { ErrorResponse } from "../../product/interfaces/ProductInitialState";
import Variant from "./Variant";
import { VariantData } from "./VariantData";

export default interface VariantInitialState {
    variants: Variant[],
    deleteModalOpen: boolean,
    editModalOpen: boolean,
    errors: ErrorResponse,
    newModalOpen: boolean,
    selectedVariant: Variant|null,
    selectedVariantData: VariantData|null,
}