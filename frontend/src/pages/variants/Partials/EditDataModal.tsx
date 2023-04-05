import Modal from '../../../components/modal';
import ButtonSecondary from '../../../components/buttons/ButtonSecondary';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setEditModalOpen, setSelectedVariantData } from '../../../redux/slices/variant/variantSlice';
import ButtonWarning from '../../../components/buttons/ButtonWarning';
import { updateVariantData } from '../../../redux/slices/variant/thunks/updateVariantData';

export default function EditDataModal() {
    const dispatch = useAppDispatch();
    const editModalOpen = useAppSelector((state) => state.variant.editModalOpen);
    const selectedVariantData = useAppSelector((state) => state.variant.selectedVariantData);
    const errors = useAppSelector((state) => state.variant.errors);

    return (
        <Modal title="Veri Düzenleme Formu" isOpen={editModalOpen} setOpen={() => dispatch(setEditModalOpen(false))} footer={
            <>
                <ButtonWarning onClick={() => {
                    if (selectedVariantData != null)
                        dispatch(updateVariantData(selectedVariantData));
                }}>
                    Güncelle
                </ButtonWarning>
                <ButtonSecondary onClick={() => dispatch(setEditModalOpen(false))}>
                    İptal et
                </ButtonSecondary>
            </>
        }>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">İsim</label>
                <input type="text" id="email" value={selectedVariantData?.value} onChange={e => {
                    if (selectedVariantData !== null)
                        dispatch(setSelectedVariantData({ ...selectedVariantData, value: e.target.value }))
                }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Varyasyon değerini giriniz. ( Örnek: Kırmızı, Mavi )" required />
                {
                    errors != null && Object.keys(errors).includes("errors") && Object.keys(errors.errors).includes("value") ? <p id="helper-text-explanation" className="mt-2 text-xs text-red-500">{errors.errors.value[0]}</p> : null
                }
            </div>
        </Modal>
    )
}
