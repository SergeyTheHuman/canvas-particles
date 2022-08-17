import { isWebp } from './utils/isWebp.js'

isWebp()

function canvas() {
	const canvas = document.createElement('canvas')
	const context = canvas.getContext('2d')

	const canvasWidth = (canvas.width = window.innerWidth)
	const canvasHeight = (canvas.height = window.innerHeight)

	const FULL_ROUND = Math.PI * 2

	let particles = []
	let config = {
		bgColor: `rgba(30, 30, 30, 1)`,
		particleColor: `rgba(255, 255, 40, 1)`,
		particleRadius: 3,
		particleQuantity: Math.round((canvasWidth + canvasHeight) / 20),
		particleMaxVelocity: 0.5,
		particleLife: 6,
		lineLenght: 150,
		mouseCircleRadius: 100,
	}

	const $body = document.querySelector('body')
	$body.appendChild(canvas)

	window.addEventListener('resize', () => {
		const canvasWidth = (canvas.width = window.innerWidth)
		const canvasHeight = (canvas.height = window.innerHeight)
	})

	class Particle {
		constructor() {
			this.posX = Math.random() * canvasWidth
			this.posY = Math.random() * canvasHeight
			this.velocityX = Math.random() * (config.particleMaxVelocity * 2) - config.particleMaxVelocity
			this.velocityY = Math.random() * (config.particleMaxVelocity * 2) - config.particleMaxVelocity
			this.life = Math.random() * config.particleLife * 60
		}
		updatePosition() {
			if ((this.posX + this.velocityX > canvasWidth && this.velocityX > 0) || (this.posX + this.velocityX < 0 && this.velocityX < 0)) {
				this.velocityX *= -1
			} else {
				this.velocityX
			}
			if ((this.posY + this.velocityY > canvasHeight && this.velocityY > 0) || (this.posY + this.velocityY < 0 && this.velocityY < 0)) {
				this.velocityY *= -1
			} else {
				this.velocityY
			}
			this.posX += this.velocityX
			this.posY += this.velocityY
		}
		reDraw() {
			context.beginPath()
			context.arc(this.posX, this.posY, config.particleRadius, 0, FULL_ROUND)
			context.closePath()
			context.fillStyle = config.particleColor
			context.fill()
		}
		reSpawnParticle() {
			if (this.life < 1) {
				this.posX = Math.random() * canvasWidth
				this.posY = Math.random() * canvasHeight
				this.velocityX = Math.random() * (config.particleMaxVelocity * 2) - config.particleMaxVelocity
				this.velocityY = Math.random() * (config.particleMaxVelocity * 2) - config.particleMaxVelocity
				this.life = Math.random() * config.particleLife * 60
			}
			this.life--
		}
	}

	class MouseCircle {
		constructor() {
			canvas.addEventListener('mousemove', (e) => {
				this.posX = e.clientX
				this.posY = e.clientY
			})
		}
		reDraw() {
			context.beginPath()
			context.arc(this.posX, this.posY, config.mouseCircleRadius, 0, FULL_ROUND)
			context.closePath()
			context.strokeStyle = config.particleColor
			context.stroke()
		}
	}

	const mouseCircle = new MouseCircle()

	function drawLines() {
		let x1, y1, x2, y2, lenght, opacity

		for (let i = 0; i < particles.length; i++) {
			for (let j = i + 1; j < particles.length; j++) {
				x1 = particles[i].posX
				y1 = particles[i].posY

				x2 = particles[j].posX
				y2 = particles[j].posY

				lenght = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

				if (lenght < config.lineLenght) {
					opacity = 1 - lenght / config.lineLenght

					context.lineWidth = `1`
					context.strokeStyle = `rgba(255, 40, 40, ${opacity})`
					context.beginPath()
					context.moveTo(x1, y1)
					context.lineTo(x2, y2)
					context.closePath()
					context.stroke()
				}
			}
		}
	}

	function redrawRect() {
		context.fillStyle = config.bgColor
		context.fillRect(0, 0, canvasWidth, canvasHeight)
	}

	function redrawParticles() {
		for (const particle of particles) {
			particle.reSpawnParticle()
			particle.updatePosition()
			particle.reDraw()
		}
	}
	function loop() {
		redrawRect()
		mouseCircle.reDraw()
		redrawParticles()
		drawLines()
		requestAnimationFrame(loop)
	}

	function init() {
		for (let i = 0; i < config.particleQuantity; i++) {
			particles.push(new Particle())
		}
		loop()
	}

	init()
}

canvas()
