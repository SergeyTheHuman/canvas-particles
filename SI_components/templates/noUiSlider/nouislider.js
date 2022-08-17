import noUiSlider from 'nouislider'

const priceRange = document.querySelector('.price-filter__range')
const inputPriceFrom = document.querySelector('.price-filter__input--from')
const inputPriceTo = document.querySelector('.price-filter__input--to')

noUiSlider.create(priceRange, {
	start: [3000, 30000],
	connect: true,
	step: 500,
	range: {
		min: 5000,
		max: 30000,
	},
})

//Привязка инпутов к слайдеру
priceRange.noUiSlider.on('update', function (values, handle) {
	let value = values[handle]
	if (handle) {
		inputPriceTo.value = parseInt(value).toFixed(0)
	} else {
		inputPriceFrom.value = parseInt(value).toFixed(0)
	}
})

inputPriceFrom.addEventListener('change', function () {
	priceRange.noUiSlider.set([this.value, null])
})
inputPriceTo.addEventListener('change', function () {
	priceRange.noUiSlider.set([null, this.value])
})
