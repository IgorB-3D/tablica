class Drag
{
	constructor()
	{
		this.card = null
		this.cardDef = null
    	this.mPos = null
    	this.mDelta = null
		this.closestColumn = 0

		document.addEventListener('mousemove', (ev) =>
		{
			this.mPos = {
				x: ev.x,
				y: ev.y
			}
			this.Update()
		})
	}

	Begin(card, cardDef)
	{
		this.card = card
		this.cardDef = cardDef
		this.mDelta = {
			x: this.mPos.x - card.getBoundingClientRect().left,
			y: this.mPos.y - card.getBoundingClientRect().top
		}
		card.style.position = 'absolute'
		this.Update()
		card.classList.add('transparent')
	}

	End()
	{
		if(!this.card)
			return;
		if(this.closestColumn)

		this.closestColumn.insertBefore(this.card, [...this.closestColumn.children].at(-1))

		this.cardDef.columnIndex = getColumnIdx(this.closestColumn)

		this.card.style.position = 'initial'
		this.card.classList.remove('transparent')
		this.card = null
		data.Flush()
	}

	Update()
	{
		if (this.card == null)
			return;
		let x = this.mPos.y - this.mDelta.y
		let y = this.mPos.x - this.mDelta.x

		this.card.style.top = `${this.mPos.y - this.mDelta.y}px`
		this.card.style.left = `${this.mPos.x - this.mDelta.x}px`

		this.closestColumn = columns[0]
		let closestDistance = Infinity
		let cRect = this.card.getBoundingClientRect();

		for(let i = 0; i < columns.length; i++)
		{
			let rect = columns[i].getBoundingClientRect();
			let dist = Math.abs(cRect.left - rect.left)

			if(dist < closestDistance)
			{
				closestDistance = dist
				this.closestColumn = columns[i]
			}
		}
	}
}

const drag = new Drag()