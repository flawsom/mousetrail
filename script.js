const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;
let frame = 0;

window.addEventListener("resize", function () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

const mouse = {
	x: undefined,
	y: undefined,
};
canvas.addEventListener("click", function (event) {
	mouse.x = event.x;
	mouse.y = event.y;
	hue += 8;
	if (particlesArray.length < 100) {
		for (let i = 0; i < 20; i++) {
			particlesArray.push(new Particle());
		}
	}
});

canvas.addEventListener("mousemove", function (event) {
	mouse.x = event.x;
	mouse.y = event.y;
	hue += 2;
	if (frame % 2 === 0) {
		for (let i = 0; i < 7; i++) {
			particlesArray.push(new Particle());
		}
	}
});

class Particle {
	constructor() {
		this.x = mouse.x;
		this.y = mouse.y;
		this.size = Math.random() * 10 + 1;
		this.speedX = Math.random() * 3 - 1.5;
		this.speedY = Math.random() * 3 - 1.5;
		this.color = "hsl(" + hue + ", 100%, 50%)";
	}
	update() {
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.size > 0.2) this.size -= 0.1;
	}
	draw() {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}
}

function handleParticles() {
	for (let i = 0; i < particlesArray.length; i++) {
		for (let j = i; j < particlesArray.length; j++) {
			const dx = particlesArray[i].x - particlesArray[j].x;
			const dy = particlesArray[i].y - particlesArray[j].y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			if (distance < 100) {
				ctx.beginPath();
				ctx.strokeStyle = particlesArray[i].color;
				ctx.lineWidth = 0.2;
				ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
				ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
				ctx.stroke();
				ctx.closePath();
			}
		}
		particlesArray[i].update();
		particlesArray[i].draw();

		if (particlesArray[i].size <= 0.3) {
			particlesArray.splice(i, 1);
			i--;
		}
	}
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//ctx.fillStyle = 'rgba(0,0,0,0.02)';
	//ctx.fillRect(0, 0, canvas.width, canvas.height);
	handleParticles();
	frame++;
	requestAnimationFrame(animate);
}
animate();

function swRegistration() {
	const heart = ["font-size: 20px", "padding: 12px", "margin: 4px 0 4px 4px", "color: rgba(238,58,136,1)"].join(";");
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker
			.register("/mousetrail/sw.js", {
				scope: "/mousetrail/",
			})
			.then(function (registration) {
				console.log("%c❤️", heart);
			})
			.catch(function (err) {
				console.log(err);
			});
	}
}

function consoleText() {
	console.clear();
	const styles = [
		"color: white",
		"background: rgba(238,58,136,1)",
		"font-size: 18px",
		"padding: 12px",
		"margin: 6px 0 6px 14px",
	].join(";");
	const styles2 = ["font-size: 14px", "padding: 16px", "margin: 6px 0 6px 0", "color: rgba(238,58,136,1)"].join(";");
	console.log("%cHello World! I'm Siba.", styles);
	console.log("%cThank you for checking out my work!", styles2);
	const gradient = [
		"font-size: 14px",
		"color: #fff",
		"width: 200px",
		"padding: 8px",
		"margin: 6px 0 6px 14px",
		"border-radius: 4px",
		"background: rgba(238,58,136,1)",
		"background: linear-gradient( 109.6deg, rgba(238,58,136,1) 11.2%, rgba(128,162,245,1) 91.1% )",
	].join(";");
	console.log("%cPortfolio%chttps://bit.ly/3Z2RN0z", gradient, styles2);
	console.log("%cInstagram%chttps://bit.ly/3WTRJyC", gradient, styles2);
	console.log("%cGithub   %chttps://bit.ly/3GFA1tv", gradient, styles2);
	console.log("%cThe README   %chttps://bit.ly/3VCbM3i", gradient, styles2);
	console.log("%cHave a wonderful day!", styles2);
}

swRegistration();
consoleText();
