const $burgerButton = document.querySelector('.header__burger')
const $headerMenu = document.querySelector('.header__menu')
const $headerButtons = document.querySelector('.header__buttons')
const $headerNav = document.querySelector('.header__nav')
const $body = document.body

$burgerButton.addEventListener('click', (e) => {
	$headerNav.classList.contains('active') ? unlockScroll($body) : lockScroll($body)
	$headerNav.classList.toggle('active')
	$burgerButton.classList.toggle('active')
	$headerMenu.classList.toggle('active')
	$headerButtons.classList.toggle('active')
})

function lockScroll(element) {
	const lockPadding = window.innerWidth - document.body.clientWidth + 'px'
	setTimeout(() => {
		element.classList.add('lock-scroll')
		element.style.paddingRight = lockPadding
	}, 200)
}

function unlockScroll(element) {
	setTimeout(() => {
		element.classList.remove('lock-scroll')
		element.style.paddingRight = ''
	}, 200)
}
