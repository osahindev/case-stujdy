import Modal from '../../../components/modal';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setDeleteModalOpen } from '../../../redux/slices/variant/variantSlice';
import ButtonDanger from '../../../components/buttons/ButtonDanger';
import ButtonSecondary from '../../../components/buttons/ButtonSecondary';
import { removeVariant } from '../../../redux/slices/variant/thunks/removeVariant';

export default function DeleteModal() {
    const deleteModalOpen = useAppSelector((state) => state.variant.deleteModalOpen);
    const dispatch = useAppDispatch();
    const selectedVariant = useAppSelector((state) => state.variant.selectedVariant);

    return (
        <Modal title="Emin misiniz?" isOpen={deleteModalOpen} setOpen={() => dispatch(setDeleteModalOpen(false))} footer={
            <>
                <ButtonDanger onClick={() => {
                    if (selectedVariant !== null) {
                        dispatch(removeVariant(selectedVariant.id));
                    }
                }}>
                    Sil
                </ButtonDanger>
                <ButtonSecondary onClick={() => dispatch(setDeleteModalOpen(false))}>
                    İptal et
                </ButtonSecondary>
            </>
        }>
            Seçtiğiniz <b>"{selectedVariant?.name}"</b> isimli varyasyonu silmek üzeresiniz devam etmek istiyor musunuz?
        </Modal>
    )
}
