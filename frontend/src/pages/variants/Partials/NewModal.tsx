import Modal from '../../../components/modal';
import ButtonDark from '../../../components/buttons/ButtonDark';
import ButtonSecondary from '../../../components/buttons/ButtonSecondary';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setNewModalOpen } from '../../../redux/slices/variant/variantSlice';
import { useEffect, useState } from 'react';
import { newVariant } from '../../../redux/slices/variant/thunks/newVariant';

export default function NewModal() {
    const dispatch = useAppDispatch();
    const [name, setName] = useState("");
    const newModelOpen = useAppSelector((state) => state.variant.newModalOpen);
    const errors = useAppSelector((state) => state.variant.errors);

    useEffect(() => {
        setName("");
    }, [newModelOpen]);

    return (
        <Modal title="Yeni Varyasyon Formu" isOpen={newModelOpen} setOpen={() => dispatch(setNewModalOpen(false))} footer={
            <>
                <ButtonDark onClick={() => {
                    dispatch(newVariant(name));
                }}>
                    EKLE
                </ButtonDark>
                <ButtonSecondary onClick={() => dispatch(setNewModalOpen(false))}>
                    İptal et
                </ButtonSecondary>
            </>
        }>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">İsim</label>
                <input type="text" id="email" value={name} onChange={e => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Varyasyon için isim giriniz. ( Örnek: Renk, Beden )" required />
                {
                    errors != null && Object.keys(errors).includes("errors") && Object.keys(errors.errors).includes("name") ? <p id="helper-text-explanation" className="mt-2 text-xs text-red-500">{errors.errors.name[0]}</p> : null
                }
            </div>
        </Modal>
    )
}
