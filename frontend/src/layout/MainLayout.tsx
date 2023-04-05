import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, EnvelopeIcon, XMarkIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import SuccessModal from "../components/globalModals/SuccessModal";
import { logout } from "../redux/slices/auth/authSlice";
import LoadingModal from "../components/globalModals/LoadingModal";

const navigation = [
    { name: 'Anasayfa', href: '/', current: true },
    { name: 'Ürünler', href: '/products', current: false },
    { name: 'Kategoriler', href: '/categories', current: false },
    { name: 'Varyasyonlar', href: '/variants', current: false },
    { name: 'İmport', href: '/import', current: false },
];

const user = {
    name: 'Oğuzhan Şahin',
    email: 'osahin@outlook.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
};

export default function MainLayout() {
    const [dashboardText, setDashboardText] = useState("");
    const [dashboardOptions, setDashboardOptions] = useState(null);
    const token = useAppSelector((state) => state.auth.token);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();



    const userNavigation = [
        {
            name: 'Oturumu Kapat', type: "button", action: () => {
                dispatch(logout());
            }
        },
    ];

    useEffect(() => {
        if (token === undefined) {
            navigate('/auth/login');
            return;
        }
    }, [token]);

    return (
        <>
            <SuccessModal />
            <LoadingModal />
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-8 w-8"
                                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                                alt="Your Company"
                                            />
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {navigation.map((item) => (
                                                    <NavLink
                                                        key={item.name}
                                                        to={item.href}
                                                        className={({ isActive, isPending }) => classNames(
                                                            isActive
                                                                ? 'bg-gray-900 text-white'
                                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                            'rounded-md px-3 py-2 text-sm font-medium'
                                                        )}
                                                        aria-current={item.current ? 'page' : undefined}
                                                    >
                                                        {item.name}
                                                    </NavLink>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            <button onClick={() => dispatch(logout())} className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Çıkış yap</button>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                                    {navigation.map((item) => (
                                        <NavLink
                                            key={item.name}
                                            to={item.href}
                                            className={({ isActive, isPending }) => classNames(
                                                isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'block rounded-md px-3 py-2 text-base font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </div>
                                <div className="border-t border-gray-700 pt-4 pb-3">
                                    <div className="space-y-1 px-2">
                                        <button onClick={() => dispatch(logout())} className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Çıkış yap</button>
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-row justify-between items-center">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{dashboardText}</h1>
                            <div className="flex flex-row gap-2">
                                {dashboardOptions}
                            </div>
                        </div>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 mt-8">
                        <Outlet context={{ setDashboardText: setDashboardText, setDashboardOptions: setDashboardOptions }} />
                    </div>
                </main>
            </div>
        </>
    )
}