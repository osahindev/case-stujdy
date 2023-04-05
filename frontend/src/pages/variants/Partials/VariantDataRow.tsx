import ButtonWarning from '../../../components/buttons/ButtonWarning';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import ButtonDanger from '../../../components/buttons/ButtonDanger';
import { useAppDispatch } from '../../../redux/hooks';
import { VariantData } from '../../../redux/slices/variant/interfaces/VariantData';
import { setDeleteModalOpen, setEditModalOpen, setSelectedVariantData } from '../../../redux/slices/variant/variantSlice';

interface Props {
    data: VariantData
}

export default function VariantDataRow(props: Props) {
    const dispatch = useAppDispatch();

    return (
        <tr key={props.data.id}>
            <td className="whitespace-nowrap py-4 px-3 text-sm font-medium text-gray-500">{props.data.value}</td>
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right flex flex-row justify-end gap-2 text-sm font-medium sm:pr-6">
                <ButtonWarning onClick={() => {
                    dispatch(setSelectedVariantData(props.data));
                    dispatch(setEditModalOpen(true));
                }} icon={<PencilSquareIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />}>
                    Düzenle<span className="sr-only">, {props.data.value}</span>
                </ButtonWarning>
                <ButtonDanger onClick={() => {
                    dispatch(setSelectedVariantData(props.data));
                    dispatch(setDeleteModalOpen(true));
                }} icon={<TrashIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />}>
                    Sil
                </ButtonDanger>
            </td>
        </tr>
    )
}
