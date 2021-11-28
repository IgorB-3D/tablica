const root = document.getElementById('app')
const columns = document.querySelectorAll('.cardcolumn')
const pages = document.querySelectorAll('.page')

reload()

function reload()
{
	if(data != null)
	{
		repoIn.value = data.repo
		reconstruct()
		showPanel()
	}
}

function reconstruct()
{
	for(let i = 0; i < columns.length; i++)
	{
		let children = [...columns[i].getElementsByClassName('panel')]
		children.forEach(x => x.remove())
	}

	for(let i = 0; i < data.cards.length; i++)
		newCard(null, data.cards[i])
}

function getColumnIdx(column)
{
	for(let i = 0; i < columns.length; i++)
		if(columns[i] == column)
			return i;
	return 0;
}

function newProject()
{
	sessionStorage.clear()
	data = new Data()
	data.Flush()
	reload()
	reconstruct()
	showPanel()
}

function showPanel()
{
	pages[0].classList.add('out')
    pages[1].classList.remove('hide')
    pages[1].classList.add('in')
	pages[0].classList.remove('in')
}

function hidePanel()
{
	if(toggle)
		toggleMenu()
	pages[0].classList.add('in')
	pages[0].classList.remove('out')
    pages[1].classList.add('hide')
    pages[1].classList.remove('in')
}

function newCard(before, def) {
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
    card.classList.add("panel", "block", "border", "darkfill", "smallpad", "spacetop")

    let cardTitle = document.createElement("input")
    cardTitle.classList.add("clear", "white", "bold", "med", "marginclear", "spacetop", "block")
    cardTitle.value = def.title
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
	cardText.addEventListener('change', () => {
		data.cards.forEach(x => {
			if(x == def)
				x.description = cardText.value
		})
		data.Flush()
	})
    card.appendChild(cardText)

	let commitText = document.createElement("input")
	commitText.classList.add("gitbg", "clear", "white", "marginclear", "block")
	commitText.placeholder = 'Commit SHA'
	commitText.value = def.sha
	commitText.addEventListener('change', () => {
		data.cards.forEach(x => {
			if(x == def)
				x.sha = commitText.value
		})
		data.Flush()
	})
	card.appendChild(commitText)

    card.addEventListener('mousedown', (e) => {
		if(e.target == card)
			drag.Begin(card, def)
	})
    document.addEventListener('mouseup', () => drag.End(card))

    before.parentNode.prepend(card)

	data.Flush()

	return card
}