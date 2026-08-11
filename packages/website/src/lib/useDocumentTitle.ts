import { useEffect } from 'react'

const DEFAULT_TITLE = 'PolarAssist - The GUI Agent Living in Your Webpage'

export function useDocumentTitle(title?: string) {
	useEffect(() => {
		document.title = title ? `${title} - PolarAssist` : DEFAULT_TITLE
	}, [title])
}
