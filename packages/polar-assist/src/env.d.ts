/// <reference types="vite/client" />
import type { PolarAssist } from './PolarAssist'

declare global {
	interface Window {
		polarAssist?: PolarAssist
		PolarAssist: typeof PolarAssist
	}
}
