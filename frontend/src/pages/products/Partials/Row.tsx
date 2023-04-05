import { ListBulletIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import ButtonWarning from '../../../components/buttons/ButtonWarning';
import Product from '../../../redux/slices/product/interfaces/Product'
import ButtonDanger from '../../../components/buttons/ButtonDanger';
import { useNavigate } from 'react-router-dom';
import { setEditModalIsOpen, setRemoveModalIsOpen, setSelectedRemoveProduct } from '../../../redux/slices/product/productSlice';
import { useAppDispatch } from '../../../redux/hooks';
import { getProductData } from '../../../redux/slices/product/thunks/getProductData';
import ButtonDark from '../../../components/buttons/ButtonDark';

interface Props {
    product: Product,
}

export default function ProductRow(props: Props) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return (
        <tr key={props.product.id}>
            <td className="whitespace-nowrap py-4 px-3 text-sm font-medium text-gray-500">{props.product.name}</td>
            <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-500">{props.product.category_name}</td>
            <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-500">{props.product.sku}</td>
            <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-500">{props.product.stock_amount} / {props.product.attribute_names !== "" ? props.product.attribute_names : "-"}</td>
            <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-500">{props.product.price_range}</td>
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right flex flex-row justify-end gap-2 text-sm font-medium sm:pr-6">
                <ButtonWarning onClick={() => {
                    if (props.product.id) {
                        dispatch(getProductData(props.product.id));
                        dispatch(setEditModalIsOpen(true));
                    }
                }} icon={<PencilSquareIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />}>
                    Düzenle<span className="sr-only">, {props.product.name}</span>
                </ButtonWarning>
                <ButtonDark onClick={() => {
                    navigate('/products/' + props.product.id + '/subProducts');
                }} icon={<ListBulletIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />}>
                    Alt ürünler<span className="sr-only">, {props.product.name}</span>
                </ButtonDark>
                <ButtonDanger onClick={() => {
                    dispatch(setSelectedRemoveProduct(props.product));
                    dispatch(setRemoveModalIsOpen(true));
                }} icon={<TrashIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />}>
                    Sil
                </ButtonDanger>
            </td>
        </tr>
    )
}
