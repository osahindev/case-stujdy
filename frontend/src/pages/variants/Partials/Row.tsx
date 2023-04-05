import Variant from '../../../redux/slices/variant/interfaces/Variant';
import ButtonWarning from '../../../components/buttons/ButtonWarning';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import ButtonDanger from '../../../components/buttons/ButtonDanger';
import { setDeleteModalOpen, setSelectedVariant } from '../../../redux/slices/variant/variantSlice';
import { useAppDispatch } from '../../../redux/hooks';
import { useNavigate } from "react-router-dom";

interface Props {
    variant: Variant
}

export default function VariantRow(props: Props) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <tr key={props.variant.id}>
            <td className="whitespace-nowrap py-4 px-3 text-sm font-medium text-gray-500">{props.variant.name}</td>
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right flex flex-row justify-end gap-2 text-sm font-medium sm:pr-6">
                <ButtonWarning onClick={() => {
                    navigate('/variants/' + props.variant.id + '/details');
                }} icon={<PencilSquareIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />}>
                    Düzenle<span className="sr-only">, {props.variant.name}</span>
                </ButtonWarning>
                <ButtonDanger onClick={() => {
                    dispatch(setSelectedVariant(props.variant));
                    dispatch(setDeleteModalOpen(true))
                }} icon={<TrashIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />}>
                    Sil
                </ButtonDanger>
            </td>
        </tr>
    )
}
