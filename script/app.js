const root = document.getElementById('app')
const columns = document.querySelectorAll('.cardcolumn')
const pages = document.querySelectorAll('.page')

/*
<div class="panel block border darkfill smallpad">
<p class="bold med marginclear spacetop">Karta</p>
<p class="sml card marginclear spacetop">Opis</p>
</div>
*/

const drag = {
    card: null,
    mPos: null,
    mDelta: null
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

function dragEnd(card) {
    card.style.position = 'initial'
    drag.card = null
	card.classList.remove('pop')
}

function dragUpdate(mv) {
    if (drag.card == null)
        return;
    drag.card.style.top = `${drag.mPos.y - drag.mDelta.y}px`
    drag.card.style.left = `${drag.mPos.x - drag.mDelta.x}px`
}

function clearSelection()
{
	let selection = window.getSelection ? window.getSelection() : document.selection
	if (selection) {
		sel.removeAllRanges();
	}
}

document.addEventListener('mousemove', (ev) => {
    drag.mPos = {
        x: ev.x,
        y: ev.y
    }
    dragUpdate()
})

function newProject() {
    pages[0].classList.add('out')
    pages[1].classList.remove('hide')
    pages[1].classList.add('in')
}

function newCard(before) {
    let card = document.createElement("div");
    card.classList.add("panel", "block", "border", "darkfill", "smallpad", "spacetop")

    let cardTitle = document.createElement("input")
    cardTitle.classList.add("clear", "white", "bold", "med", "marginclear", "spacetop", "block")
    cardTitle.value = "Nowa karta"
    card.appendChild(cardTitle)

    let cardText = document.createElement("textarea")
    cardText.classList.add("sml", "card", "marginclear", "spacetop", "fullwidth", "clear", "font", "white")
    cardText.innerHTML = "Opis nowej karty"
    card.appendChild(cardText)

    card.addEventListener('mousedown', (e) => {
		if(e.target == card)
			dragBegin(card)
	})
    document.addEventListener('mouseup', () => dragEnd(card))

    before.parentNode.prepend(card)
}