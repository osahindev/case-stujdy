import { ErrorResponse } from "../../product/interfaces/ProductInitialState";
import Category from "./Category";

export default interface CategoryInitialState {
    categories: Category[],
    selectedCategory: Category|null,
    deleteModalOpen: boolean,
    newModalOpen: boolean,
    errors: ErrorResponse,
    editModalOpen: boolean,
}