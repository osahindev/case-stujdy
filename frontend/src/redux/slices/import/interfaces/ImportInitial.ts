import File from "./File";

export default interface ImportInitial {
    uploading: boolean,
    loading: boolean,
    progress: number,
    error: string|null|undefined,
    files: File[]
}