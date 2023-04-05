import { ButtonProps } from './interfaces/ButtonProps';

export default function ButtonWarning(props: ButtonProps) {
    return (
        <button
            type="button"
            onClick={props.onClick}
            className={`inline-flex items-center justify-center rounded-md bg-yellow-400 px-3 py-2 text-sm font-medium text-black shadow-sm hover:bg-yellow-500 w-auto ` + props.className}
        >
            {props.icon}
            {props.children}
        </button>
    )
}
