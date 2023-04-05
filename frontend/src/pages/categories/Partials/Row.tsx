import Category from '../../../redux/slices/category/interfaces/Category';
import ButtonDanger from '../../../components/buttons/ButtonDanger';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useAppDispatch } from '../../../redux/hooks';
import { setDeleteModalOpen, setEditModalOpen, setSelectedCategory } from '../../../redux/slices/category/categorySlice';
import ButtonWarning from '../../../components/buttons/ButtonWarning';

interface Props {
    category: Category
}

export default function CategoryRow(props: Props) {
    const dispatch = useAppDispatch();

    return (
        <tr key={props.category.id}>
            <td className="whitespace-nowrap py-4 px-3 text-sm font-medium text-gray-500">{props.category.name}</td>
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right flex flex-row justify-end gap-2 text-sm font-medium sm:pr-6">
                <ButtonWarning onClick={() => {
                    dispatch(setSelectedCategory(props.category));
                    dispatch(setEditModalOpen(true))
                }} icon={<PencilSquareIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />}>
                    Düzenle<span className="sr-only">, {props.category.name}</span>
                </ButtonWarning>
                <ButtonDanger onClick={() => {
                    dispatch(setSelectedCategory(props.category));
                    dispatch(setDeleteModalOpen(true))
                }} icon={<TrashIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />}>
                    Sil
                </ButtonDanger>
            </td>
        </tr>
    )
}
