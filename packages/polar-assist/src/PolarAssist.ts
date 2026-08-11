/**
 * Copyright (C) 2025 Alibaba Group Holding Limited
 * All rights reserved.
 */
import { type AgentConfig, PolarAssistCore } from '@polar-assist/core'
import { PageController, type PageControllerConfig } from '@polar-assist/page-controller'
import { Panel, type PanelConfig } from '@polar-assist/ui'

export * from '@polar-assist/core'

export type PolarAssistConfig = AgentConfig & PageControllerConfig & Omit<PanelConfig, 'language'>
export type PageAgentConfig = PolarAssistConfig

export class PolarAssist extends PolarAssistCore {
	panel: Panel

	constructor(config: PolarAssistConfig) {
		const pageController = new PageController({
			...config,
			enableMask: config.enableMask ?? true,
		})

		super({ ...config, pageController })

		this.panel = new Panel(this, {
			language: config.language,
			promptForNextTask: config.promptForNextTask,
		})
	}
}

export { PolarAssist as PageAgent }

