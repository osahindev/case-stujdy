import { useEffect } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import ButtonDark from '../../components/buttons/ButtonDark';
import SubHeader from '../../components/header/SubHeader';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getCategories } from '../../redux/slices/category/thunks/getCategories';
import Table from '../../components/table/Table';
import Thead from '../../components/table/Thead';
import EmptyTable from '../../components/table/EmptyTable';
import CategoryRow from './Partials/Row';
import DeleteModal from './Partials/DeleteModal';
import { setNewModalOpen } from '../../redux/slices/category/categorySlice';
import NewModal from './Partials/NewModal';
import EditModal from './Partials/EditModal';

export default function CategoryList() {
    const dispatch = useAppDispatch();
    const categories = useAppSelector((state) => state.category.categories);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch, getCategories]);

    return (
        <>
            <SubHeader text='Kategori listesi'>
                <ButtonDark onClick={() => dispatch(setNewModalOpen(true))} icon={<PlusCircleIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />}>Yeni Kategori</ButtonDark>
            </SubHeader>
            <EditModal />
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
                        categories.length > 0 ? categories.map((category) => <CategoryRow category={category} key={category.id} />) : <EmptyTable colSpan={3} />
                    }
                </tbody>
            </Table>
        </>
    )
}
