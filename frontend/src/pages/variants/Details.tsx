import SubHeader from '../../components/header/SubHeader';
import ButtonDark from '../../components/buttons/ButtonDark';
import { ArrowUturnLeftIcon, PaperClipIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useParams } from 'react-router-dom';
import ButtonSecondary from '../../components/buttons/ButtonSecondary';
import { useNavigate } from "react-router-dom";
import ButtonWarning from '../../components/buttons/ButtonWarning';
import Table from '../../components/table/Table';
import Thead from '../../components/table/Thead';
import { useEffect } from 'react';
import { getVariantDetailWithData } from '../../redux/slices/variant/thunks/getVariantDetailWithData';
import VariantDataRow from './Partials/VariantDataRow';
import EmptyTable from '../../components/table/EmptyTable';
import { setNewModalOpen, setSelectedVariant } from '../../redux/slices/variant/variantSlice';
import Variant from '../../redux/slices/variant/interfaces/Variant';
import { updateVariant } from '../../redux/slices/variant/thunks/updateVariant';
import DeleteDataModal from './Partials/DeleteDataModal';
import NewDataModal from './Partials/NewDataModal';
import EditDataModal from './Partials/EditDataModal';

export default function VariantDetails() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { variantId } = useParams();
    const selectedVariant = useAppSelector((state) => state.variant.selectedVariant);
    const errors = useAppSelector((state) => state.variant.errors);

    useEffect(() => {
        if (variantId !== undefined)
            dispatch(getVariantDetailWithData(parseInt(variantId)))
    }, [variantId, dispatch, getVariantDetailWithData]);

    return (
        <>
            <SubHeader text='Varyasyon Detayı'>
                <ButtonDark onClick={() => {
                    dispatch(setNewModalOpen(true));
                }} icon={<PlusCircleIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />}>Yeni Veri</ButtonDark>
                <ButtonSecondary onClick={() => navigate('/variants')} icon={<ArrowUturnLeftIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />}>Geri Dön</ButtonSecondary>
            </SubHeader>
            <EditDataModal />
            <NewDataModal />
            <DeleteDataModal />
            <div className="flex flex-row gap-3">
                <div className="w-4/12">
                    <div className="overflow-hidden bg-white shadow">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-base font-semibold leading-6 text-gray-900">Güncelleme Formu</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Varyasyonu buradan güncelleyebilirsiniz.</p>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 items-center">
                                    <dt className="text-sm font-medium text-gray-500">İsim</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <input type="text" id="email" value={selectedVariant?.name ?? ""} onChange={e => dispatch(setSelectedVariant({ ...selectedVariant, name: e.target.value } as Variant))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Varyasyon için isim giriniz. ( Örnek: Kıyafetler, Pantolonlar )" required />
                                        {
                                            errors != null && Object.keys(errors).includes("errors") && Object.keys(errors.errors).includes("name") ? <p id="helper-text-explanation" className="mt-2 text-xs text-red-500">{errors.errors.name[0]}</p> : null
                                        }
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500"></dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <ButtonWarning onClick={() => {
                                            dispatch(updateVariant({ id: selectedVariant?.id, name: selectedVariant?.name } as Variant));
                                        }}>GÜNCELLE</ButtonWarning>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
                <div className="w-8/12">
                    <div className="overflow-hidden bg-white shadow">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-base font-semibold leading-6 text-gray-900">Varyasyon verileri</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Varyasyon seçeneğinin verilerinin listesi.</p>
                        </div>
                    </div>
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
                                selectedVariant !== undefined && selectedVariant?.data !== undefined && selectedVariant?.data?.length > 0 ? selectedVariant?.data.map((data) => <VariantDataRow data={data} key={data.id} />) : <EmptyTable colSpan={3} />
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}
