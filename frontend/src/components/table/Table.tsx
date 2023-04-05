import React from 'react'

interface Props {
    children?: React.ReactNode
}

export default function Table(props: Props) {
    return (
        <div className="flex flex-col">
            <div className="mx-2 md:-my-2 md:-mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
                        <table className="min-w-full divide-y divide-gray-300">
                            {props.children}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
