export class Accordion {
	constructor(accordionWrapper, type = 'multi') {
		this.type = type
		this.accordion = document.querySelector(accordionWrapper)
		this.accordionItemsNodes = this.accordion.querySelectorAll('.accordion__item')
		this.accordionItems = []

		this.init()
	}

	openAccordionItem(element) {
		element.node.style.height = `${element.titleHeight + element.contentHeight}px`
		element.node.setAttribute('data-accordion-opened', true)
		element.title.classList.add('active')
		element.opened = true
	}
	closeAccordionItem(element) {
		setTimeout(() => {
			element.node.style.height = `${element.titleHeight}px`
		}, 400)
		element.node.removeAttribute('data-accordion-opened')
		element.title.classList.remove('active')
		element.opened = false
	}

	init() {
		for (const item of this.accordionItemsNodes) {
			const element = {
				node: item,
				content: item.querySelector('.accordion__content'),
				title: item.querySelector('.accordion__title'),
				titleHeight: item.querySelector('.accordion__title').offsetHeight,
				itemHeight: item.offsetHeight,
				contentHeight: item.querySelector('.accordion__content').offsetHeight,
				opened: false,
			}

			this.accordionItems.push(element)
		}
		this.accordionItems.forEach((element) => {
			element.node.style.height = `${element.titleHeight}px`
			element.title.addEventListener('click', (e) => {
				if (!element.opened) {
					if (this.type === 'single') {
						this.accordionItems.forEach((el) => this.closeAccordionItem(el))
					}
					this.openAccordionItem(element)
				} else {
					this.closeAccordionItem(element)
				}
			})
		})
	}
}
