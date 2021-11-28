const upload = document.querySelector('#upload')
const importPage = document.querySelector('#importPage')

function read(file)
{
	return new Promise((resolve, _) => {
		let fr = new FileReader()
		fr.onload = x=> resolve(fr.result)
		fr.readAsText(file)
	})
}

upload.addEventListener('change', (e) => {
	let file = e.target.files[0]

	if (!file)
		return

	read(file).then(res => { 
		data = new Data()
		data.Load(res)
		reload()
		importPage.style.display = 'none'
	})
}, false)

function showLoader()
{
	importPage.style.display = 'flex'
}

window.addEventListener('keyup', (e) => {
	if(e.key.toLowerCase() == 'escape')
		importPage.style.display = 'none'
})