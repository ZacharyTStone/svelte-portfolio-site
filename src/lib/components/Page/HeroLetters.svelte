<script lang="ts">
</script>

<div class="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
	<div class="grid grid-cols-5 grid-rows-2 w-full h-full relative">
		<!-- First row - ZACH -->
		<button class="hero-letter top-[5%] left-[5%] animate-float-z">Z</button>
		<button class="hero-letter top-[12%] left-[30%] animate-float-a">A</button>
		<button class="hero-letter top-[8%] right-[30%] animate-float-c">C</button>
		<button class="hero-letter top-[15%] right-[8%] animate-float-h">H</button>

		<!-- Second row - STONE -->
		<button class="hero-letter bottom-[15%] left-[8%] animate-float-s">S</button>
		<button class="hero-letter bottom-[20%] left-[28%] animate-float-t">T</button>
		<button class="hero-letter bottom-[8%] left-[45%] animate-float-o">O</button>
		<button class="hero-letter bottom-[18%] right-[22%] animate-float-n">N</button>
		<button class="hero-letter bottom-[10%] right-[5%] animate-float-e">E</button>
	</div>
</div>

<style>
	/* Base letter styling - converting @apply to regular CSS */
	.hero-letter {
		font-family: var(--title-f);
		font-weight: var(--fw-extrabold);
		color: var(--text-muted);
		opacity: 0.07;
		position: absolute;
		cursor: default;
		pointer-events: auto;
		text-transform: uppercase;
		letter-spacing: var(--ls-tighter);
		user-select: none;
		background: none;
		border: none;
		padding: 0;
		font-size: clamp(60px, 12vw, 180px);
		filter: blur(1px);
		transform-origin: center;
		transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		animation: fadeInRotate 2s ease-out forwards;
	}

	/* Removed :hover effects, keeping only :focus for accessibility */
	.hero-letter:focus {
		opacity: 0.25;
		transform: scale(1.1);
		color: var(--accent);
		filter: blur(0);
		text-shadow: 0 0 15px var(--accent-alpha);
	}

	.hero-letter:active {
		transform: scale(0.95);
		opacity: 0.3;
		transition: all 0.2s ease;
	}

	/* Animation for initial load */
	@keyframes fadeInRotate {
		0% {
			opacity: 0;
			transform: translateY(30px) rotate(-5deg) scale(0.8);
		}
		100% {
			opacity: 0.07;
			transform: translateY(0) rotate(0) scale(1);
		}
	}

	/* Unique floating animations for each letter */
	.animate-float-z {
		animation-delay: 0s;
		animation:
			fadeInRotate 2s ease-out forwards,
			float-z 20s ease-in-out infinite alternate;
	}
	.animate-float-a {
		animation-delay: 0.2s;
		animation:
			fadeInRotate 2s 0.2s ease-out forwards,
			float-a 25s ease-in-out infinite alternate;
	}
	.animate-float-c {
		animation-delay: 0.4s;
		animation:
			fadeInRotate 2s 0.4s ease-out forwards,
			float-c 22s ease-in-out infinite alternate;
	}
	.animate-float-h {
		animation-delay: 0.6s;
		animation:
			fadeInRotate 2s 0.6s ease-out forwards,
			float-h 24s ease-in-out infinite alternate;
	}
	.animate-float-s {
		animation-delay: 0.8s;
		animation:
			fadeInRotate 2s 0.8s ease-out forwards,
			float-s 26s ease-in-out infinite alternate;
	}
	.animate-float-t {
		animation-delay: 1s;
		animation:
			fadeInRotate 2s 1s ease-out forwards,
			float-t 23s ease-in-out infinite alternate;
	}
	.animate-float-o {
		animation-delay: 1.2s;
		animation:
			fadeInRotate 2s 1.2s ease-out forwards,
			float-o 21s ease-in-out infinite alternate;
	}
	.animate-float-n {
		animation-delay: 1.4s;
		animation:
			fadeInRotate 2s 1.4s ease-out forwards,
			float-n 27s ease-in-out infinite alternate;
	}
	.animate-float-e {
		animation-delay: 1.6s;
		animation:
			fadeInRotate 2s 1.6s ease-out forwards,
			float-e 24s ease-in-out infinite alternate;
	}

	/* Letter-specific focus transformations (removed hover) */
	.hero-letter:nth-child(1):focus {
		transform: scale(1.1) rotate(5deg);
	}
	.hero-letter:nth-child(2):focus {
		transform: scale(1.1) rotate(-5deg);
	}
	.hero-letter:nth-child(3):focus {
		transform: scale(1.1) rotate(3deg);
	}
	.hero-letter:nth-child(4):focus {
		transform: scale(1.1) rotate(-3deg);
	}
	.hero-letter:nth-child(5):focus {
		transform: scale(1.1) rotate(4deg);
	}
	.hero-letter:nth-child(6):focus {
		transform: scale(1.1) rotate(-4deg);
	}
	.hero-letter:nth-child(7):focus {
		transform: scale(1.1) rotate(5deg);
	}
	.hero-letter:nth-child(8):focus {
		transform: scale(1.1) rotate(-5deg);
	}
	.hero-letter:nth-child(9):focus {
		transform: scale(1.1) rotate(3deg);
	}

	/* Unique floating animations for each letter */
	@keyframes float-z {
		0%,
		100% {
			transform: translate(0, 0) rotate(0);
		}
		50% {
			transform: translate(10px, -15px) rotate(2deg);
		}
	}
	@keyframes float-a {
		0%,
		100% {
			transform: translate(0, 0) rotate(0);
		}
		50% {
			transform: translate(-5px, -8px) rotate(-1deg);
		}
	}
	@keyframes float-c {
		0%,
		100% {
			transform: translate(0, 0) rotate(0);
		}
		50% {
			transform: translate(8px, -12px) rotate(1.5deg);
		}
	}
	@keyframes float-h {
		0%,
		100% {
			transform: translate(0, 0) rotate(0);
		}
		50% {
			transform: translate(-10px, -5px) rotate(-2deg);
		}
	}
	@keyframes float-s {
		0%,
		100% {
			transform: translate(0, 0) rotate(0);
		}
		50% {
			transform: translate(5px, 10px) rotate(2deg);
		}
	}
	@keyframes float-t {
		0%,
		100% {
			transform: translate(0, 0) rotate(0);
		}
		50% {
			transform: translate(-8px, 15px) rotate(-1deg);
		}
	}
	@keyframes float-o {
		0%,
		100% {
			transform: translate(0, 0) rotate(0);
		}
		50% {
			transform: translate(12px, 8px) rotate(1.5deg);
		}
	}
	@keyframes float-n {
		0%,
		100% {
			transform: translate(0, 0) rotate(0);
		}
		50% {
			transform: translate(-15px, 10px) rotate(-1.5deg);
		}
	}
	@keyframes float-e {
		0%,
		100% {
			transform: translate(0, 0) rotate(0);
		}
		50% {
			transform: translate(10px, 12px) rotate(2deg);
		}
	}

	/* Media query for mobile devices */
	@media (max-width: 768px) {
		.hero-letter {
			opacity: 0.05;
			font-size: clamp(30px, 8vw, 100px);
			filter: blur(0.5px);
		}

		/* Rearrange letters for mobile */
		.hero-letter:nth-child(1) {
			top: 15%;
			left: 5%;
		}
		.hero-letter:nth-child(2) {
			top: 15%;
			left: 30%;
		}
		.hero-letter:nth-child(3) {
			top: 15%;
			right: 30%;
		}
		.hero-letter:nth-child(4) {
			top: 15%;
			right: 5%;
		}
		.hero-letter:nth-child(5) {
			bottom: 15%;
			left: 5%;
		}
		.hero-letter:nth-child(6) {
			bottom: 15%;
			left: 22%;
		}
		.hero-letter:nth-child(7) {
			bottom: 15%;
			left: 40%;
		}
		.hero-letter:nth-child(8) {
			bottom: 15%;
			right: 22%;
		}
		.hero-letter:nth-child(9) {
			bottom: 15%;
			right: 5%;
		}

		/* Make focus effects more subtle on mobile (removed hover) */
		.hero-letter:focus {
			opacity: 0.15;
			transform: scale(1.05);
		}
	}
</style>
