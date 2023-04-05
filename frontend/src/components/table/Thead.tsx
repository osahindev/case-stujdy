import React from 'react'

interface Props {
    children?: React.ReactNode
}

export default function Thead(props: Props) {
    return (
        <thead className="bg-gray-50">
            {props.children}
        </thead>
    )
}
