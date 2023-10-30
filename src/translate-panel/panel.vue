<template>
	<div class="translator" :class="{ 'has-header': showHeader }">
		<div>
			<v-textarea v-model="toTranslate"></v-textarea>
			<v-button @click="translate" :fullWidth="true" class="btn">Translate to {{friendlyLanguageName}}</v-button>
		</div>
		<div class="result">
			<small v-if="translated">Result</small>
			<p>{{ translated.text }}</p>
		</div>
	</div>
</template>

<script>
import { useApi } from '@directus/extensions-sdk' 
import { ref } from 'vue'
import list from './langs'

export default {
	props: {
		showHeader: {
			type: Boolean,
			default: false,
		},
		targetLanguage: {
			type: String,
			default: '',
		},
	},
	setup(props) {
		const api = useApi()
		const toTranslate = ref('')
		const translated = ref('')

		async function translate() {
			const response = await api.post('/translate', {
				text: toTranslate.value,
				lang: props.targetLanguage,
			})
			translated.value = response.data.translations[0]
		}

		return { toTranslate, translated, translate }
	},
	computed: {
		friendlyLanguageName() {
			return list.find(l => l.value == this.targetLanguage).text
		}
	}
};
</script>

<style scoped>
.translator {
	padding: 12px;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 12px;
}
.translator.has-header {
	padding-top: 0;
}
.btn {
	margin-top: 12px;
}
.result {
    background: var(--background-normal);
    border-radius: var(--border-radius);
    padding: var(--v-sheet-padding);
}
small {
	font-weight: bold;
}
</style>
