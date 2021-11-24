const root = document.getElementById('app')
const columns = document.querySelectorAll('.cardcolumn')
const pages = document.querySelectorAll('.page')

const drag = {
    card: null,
    mPos: null,
    mDelta: null,
	closestColumn: 0
}

let data = null
let toggle = false

if(!window.sessionStorage.getItem('data'))
	window.sessionStorage.setItem('data', JSON.stringify(dataDef()))
else
	data = JSON.parse(window.sessionStorage.getItem('data'))

if(data != null)
{
	reconstruct()
	showPanel()
}

function reconstruct()
{
	for(let i = 0; i < data.cards.length; i++)
	{
		let card = newCard(null, data.cards[i])
		//columns[data.cards[i].columnIndex].prepend(card)
	}
}

function flushData()
{
	window.sessionStorage.setItem('data', JSON.stringify(data))
}

function dataDef()
{
	return { cards: [], repo: '' }
}

function cardDef()
{
	return {
		title: 'Nowa karta',
		description: 'Opis karty',
		sha: '',
		columnIndex: 0
	}
}

function getColumnIdx(column)
{
	for(let i = 0; i < columns.length; i++)
		if(columns[i] == column)
			return i;
	return 0;
}

function dragBegin(card) {
    drag.card = card
    drag.mDelta = {
        x: drag.mPos.x - card.getBoundingClientRect().left,
        y: drag.mPos.y - card.getBoundingClientRect().top
    }
    card.style.position = 'absolute'
    dragUpdate()
	card.classList.add('pop')
}

function dragEnd() {
	if(!drag.card)
		return;
	if(drag.closestColumn)
		drag.closestColumn.prepend(drag.card)
	drag.card.style.position = 'initial'
	drag.card.classList.remove('pop')
	drag.card = null
	flushData()
}

function dragUpdate(mv) {
    if (drag.card == null)
        return;
	let x = drag.mPos.y - drag.mDelta.y
	let y = drag.mPos.x - drag.mDelta.x

    drag.card.style.top = `${drag.mPos.y - drag.mDelta.y}px`
    drag.card.style.left = `${drag.mPos.x - drag.mDelta.x}px`

	drag.closestColumn = columns[0]
	let closestDistance = Infinity
	let cRect = drag.card.getBoundingClientRect();

	for(let i = 0; i < columns.length; i++)
	{
		let rect = columns[i].getBoundingClientRect();
		let dist = Math.abs(cRect.left - rect.left)

		if(dist < closestDistance)
		{
			closestDistance = dist
			drag.closestColumn = columns[i]
		}
	}
}

document.addEventListener('mousemove', (ev) => {
    drag.mPos = {
        x: ev.x,
        y: ev.y
    }
    dragUpdate()
})

function newProject()
{
	data = dataDef()
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
		def = cardDef()
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
		data.cards[index].title = cardTitle.value
		flushData()
	})
    card.appendChild(cardTitle)

    let cardText = document.createElement("textarea")
    cardText.classList.add("sml", "card", "marginclear", "spacetop", "fullwidth", "clear", "font", "white")
    cardText.innerHTML = def.description
	cardText.addEventListener('change', () => {
		data.cards[index].description = cardText.value
		flushData()
	})
    card.appendChild(cardText)

	let commitText = document.createElement("input")
	commitText.classList.add("clear", "green", "sml", "med", "marginclear", "block")
	commitText.placeholder = 'Commit SHA'
	commitText.value = def.sha
	commitText.addEventListener('change', () => {
		data.cards[index].sha = commitText.value
		flushData()
	})
	card.appendChild(commitText)

    card.addEventListener('mousedown', (e) => {
		if(e.target == card)
			dragBegin(card)
	})
    document.addEventListener('mouseup', () => dragEnd(card))

    before.parentNode.prepend(card)

	flushData()

	return card
}

function toggleMenu()
{
	toggle = !toggle
	if(toggle)
		pages[2].classList.remove('hide')
	else
		pages[2].classList.add('hide')
}

function downloadData()
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

function tryLoadData()
{

}