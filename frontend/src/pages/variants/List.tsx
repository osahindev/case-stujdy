import SubHeader from '../../components/header/SubHeader';
import ButtonDark from '../../components/buttons/ButtonDark';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Table from '../../components/table/Table';
import Thead from '../../components/table/Thead';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import EmptyTable from '../../components/table/EmptyTable';
import VariantRow from './Partials/Row';
import { useEffect } from 'react';
import { getVariants } from '../../redux/slices/variant/thunks/getVariants';
import DeleteModal from './Partials/DeleteModal';
import NewModal from './Partials/NewModal';
import { setNewModalOpen } from '../../redux/slices/variant/variantSlice';

export default function VariantList() {
    const dispatch = useAppDispatch();
    const variants = useAppSelector((state) => state.variant.variants);

    useEffect(() => {
        dispatch(getVariants());
    }, [dispatch, getVariants]);

    return (
        <>
            <SubHeader text='Varyasyon listesi'>
                <ButtonDark onClick={() => dispatch(setNewModalOpen(true))} icon={<PlusCircleIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />}>Yeni Varyasyon</ButtonDark>
            </SubHeader>
            <NewModal />
            <DeleteModal />
            <Table>
                <Thead>
                    <tr>
                        <th scope="col" className="min-w-[12rem] py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                            İsim
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </Thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {
                        variants.length > 0 ? variants.map((variant) => <VariantRow variant={variant} key={variant.id} />) : <EmptyTable colSpan={3} />
                    }
                </tbody>
            </Table>
        </>
    );
}
