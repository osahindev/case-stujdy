import Modal from '../../../components/modal';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setDeleteModalOpen, setSelectedVariantData } from '../../../redux/slices/variant/variantSlice';
import ButtonDanger from '../../../components/buttons/ButtonDanger';
import ButtonSecondary from '../../../components/buttons/ButtonSecondary';
import { removeVariantData } from '../../../redux/slices/variant/thunks/removeVariantData';

export default function DeleteDataModal() {
    const deleteModalOpen = useAppSelector((state) => state.variant.deleteModalOpen);
    const dispatch = useAppDispatch();
    const selectedVariant = useAppSelector((state) => state.variant.selectedVariant);
    const selectedVariantData = useAppSelector((state) => state.variant.selectedVariantData);

    return (
        <Modal title="Emin misiniz?" isOpen={deleteModalOpen} setOpen={() => dispatch(setDeleteModalOpen(false))} footer={
            <>
                <ButtonDanger onClick={() => {
                    if (selectedVariantData !== null) {
                        dispatch(removeVariantData(selectedVariantData.id));
                    }
                }}>
                    Sil
                </ButtonDanger>
                <ButtonSecondary onClick={() => dispatch(setDeleteModalOpen(false))}>
                    İptal et
                </ButtonSecondary>
            </>
        }>
            Seçtiğiniz <b>"{selectedVariant?.name}"</b> isimli varyasyonun <b>"{selectedVariantData?.value}"</b> isimli değerini silmek üzeresiniz devam etmek istiyor musunuz?
        </Modal>
    )
}
