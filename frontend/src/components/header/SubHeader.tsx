import React, { useEffect } from 'react'
import { useOutletContext } from "react-router-dom";

interface Props {
    text: string,
    children?: React.ReactNode
}

interface ContextType {
    setDashboardText: React.Dispatch<React.SetStateAction<string>>,
    setDashboardOptions: React.Dispatch<React.SetStateAction<React.ReactNode|null>>
}

export default function SubHeader(props: Props) {
    const {setDashboardText, setDashboardOptions} : ContextType = useOutletContext();

    useEffect(() => {
        document.title = props.text;
    }, []);

    useEffect(() => {
        setDashboardText(props.text);
        setDashboardOptions(props.children);
    }, [setDashboardOptions, setDashboardText]);

    return (
        <></>
    );
}
