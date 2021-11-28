class Data
{
	constructor(cards, repo)
	{
		if(!cards)
			cards = []
		if(!repo)
			repo = ''
		this.cards = cards
		this.repo = repo
	}
	
	Flush()
	{
		window.sessionStorage.setItem('data', JSON.stringify(data))
	}
	
	Download()
	{
		let json = JSON.stringify(data)
		
		let dummy = document.createElement('a')
		dummy.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(json))
		dummy.setAttribute('download', "karty_dane.json")
		
		dummy.style.display = 'none'
		document.body.appendChild(dummy)
		dummy.click()
		document.body.removeChild(dummy)
	}
	
	Load(json)
	{
		let obj = JSON.parse(json)
		this.cards = obj.cards
		this.repo = obj.repo
	}
}

let data = null
let projectOpen = false

if(window.sessionStorage.getItem('data'))
{
	dataObj = JSON.parse(window.sessionStorage.getItem('data'))
	data = new Data(dataObj.cards, dataObj.repo)
}