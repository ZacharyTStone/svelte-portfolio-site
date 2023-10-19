// confetti.ts
import { FallingConfetti, ConfettiBurst, ConfettiCannon, random } from 'svelte-canvas-confetti';
import { tick } from 'svelte';

export const makeFallingConfetti = async () => {
	fallingConfetti = false;
	await tick();
	fallingConfetti = true;
};

export const makeConfettiBurst = async () => {
	confettiBurst = false;
	await tick();
	confettiBurst = true;
};

export const makeConfettiCannon = async () => {
	confettiCannon = false;
	await tick();
	confettiCannon = true;
};

export const makeAllConfetti = () => {
	makeFallingConfetti();
	makeConfettiBurst();
	makeConfettiCannon();
};

let fallingConfetti = false;
let confettiBurst = false;
let confettiCannon = false;

// Additional configurations or helper functions can be added as needed
