import React from 'react'
import Modal from '../../../components/modal';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setDeleteModalOpen } from '../../../redux/slices/category/categorySlice';
import { removeCategory } from '../../../redux/slices/category/thunks/removeCategory';
import ButtonDanger from '../../../components/buttons/ButtonDanger';
import ButtonSecondary from '../../../components/buttons/ButtonSecondary';

export default function DeleteModal() {
    const deleteModalOpen = useAppSelector((state) => state.category.deleteModalOpen);
    const dispatch = useAppDispatch();
    const selectedCategory = useAppSelector((state) => state.category.selectedCategory);

  return (
    <Modal title="Emin misiniz?" isOpen={deleteModalOpen} setOpen={() => dispatch(setDeleteModalOpen(false))} footer={
        <>
            <ButtonDanger onClick={() => {
                if (selectedCategory !== null) {
                    dispatch(removeCategory(selectedCategory.id));
                }
            }}>
                Sil
            </ButtonDanger>
            <ButtonSecondary onClick={() => dispatch(setDeleteModalOpen(false))}>
                İptal et
            </ButtonSecondary>
        </>
    }>
        Seçtiğiniz <b>"{selectedCategory?.name}"</b> isimli kategoriyi silmek üzeresiniz devam etmek istiyor musunuz?
    </Modal>
  )
}
