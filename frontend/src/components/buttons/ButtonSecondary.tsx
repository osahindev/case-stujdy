import { ButtonProps } from './interfaces/ButtonProps'

export default function ButtonSecondary(props: ButtonProps) {
    return (
        <button
            type="button"
            onClick={props.onClick}
            className={`inline-flex items-center justify-center rounded-md bg-white px-3 py-2 ring-1 ring-inset ring-gray-300 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 w-auto ` + props.className}
        >
            {props.icon}
            {props.children}
        </button>
    )
}
