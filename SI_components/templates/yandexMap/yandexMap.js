// Объявляем фунцию инициализации и вызываем ее, когда карта загрузилась

function initYandexMap() {
	let map = new ymaps.Map('ID блока с картой', {
		center: [50.59130164348107, 36.58778729849953],
		zoom: 17,
	})

	// Создание геообъекта с типом точка (метка) без текста.
	const geoPointNoText = new ymaps.Placemark(
		[50.59130164348107, 36.58778729849953], // куда вставить метку
		{},
		{
			iconLayout: 'default#image', // значение 'default#image' обязательно
			iconImageHref: '../files/location.svg', // путь к изображению
			iconImageSize: [50, 50], // размер изображения
			iconImageOffset: [0, 0], // сдвиг значка относительно точки привязки (задается, если "ножка" значка не находится в левом верхнем углу изображения)
		}
	)

	// Создание геообъекта с типом точка (метка) c баллуном текста.
	const geoPointWithText = new ymaps.Placemark(
		[59.910095482416324, 30.319871964318526],
		{
			balloonContent: `
				<div class="myballoon"> 
					<h5 class="myballoon__name">Бассейн WorkClass</h5>
					<div class="myballoon__address">Невский 140</div>
		 		</div>
			`,
		},
		{
			iconLayout: 'default#image',
			iconImageHref: '../files/location.svg',
			iconImageSize: [50, 50],
			iconImageOffset: [-23, -60],
		}
	)

	// Размещение геообъекта на карте.
	map.geoObjects.add(geoPointNoText)
	map.geoObjects.add(geoPointWithText)

	map.controls.remove('geolocationControl') // удаляем геолокацию
	map.controls.remove('searchControl') // удаляем поиск
	map.controls.remove('trafficControl') // удаляем контроль трафика
	map.controls.remove('typeSelector') // удаляем тип
	map.controls.remove('fullscreenControl') // удаляем кнопку перехода в полноэкранный режим
	map.controls.remove('rulerControl') // удаляем контрол правил
	// map.controls.remove('zoomControl') // удаляем контрол зуммирования
	// map.behaviors.disable(['scrollZoom']) // отключаем скролл карты (опционально)
}

ymaps.ready(initYandexMap)
