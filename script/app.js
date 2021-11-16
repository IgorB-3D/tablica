const root = document.getElementById('app')
const columns = document.querySelectorAll('.cardcolumn')
const pages = document.querySelectorAll('.page')

/*
<div class="panel block border darkfill smallpad">
<p class="bold med marginclear spacetop">Karta</p>
<p class="sml card marginclear spacetop">Opis</p>
</div>
*/

function newProject() {
    pages[0].classList.add('hide')
    pages[1].classList.remove('hide')
}

function newCard(before) {
    let card = document.createElement("div");
    card.classList.add("panel", "block", "border", "darkfill", "smallpad", "spacetop")

    let cardTitle = document.createElement("input")
    cardTitle.classList.add("clear", "white", "bold", "med", "marginclear", "spacetop")
    cardTitle.value = "Nowa karta"
    card.appendChild(cardTitle)

    let cardText = document.createElement("p")
    cardText.classList.add("sml", "card", "marginclear", "spacetop")
    cardText.innerHTML = "Opis nowej karty"
    card.appendChild(cardText)

    before.parentNode.prepend(card)
}