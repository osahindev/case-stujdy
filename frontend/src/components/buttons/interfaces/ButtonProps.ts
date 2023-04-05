export interface ButtonProps {
    icon?: React.ReactNode,
    children: React.ReactNode,
    className?: string|null,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
}