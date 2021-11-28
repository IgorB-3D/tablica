const settings = document.querySelector('#settings')
const setTabs = document.querySelectorAll('.settingstab')
const repoIn = document.querySelector('#repoIn')

let toggle = false

function toggleMenu()
{
	toggle = !toggle
	if(toggle)
		pages[2].classList.remove('hide')
	else
		pages[2].classList.add('hide')
}

function setTab(n)
{
	for(let i = 0; i < setTabs.length; i++)
	{
		setTabs[i].style.display = 'none'
		if(i == n)
			setTabs[i].style.display = 'block'
	}
}

repoIn.addEventListener('change', () => {
	data.repo = repoIn.value
	data.Flush()
})

window.addEventListener('keyup', (e) => {
	if(e.key.toLowerCase() === 'escape')
		toggleMenu()
})