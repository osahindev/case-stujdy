import { ErrorResponse } from "../../product/interfaces/ProductInitialState";

export default interface AuthInitialState {
    token: string|undefined,
    loading: boolean,
    errors: ErrorResponse,
}