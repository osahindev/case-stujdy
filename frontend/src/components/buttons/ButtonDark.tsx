import { ButtonProps } from './interfaces/ButtonProps';

export default function ButtonDark(props: ButtonProps) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`inline-flex items-center justify-center rounded-md bg-gray-600 px-3 py-2 ring-1 ring-inset ring-gray-600 text-sm font-medium text-white shadow-sm hover:bg-gray-700 w-auto ` + props.className}
    >
      {props.icon}
      {props.children}
    </button>
  )
}
