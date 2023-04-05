import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import ImportInitial from '../interfaces/ImportInitial';
import { setErrors, setProgress } from '../importSlice';
import { setLoadingModalIsOpen, setMessage, setSuccessModalIsOpen, setTitle } from '../../modal/modalSlice';
import { handleUnauthorized } from '../../../helpers';
import { ErrorResponse } from '../../product/interfaces/ProductInitialState';

export const uploadFile = createAsyncThunk("import/uploadFileAsync", async (formData: FormData, { dispatch, rejectWithValue, getState }) => {
    const { importfile } = getState() as { importfile: ImportInitial };
    try {
        dispatch(setLoadingModalIsOpen(true));
        const { data }: AxiosResponse<any> = await axios.post('/import/upload', formData, {
            onUploadProgress: (progressEvent) => {
                if (importfile.uploading && progressEvent.total) {
                    const progress = Math.round((100 * progressEvent.loaded) / progressEvent.total);
                    dispatch(setProgress(progress));
                }
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        dispatch(setLoadingModalIsOpen(false));

        if (data.result === "OK") {
            dispatch(setLoadingModalIsOpen(false));
            dispatch(setTitle("Başarılı !"));
            dispatch(setMessage(`${data.data.inserted_product_count} adet ürün içeri aktarıldı. ${data.data.was_inserted_product_count} adet ürün zaten kayıtlıydı.`));
            dispatch(setSuccessModalIsOpen(true));
        }

        return data;
    } catch (err: any) {
        handleUnauthorized(err, dispatch);

        if(err.response.status == 400) {
            dispatch(setErrors(err.response.data as ErrorResponse));
        }
        
        return rejectWithValue(err.message);
    }
});

export const uploadFileExtraReducer = (builder: ActionReducerMapBuilder<ImportInitial>) => {
    builder
        .addCase(uploadFile.pending, (state) => {
            state.uploading = true;
            state.progress = 0;
            state.error = null;
        })
        .addCase(uploadFile.fulfilled, (state, action) => {
            state.uploading = false;
            state.progress = 100;
            state.error = null;
            state.files = [...state.files, {
                file: action.payload.data.file,
                id: action.payload.data.id,
                main_product_count: action.payload.data.main_product_count,
                sub_product_count: action.payload.data.sub_product_count
            }]
        })
        .addCase(uploadFile.rejected, (state, action) => {
            state.uploading = false;
            state.progress = 0;
            state.error = action.payload as string;
        });
};