import React from 'react'

interface Props {
    colSpan: number,
}

export default function EmptyTable(props: Props) {
  return (
    <tr><td className='whitespace-nowrap py-4 px-6 pr-3 text-sm font-medium text-gray-500' colSpan={props.colSpan}>Herhangi bir kayıt bulunamadı.</td></tr>
  )
}
