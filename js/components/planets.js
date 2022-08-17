export function canvas() {
	const canvas = document.createElement('canvas')
	const context = canvas.getContext('2d')

	const canvasWidth = (canvas.width = window.innerWidth)
	const canvasHeight = (canvas.height = window.innerHeight)

	const FULL_ROUND = Math.PI * 2

	let mouse = null
	let dots = []

	let config = {
		dotMinRadius: 6,
		dotMaxRadius: 20,
		bigDotRadius: 40,
		dotColor: `rgba(60, 60, 60, 0.7)`,
		massFactor: 0.002,
		dotsQuantity: 60,
		smooth: 0.4,
		sphereRad: 300,
		mouseSize: 150,
	}

	const $body = document.querySelector('body')
	$body.appendChild(canvas)

	window.addEventListener('resize', () => {
		const canvasWidth = (canvas.width = window.innerWidth)
		const canvasHeight = (canvas.height = window.innerHeight)
	})

	class Dot {
		constructor(r) {
			this.pos = { x: mouse.x, y: mouse.y }
			this.velocity = { x: 0, y: 0 }
			this.radius = r || random(config.dotMinRadius, config.dotMaxRadius)
			this.mass = this.radius * config.massFactor
			this.color = config.dotColor
		}
		draw(x, y) {
			this.pos.x = x || this.pos.x + this.velocity.x
			this.pos.y = y || this.pos.y + this.velocity.y
			createCircle(this.pos.x, this.pos.y, this.radius, true, this.color)
			createCircle(this.pos.x, this.pos.y, this.radius, false, config.dotColor)
		}
	}

	function updateDots() {
		for (let i = 1; i < dots.length; i++) {
			let acc = { x: 0, y: 0 }

			for (let j = 0; j < dots.length; j++) {
				if (i == j) continue
				let [a, b] = [dots[i], dots[j]]

				let delta = { x: b.pos.x - a.pos.x, y: b.pos.y - a.pos.y }
				let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y) || 1
				let force = ((dist - config.sphereRad) / dist) * b.mass

				if (j == 0) {
					let alpha = config.mouseSize / dist
					a.color = `rgba(60, 60, 60, ${alpha})`
					dist < config.mouseSize ? (force = (dist - config.mouseSize) * b.mass) : (force = a.mass)
				}

				acc.x += delta.x * force
				acc.y += delta.y * force
			}
			dots[i].velocity.x = dots[i].velocity.x * config.smooth + acc.x * dots[i].mass
			dots[i].velocity.y = dots[i].velocity.y * config.smooth + acc.y * dots[i].mass
		}
		dots.forEach((dot) => (dot === dots[0] ? dot.draw(mouse.x, mouse.y) : dot.draw()))
	}

	function createCircle(x, y, rad, fill, color) {
		context.fillStyle = context.strokeStyle = color
		context.beginPath()
		context.arc(x, y, rad, 0, FULL_ROUND)
		context.closePath()
		fill ? context.fill() : context.stroke()
	}

	function random(min, max) {
		let rand = min + Math.random() * (max + 1 - min)
		return Math.floor(rand)
	}

	function loop() {
		context.clearRect(0, 0, canvasWidth, canvasHeight)

		if (mouse.down) dots.push(new Dot())
		updateDots()

		requestAnimationFrame(loop)
	}

	function init() {
		mouse = {
			x: canvasWidth / 2,
			y: canvasHeight / 2,
			down: false,
		}

		dots.push(new Dot(config.bigDotRadius))
	}

	init()
	loop()

	function setPos({ x, y }) {
		mouse.x = x
		mouse.y = y
	}

	function isDown() {
		mouse.down = !mouse.down
	}
	canvas.addEventListener('mousemove', setPos)
	window.addEventListener('mouseup', isDown)
	window.addEventListener('mousedown', isDown)
}
