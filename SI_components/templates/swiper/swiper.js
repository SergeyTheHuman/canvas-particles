//- Пример js-инициализации
import Swiper from 'swiper/bundle'

const swiper = new Swiper('.класс', {
	slidesPerView: 2,
	spaceBetween: 30,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
	},
	scrollbar: {
		el: '.swiper-scrollbar',
		draggable: true,
	},
	autoplay: {
		delay: 5000,
	},
	breakpoints: {
		// when window width is >= 640px
		768: {
			slidesPerView: 4,
			spaceBetween: 40,
		},
	},
})
