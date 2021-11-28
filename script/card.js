const ctxMenu = document.querySelector('#ctxMenu')

window.addEventListener('mousedown', (e) => {
	if(e.button == 0)
		ctxMenu.style.display = 'none'
})
window.addEventListener('resize', () => ctxMenu.style.display = 'none')

class Card
{
	constructor()
	{
		this.title = ''
		this.description = ''
		this.sha = ''
		this.columnIndex = 0
	}

	static CreateElement(before, def)
	{
		let index = -1

		if(!def)
		{
			def = new Card()
			def.columnIndex = getColumnIdx(before.parentNode)
		
			let index = data.cards.length
			data.cards[index] = def
		}
		else
			before = columns[def.columnIndex].childNodes[0]
		
		for(let i = 0; i < data.cards.length; i++)
			if(data.cards[index] == def)
				index = i

		let card = document.createElement("div");
		card.classList.add("panel", "block", "border", "darkfill", "smallpad", "spacetop", 'crd')

		card.addEventListener('contextmenu', (e) => {
			e.preventDefault()
			ctxMenu.style.position = 'absolute'
			ctxMenu.style.display = 'block'
			ctxMenu.style.left = e.x + 'px'
			ctxMenu.style.top = e.y + 'px'
		})

		let cardTitle = document.createElement("input")
		cardTitle.classList.add("clear", "white", "bold", "med", "marginclear", "spacetop", "block")
		cardTitle.value = def.title
		cardTitle.placeholder = 'Nazwa karty...'
		cardTitle.addEventListener('change', () => {
			data.cards.forEach(x => {
				if(x == def)
					x.title = cardTitle.value
			})
			data.Flush()
		})
		card.appendChild(cardTitle)

		let cardText = document.createElement("textarea")
		cardText.classList.add("sml", "card", "marginclear", "spacetop", "fullwidth", "clear", "font", "white")
		cardText.innerHTML = def.description
		cardText.placeholder = 'Opis karty...'
		cardText.addEventListener('change', () => {
			data.cards.forEach(x => {
				if(x == def)
					x.description = cardText.value
			})
			data.Flush()
		})
		card.appendChild(cardText)

		let commitWrapper = document.createElement('div')
		commitWrapper.classList.add('commitwrapper')
		card.appendChild(commitWrapper)

		let commitUrl = document.createElement('a')
		commitUrl.classList.add('inline', 'white', 'gitcom')
		commitUrl.href = ''
		commitUrl.innerHTML = ''

		let commitText = document.createElement("input")
		commitText.classList.add("gitbg", "clear", "white", "marginclear", 'inline')
		commitText.placeholder = 'Commit SHA'
		commitText.value = def.sha
		setShaLen(commitText)
		commitText.addEventListener('input', () => {
			setShaLen(commitText)
			data.cards.forEach(x => {
				if(x == def)
					x.sha = commitText.value
			})
			data.Flush()
		})

		commitText.addEventListener('change', () => {
			commitUrl.innerText = ''
			GetCommit(data.repo, commitText.value, (res) => {
				commitUrl.href = res["html_url"]
				commitUrl.innerText = res["commit"]["message"].replace(/(\r\n|\n|\r)/gm, "")
			})
		})

		if(commitText.value && commitText.value.length != 0)
		{
			GetCommit(data.repo, commitText.value, (res) => {
				commitUrl.href = res["html_url"]
				commitUrl.innerText = res["commit"]["message"].replace(/(\r\n|\n|\r)/gm, "")
			})
		}

		commitWrapper.appendChild(commitText)
		commitWrapper.appendChild(commitUrl)

		card.addEventListener('mousedown', (e) => {
			if(e.target == card && e.button == 0)
				drag.Begin(card, def)
		})
		document.addEventListener('mouseup', () => drag.End(card))

		before.parentNode.prepend(card)

		data.Flush()

		return card
	}
}