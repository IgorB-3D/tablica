const root = document.getElementById('app')
const columns = document.querySelectorAll('.cardcolumn')
const pages = document.querySelectorAll('.page')

const ctxMenu = document.querySelector('#ctxMenu')
const ctxMenuInput = ctxMenu.querySelectorAll('input')

window.addEventListener('resize', () => ctxMenu.style.display = 'none')
window.addEventListener('mousedown', (e) => {
	let flag = false
	ctxMenuInput.forEach((el) => {
		if(e.target == el)
			flag = true
	})

	if(e.target == ctxMenu)
		flag = true
		
	if(!flag)
		ctxMenu.style.display = 'none'
})

ctxMenuInput[1].addEventListener('click', () => {
	data.cards.splice(activeCardIdx, 1)
	data.Flush()
	reload()
	ctxMenu.style.display = 'none'
})

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
		Card.CreateElement(null, data.cards[i])
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
	projectOpen = true
}

function hidePanel()
{
	if(toggle)
		toggleMenu()
	pages[0].classList.add('in')
	pages[0].classList.remove('out')
    pages[1].classList.add('hide')
    pages[1].classList.remove('in')
	projectOpen = false
}

function setShaLen(commitText)
{
	let width = ''

	if(commitText.value.length != 0)
		width = `min(${commitText.value.length + 2}ch, 50%)`
	else
		width = '13ch'

	commitText.style.width = width
	commitText.style.maxWidth = width
}