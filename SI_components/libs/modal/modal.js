export class Modal {
	constructor() {
		this.buttons = Array.from(document.querySelectorAll('[data-modal-path]'))
		this.modals = Array.from(document.querySelectorAll('[data-modal-target]'))
		this.activeModal = null

		this.init()
	}

	init() {
		this.buttons.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				const modalPath = btn.dataset.modalPath
				const modal = this.modals.find((modal) => modal.dataset.modalTarget === modalPath)

				if (this.activeModal) {
					this.closeModal(this.activeModal)
				}
				this.openModal(modal)
				this.bodyLock()

				modal.addEventListener('click', (e) => {
					if (e.target.hasAttribute('data-modal-close')) {
						this.closeModal(modal)
						this.bodyUnlock()
					}
				})
				window.addEventListener('keydown', (e) => {
					if (e.code === 'Escape' || e.keyCode === 27) {
						this.closeModal(modal)
						this.bodyUnlock()
					}
				})
			})
		})
	}

	openModal(modal) {
		const forms = modal.querySelectorAll('form')
		if (forms) {
			forms.forEach((form) => form.reset())
		}
		modal.classList.add('modal--opened')
		this.activeModal = modal
	}
	closeModal(modal) {
		const forms = modal.querySelectorAll('form')
		if (forms) {
			forms.forEach((form) => form.reset())
		}
		modal.classList.remove('modal--opened')
		this.activeModal = null
	}

	bodyLock() {
		const scrollWidth = window.innerWidth - document.documentElement.clientWidth
		const bodyPadding = parseInt(window.getComputedStyle(document.body).paddingRight)
		document.body.style.paddingRight = `${bodyPadding + scrollWidth}px`
		document.body.classList.add('lock-scroll')
	}

	bodyUnlock() {
		setTimeout(() => {
			document.body.classList.remove('lock-scroll')
			document.body.style = ``
		}, 300)
	}
}
