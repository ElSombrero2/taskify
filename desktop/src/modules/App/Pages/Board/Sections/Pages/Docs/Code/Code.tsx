import { Prism } from "react-syntax-highlighter";

export const Code = ({value, language}: {value?: string, language?: string}) => {
    return (
        <Prism language={language}>
            {value || ''}
        </Prism>
    )
}