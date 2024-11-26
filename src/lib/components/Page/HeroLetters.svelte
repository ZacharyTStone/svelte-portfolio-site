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
		font-size: 25vw;
		font-weight: bold;
		color: var(--text-muted);
		opacity: 0.2;
	}

	@media (min-width: 1200px) {
		.hero-letter {
			font-size: 15vw;
		}
	}

	:global(:root[data-theme='dark']) .hero-letter {
		opacity: 0.2;
	}

	.z-letter {
		top: 50px;
		left: 0px;
		animation: slideInLeft 1s ease-out;
	}

	.s-letter {
		bottom: 0px;
		right: 0px;
		animation: slideInRight 1s ease-out;
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

	:global(:root[data-theme='dark']) .z-letter {
		animation: slideInLeft 1s ease-out;
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

	:global(:root[data-theme='dark']) .s-letter {
		animation: slideInRight 1s ease-out;
	}
</style>
