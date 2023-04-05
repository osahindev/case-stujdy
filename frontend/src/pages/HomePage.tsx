import SubHeader from '../components/header/SubHeader';

function HomePage() {

    return (
        <>
            <SubHeader text='Ana sayfa' />
            <div className="bg-gray-800 rounded shadow">
                <div className="mx-auto max-w-2xl py-16 px-4 text-center sm:py-20 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        <span className="block">Hoşgeldiniz</span>
                    </h2>
                    <p className="mt-4 text-lg leading-6 text-indigo-200">
                        Bu yazılım basit bir envanter yönetim yazılımıdır.
                    </p>
                </div>
            </div>
        </>
    )
}

export default HomePage