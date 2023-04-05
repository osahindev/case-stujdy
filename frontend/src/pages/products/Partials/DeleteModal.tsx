import Modal from '../../../components/modal';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import ButtonDanger from '../../../components/buttons/ButtonDanger';
import ButtonSecondary from '../../../components/buttons/ButtonSecondary';
import { setRemoveModalIsOpen } from '../../../redux/slices/product/productSlice';
import { deleteProduct } from '../../../redux/slices/product/thunks/deleteProduct';

export default function DeleteModal() {
    const removeModalIsOpen = useAppSelector((state) => state.product.removeModalIsOpen);
    const dispatch = useAppDispatch();
    const selectedProduct = useAppSelector((state) => state.product.selectedRemoveProduct);

  return (
    <Modal title="Emin misiniz?" isOpen={removeModalIsOpen} setOpen={() => dispatch(setRemoveModalIsOpen(false))} footer={
        <>
            <ButtonDanger onClick={() => {
                if (selectedProduct !== null && selectedProduct.id !== null) {
                    dispatch(deleteProduct(selectedProduct.id));
                }
            }}>
                Sil
            </ButtonDanger>
            <ButtonSecondary onClick={() => dispatch(setRemoveModalIsOpen(false))}>
                İptal et
            </ButtonSecondary>
        </>
    }>
        Seçtiğiniz <b>"{selectedProduct?.name}"</b> isimli ürünlü silmek üzeresiniz devam etmek istiyor musunuz?
    </Modal>
  )
}
