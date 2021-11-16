const root = document.getElementById('app')
const columns = document.querySelectorAll('.cardcolumn')

/*
<div class="panel block border darkfill smallpad">
<p class="bold med marginclear spacetop">Karta</p>
<p class="sml card marginclear spacetop">Opis</p>
</div>
*/

function newCard(before) {
    let card = document.createElement("div");
    card.classList.add("panel", "block", "border", "darkfill", "smallpad", "spacetop")

    let cardTitle = document.createElement("p")
    cardTitle.classList.add("bold", "med", "marginclear", "spacetop")
    cardTitle.innerHTML = "Nowa karta"
    card.appendChild(cardTitle)

    let cardText = document.createElement("p")
    cardText.classList.add("sml", "card", "marginclear", "spacetop")
    cardText.innerHTML = "Opis nowej karty"
    card.appendChild(cardText)

    before.parentNode.prepend(card)
}