import { Fancybox } from '@fancyapps/ui'

document.addEventListener('click', (e) => {
	// Если идет переход из одного попапа в другой, то закрываем предыдущий (у всех попапов должен быть класс .popup)
	if (e.target.hasAttribute('data-src') && e.target.closest('.popup')) {
		let currentModalId = Fancybox.getInstance().id
		const currentModal = Fancybox.getInstance(currentModalId - 1)
		currentModal.close()
	}
})