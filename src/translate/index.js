// import * as deepl from 'deepl-node';
// const authKey = process.env.DEEPL_KEY;
// const translator = new deepl.Translator(authKey);

export default (router) => {
	router.post('/', async (req, res) => {
		if (req.accountability?.user == null) { 
			return res.status(403).send(`You don't have permission to access this.`); 
		} 

		const translation = await fetch('https://api-free.deepl.com/v2/translate', {
			method: 'post',
			headers: {
				Authorization: `DeepL-Auth-Key ${process.env.DEEPL_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				text: [ req.body.text ],
				target_lang: req.body.lang
			})
		}).then(r => r.json())

		res.json(translation)
	})
};