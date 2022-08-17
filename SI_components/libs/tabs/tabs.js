export class Tabs {
	constructor(tabsWrapper) {
		this.tabs = document.querySelector(tabsWrapper)
		this.currentBtn = this.tabs.querySelector('.tabs__button--active')
		this.currentItem = this.tabs.querySelector('.tabs__item--active')

		this.init()
	}
	changeTab(path) {
		this.currentBtn.classList.remove('tabs__button--active')
		this.currentItem.classList.remove('tabs__item--active')
		this.currentBtn = this.tabs.querySelector(`[data-tabs-path=${path}]`)
		this.currentItem = this.tabs.querySelector(`[data-tabs-target=${path}]`)
		this.currentBtn.classList.add('tabs__button--active')
		this.currentItem.classList.add('tabs__item--active')
	}
	init() {
		this.tabs.addEventListener('click', (e) => {
			if (e.target.classList.contains('tabs__button')) {
				const btn = e.target
				const tabPath = btn.dataset.tabsPath
				this.changeTab(tabPath)
			}
		})
	}
}
