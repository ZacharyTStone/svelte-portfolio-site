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
		transition: opacity 0.3s ease, transform 0.3s ease;
		animation: fadeInRotate 1.5s ease-out forwards;
	}

	/* Focus for accessibility */
	.hero-letter:focus {
		opacity: 0.25;
		transform: scale(1.05);
		color: var(--accent);
		filter: blur(0);
	}

	.hero-letter:active {
		opacity: 0.3;
		transition: opacity 0.2s ease;
	}

	/* Simplified animation for initial load */
	@keyframes fadeInRotate {
		0% {
			opacity: 0;
			transform: translateY(20px);
		}
		100% {
			opacity: 0.07;
			transform: translateY(0);
		}
	}

	/* Simplified floating animations - using single shared animation */
	.animate-float-z {
		animation:
			fadeInRotate 1.5s ease-out forwards,
			float-shared 20s ease-in-out infinite alternate;
	}
	.animate-float-a {
		animation:
			fadeInRotate 1.5s 0.1s ease-out forwards,
			float-shared 20s 0.1s ease-in-out infinite alternate;
	}
	.animate-float-c {
		animation:
			fadeInRotate 1.5s 0.2s ease-out forwards,
			float-shared 20s 0.2s ease-in-out infinite alternate;
	}
	.animate-float-h {
		animation:
			fadeInRotate 1.5s 0.3s ease-out forwards,
			float-shared 20s 0.3s ease-in-out infinite alternate;
	}
	.animate-float-s {
		animation:
			fadeInRotate 1.5s 0.4s ease-out forwards,
			float-shared 20s 0.4s ease-in-out infinite alternate;
	}
	.animate-float-t {
		animation:
			fadeInRotate 1.5s 0.5s ease-out forwards,
			float-shared 20s 0.5s ease-in-out infinite alternate;
	}
	.animate-float-o {
		animation:
			fadeInRotate 1.5s 0.6s ease-out forwards,
			float-shared 20s 0.6s ease-in-out infinite alternate;
	}
	.animate-float-n {
		animation:
			fadeInRotate 1.5s 0.7s ease-out forwards,
			float-shared 20s 0.7s ease-in-out infinite alternate;
	}
	.animate-float-e {
		animation:
			fadeInRotate 1.5s 0.8s ease-out forwards,
			float-shared 20s 0.8s ease-in-out infinite alternate;
	}

	/* Simplified focus transformation */
	.hero-letter:focus {
		transform: scale(1.05);
	}

	/* Simplified shared floating animation */
	@keyframes float-shared {
		0%,
		100% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(8px, -10px);
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

		/* Make focus effects more subtle on mobile */
		.hero-letter:focus {
			opacity: 0.15;
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.hero-letter {
			animation: none !important;
			transition: none !important;
		}
	}
</style>
