import Toastify from 'toastify-js'

const toast = Toastify({
	text: 'Сообщение успешно отправлено!',
	duration: 3000,
	close: true,
	gravity: 'bottom', // `top` / `bottom`
	position: 'center', // `left` / `center` / `right`
	stopOnFocus: true, // Prevents dismissing of toast on hover
	style: {
		// Custom styles here
		background: 'black',
		boxShadow: `0px 0px 15px 5px rgba(80, 80, 80, 0.3)`,
		borderRadius: `10px`,
	},
	onClick: function () {
		console.log('toast')
	}, // Callback after click
})

toast.showToast()
