<span class="hero-letter z-letter">ZACH</span>
<span class="hero-letter s-letter">STONE</span>

<style>
	.hero-letter {
		position: absolute;
		font-size: 30vw;
		font-weight: bold;
		color: var(--text-muted);
		opacity: 0.1;
	}

	@media (min-width: 1200px) {
		.hero-letter {
			font-size: 15vw;
		}
	}

	:global(:root[data-theme='dark']) .hero-letter {
		opacity: 0.3;
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
			opacity: 0.1;
		}
	}

	:global(:root[data-theme='dark']) .z-letter {
		animation: slideInLeftDark 1s ease-out;
	}

	@keyframes slideInLeftDark {
		0% {
			transform: translateX(-100%);
			opacity: 0;
		}
		100% {
			transform: translateX(0);
			opacity: 0.3;
		}
	}

	@keyframes slideInRight {
		0% {
			transform: translateX(100%);
			opacity: 0;
		}
		100% {
			transform: translateX(0);
			opacity: 0.1;
		}
	}

	:global(:root[data-theme='dark']) .s-letter {
		animation: slideInRightDark 1s ease-out;
	}

	@keyframes slideInRightDark {
		0% {
			transform: translateX(100%);
			opacity: 0;
		}
		100% {
			transform: translateX(0);
			opacity: 0.3;
		}
	}
</style>
