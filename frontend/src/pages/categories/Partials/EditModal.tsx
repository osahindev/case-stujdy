import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Modal from '../../../components/modal';
import { setEditModalOpen, setSelectedCategory } from '../../../redux/slices/category/categorySlice';
import ButtonSecondary from '../../../components/buttons/ButtonSecondary';
import ButtonWarning from '../../../components/buttons/ButtonWarning';
import Category from '../../../redux/slices/category/interfaces/Category';
import { updateCategory } from '../../../redux/slices/category/thunks/updateCategory';

export default function EditModal() {
    const dispatch = useAppDispatch();
    const editModalOpen = useAppSelector((state) => state.category.editModalOpen);
    const selectedCategory = useAppSelector((state) => state.category.selectedCategory);
    const errors = useAppSelector((state) => state.category.errors);

    return (
        <Modal title="Kategori Düzenleme Formu" isOpen={editModalOpen} setOpen={() => dispatch(setEditModalOpen(false))} footer={
            <>
                <ButtonWarning onClick={() => {
                    if (selectedCategory !== null) {
                        dispatch(updateCategory(selectedCategory));
                    }
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
                <input type="text" id="email" value={selectedCategory?.name ?? ""} onChange={e => dispatch(setSelectedCategory({ ...selectedCategory, name: e.target.value } as Category))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Kategori için isim giriniz. ( Örnek: Kıyafetler, Pantolonlar )" required />
                {
                    errors != null && Object.keys(errors).includes("errors") && Object.keys(errors.errors).includes("name") ? <p id="helper-text-explanation" className="mt-2 text-xs text-red-500">{errors.errors.name[0]}</p> : null
                }
            </div>
        </Modal>
    )
}
