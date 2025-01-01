<div class="hero-letters">
	<span class="hero-letter z-letter">ZACH</span>
	<span class="hero-letter s-letter">STONE</span>
</div>

<style>
	.hero-letters {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.hero-letter {
		position: absolute;
		font-size: 25vh;
		font-weight: bold;
		color: var(--text-muted);
		opacity: 0.2;
	}

	:global(:root[data-theme='dark']) .hero-letter {
		opacity: 0.2;
	}

	.z-letter {
		top: 20px;
		left: 20px;
		animation:
			slideInLeft 1s ease-out,
			fadeOutUp 1s 2s ease-in forwards;
	}

	.s-letter {
		bottom: 20px;
		right: 20px;
		animation:
			slideInRight 1s ease-out,
			fadeOutUp 1s 2s ease-in forwards;
	}

	@media (max-width: 768px) {
		.z-letter {
			top: 30dvh;
			left: 20px;
		}

		.s-letter {
			bottom: 30dvh;
			right: 20px;
		}
	}

	@keyframes slideInLeft {
		0% {
			transform: translateX(-100%);
			opacity: 0;
		}
		100% {
			transform: translateX(0);
			opacity: 0.2;
		}
	}

	@keyframes slideInRight {
		0% {
			transform: translateX(100%);
			opacity: 0;
		}
		100% {
			transform: translateX(0);
			opacity: 0.2;
		}
	}

	@keyframes fadeOutUp {
		0% {
			opacity: 0.2;
			transform: translateY(0);
		}
		100% {
			opacity: 0;
			transform: translateY(-100%);
		}
	}
</style>
