import { ButtonProps } from './interfaces/ButtonProps';

export default function ButtonDanger(props: ButtonProps) {
    return (
        <button
            type="button"
            onClick={props.onClick}
            className={`inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-500 w-auto ` + props.className}
        >
            {props.icon}
            {props.children}
        </button>
    )
}
