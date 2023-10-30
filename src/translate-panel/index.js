import PanelComponent from './panel.vue';
import list from './langs'

export default {
	id: 'translate-panel',
	name: 'Translate',
	icon: 'translate',
	description: 'Translate using DeepL',
	component: PanelComponent,
	options: [
		{
			field: 'targetLanguage',
			name: 'Target Language',
			type: 'string',
			meta: {
				interface: 'select-dropdown',
				options: {
					choices: list
				}
			},
		},
	],
	minWidth: 12,
	minHeight: 8,
};