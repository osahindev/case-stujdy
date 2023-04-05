import { ArrowUpTrayIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import SubHeader from "../../components/header/SubHeader";
import ButtonDark from "../../components/buttons/ButtonDark";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useRef } from "react";
import { uploadFile } from "../../redux/slices/import/thunks/uploadFile";

export default function Upload() {
    const fileInput = useRef<HTMLInputElement>(null);
    const progress = useAppSelector((state) => state.importfile.progress);
    const uploading = useAppSelector((state) => state.importfile.uploading);
    const errors = useAppSelector((state) => state.importfile.errors);
    const dispatch = useAppDispatch();

    const handleFileUpload = async () => {
        if (fileInput.current && fileInput.current?.files) {
            const formData = new FormData();
            formData.append("file", fileInput.current?.files?.[0]);

            dispatch(uploadFile(formData));
        }
    };

    return (
        <>
            <SubHeader text="Veri İçeri Aktarma">
                {" "}
            </SubHeader>
            <div className="mx-2 md:mx-0 flex-1 overflow-hidden bg-white shadow">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">Excel'den ürün aktarma</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Ürün verileriniz bulunduğu excel dosyanızı yükleyebilirsiniz. Örnek excel dosyasını kullanarak içeri ürünlerinizi aktarabilirsiniz.</p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 items-center">
                            <dt className="text-sm font-medium text-gray-500">Dosya</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <input ref={fileInput} type="file" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ürün için isim giriniz." required />
                                {
                                    errors != null && Object.keys(errors).includes("errors") && Object.keys(errors.errors).includes("file") ? <p id="helper-text-explanation" className="mt-2 text-xs text-red-500">{errors.errors.file[0]}</p> : null
                                }
                            </dd>
                        </div>
                        {
                            uploading ?
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 items-center">
                                    <dt className="text-sm font-medium text-gray-500"></dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-base font-medium text-blue-700 dark:text-white">Yükleniyor...</span>
                                            <span className="text-sm font-medium text-blue-700 dark:text-white">{progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                                        </div>
                                    </dd>
                                </div> : null
                        }
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500"></dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <ButtonDark onClick={() => handleFileUpload()} icon={<ArrowUpTrayIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />}>YÜKLE</ButtonDark>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </>
    )
}
