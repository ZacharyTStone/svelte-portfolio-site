<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// Track viewport size for responsive adjustments
	let innerWidth = 0;

	onMount(() => {
		if (browser) {
			innerWidth = window.innerWidth;

			const handleResize = () => {
				innerWidth = window.innerWidth;
			};

			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}
	});
</script>

<div class="hero-letters-container">
	<div class="letter-grid">
		<!-- First row - ZACH -->
		<div class="letter letter-z" tabindex="0">Z</div>
		<div class="letter letter-a" tabindex="0">A</div>
		<div class="letter letter-c" tabindex="0">C</div>
		<div class="letter letter-h" tabindex="0">H</div>

		<!-- Second row - STONE -->
		<div class="letter letter-s" tabindex="0">S</div>
		<div class="letter letter-t" tabindex="0">T</div>
		<div class="letter letter-o" tabindex="0">O</div>
		<div class="letter letter-n" tabindex="0">N</div>
		<div class="letter letter-e" tabindex="0">E</div>
	</div>
</div>

<style>
	.hero-letters-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 0;
		overflow: hidden;
	}

	.letter-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(2, 1fr);
		width: 100%;
		height: 100%;
		position: relative;
	}

	.letter {
		font-family: var(--title-f);
		font-weight: var(--fw-extrabold);
		color: var(--text-muted);
		opacity: 0.07;
		font-size: clamp(60px, 12vw, 180px);
		position: absolute;
		transform-origin: center;
		filter: blur(1px);
		text-transform: uppercase;
		letter-spacing: var(--ls-tighter);
		pointer-events: auto;
		cursor: default;
		transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		user-select: none;
	}

	.letter:hover,
	.letter:focus {
		opacity: 0.25;
		filter: blur(0);
		transform: scale(1.1);
		color: var(--accent);
		text-shadow: 0 0 15px var(--accent-alpha);
	}

	.letter:active {
		transform: scale(0.95);
		opacity: 0.3;
		transition: all 0.2s ease;
	}

	/* Z positioning and animation */
	.letter-z {
		top: 5%;
		left: 5%;
		animation:
			fadeInRotate 2s ease-out forwards,
			float-z 20s ease-in-out infinite alternate;
	}

	.letter-z:hover,
	.letter-z:focus {
		transform: scale(1.1) rotate(5deg);
	}

	/* A positioning and animation */
	.letter-a {
		top: 12%;
		left: 30%;
		animation:
			fadeInRotate 2s 0.2s ease-out forwards,
			float-a 25s ease-in-out infinite alternate;
	}

	.letter-a:hover,
	.letter-a:focus {
		transform: scale(1.1) rotate(-5deg);
	}

	/* C positioning and animation */
	.letter-c {
		top: 8%;
		right: 30%;
		animation:
			fadeInRotate 2s 0.4s ease-out forwards,
			float-c 22s ease-in-out infinite alternate;
	}

	.letter-c:hover,
	.letter-c:focus {
		transform: scale(1.1) rotate(3deg);
	}

	/* H positioning and animation */
	.letter-h {
		top: 15%;
		right: 8%;
		animation:
			fadeInRotate 2s 0.6s ease-out forwards,
			float-h 24s ease-in-out infinite alternate;
	}

	.letter-h:hover,
	.letter-h:focus {
		transform: scale(1.1) rotate(-3deg);
	}

	/* S positioning and animation */
	.letter-s {
		bottom: 15%;
		left: 8%;
		animation:
			fadeInRotate 2s 0.8s ease-out forwards,
			float-s 26s ease-in-out infinite alternate;
	}

	.letter-s:hover,
	.letter-s:focus {
		transform: scale(1.1) rotate(4deg);
	}

	/* T positioning and animation */
	.letter-t {
		bottom: 20%;
		left: 28%;
		animation:
			fadeInRotate 2s 1s ease-out forwards,
			float-t 23s ease-in-out infinite alternate;
	}

	.letter-t:hover,
	.letter-t:focus {
		transform: scale(1.1) rotate(-4deg);
	}

	/* O positioning and animation */
	.letter-o {
		bottom: 8%;
		left: 45%;
		animation:
			fadeInRotate 2s 1.2s ease-out forwards,
			float-o 21s ease-in-out infinite alternate;
	}

	.letter-o:hover,
	.letter-o:focus {
		transform: scale(1.1) rotate(5deg);
	}

	/* N positioning and animation */
	.letter-n {
		bottom: 18%;
		right: 22%;
		animation:
			fadeInRotate 2s 1.4s ease-out forwards,
			float-n 27s ease-in-out infinite alternate;
	}

	.letter-n:hover,
	.letter-n:focus {
		transform: scale(1.1) rotate(-5deg);
	}

	/* E positioning and animation */
	.letter-e {
		bottom: 10%;
		right: 5%;
		animation:
			fadeInRotate 2s 1.6s ease-out forwards,
			float-e 24s ease-in-out infinite alternate;
	}

	.letter-e:hover,
	.letter-e:focus {
		transform: scale(1.1) rotate(3deg);
	}

	/* Media query for mobile devices */
	@media (max-width: 768px) {
		.letter {
			font-size: clamp(30px, 8vw, 100px);
			filter: blur(0.5px);
			opacity: 0.05;
		}

		/* Completely different arrangement for mobile - two distinct groups */
		/* ZACH at the top */
		.letter-z {
			top: 15%;
			left: 5%;
		}

		.letter-a {
			top: 15%;
			left: 30%;
		}

		.letter-c {
			top: 15%;
			right: 30%;
		}

		.letter-h {
			top: 15%;
			right: 5%;
		}

		/* STONE at the bottom */
		.letter-s {
			bottom: 15%;
			left: 5%;
		}

		.letter-t {
			bottom: 15%;
			left: 22%;
		}

		.letter-o {
			bottom: 15%;
			left: 40%;
		}

		.letter-n {
			bottom: 15%;
			right: 22%;
		}

		.letter-e {
			bottom: 15%;
			right: 5%;
		}

		/* Make hover effects more subtle on mobile */
		.letter:hover,
		.letter:focus {
			opacity: 0.15;
			transform: scale(1.05);
		}
	}

	/* Animation keyframes */
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
</style>
