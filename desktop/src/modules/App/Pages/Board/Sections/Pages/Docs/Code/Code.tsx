import { Prism } from "react-syntax-highlighter";
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const Code = ({ node, inline, className, children, ...props }: any) => {
		const language = /language-(\w+)/.exec(className ?? '')?.[1];
		console.log('Theme', dracula);
		if (!inline && language) {
			 return (
        <Prism
					style={dracula}
					language={language}
					PreTag="div"
					{...props}
				>
            {String(children).replace(/\n$/, '')}
        </Prism>
			)
		}
		return (
			<code className={className} {...props}>
				{children}
			</code>
		)
}
