import image from './Konami.svg';
import './Konami.scss';

export default class Konami {
	constructor(options = {}) {
		this.element = null;
		this.options = options;
		this.currentKeyCodes = [];
		this.keyCodes = this.options.keyCodes || [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
		this.buildHTML();
	}

	buildHTML() {
		this.element = document.createElement('img');
		this.element.classList.add('konami-image');
		this.element.setAttribute('src', image);
		document.body.appendChild(this.element);
	}

	init() {
		window.addEventListener('keydown', e => {
			const keyCode = e.keyCode;
			if (this.isNextKey(keyCode)) {
				this.currentKeyCodes.push(keyCode);
				if(this.isKonamiComplete()) {
					this.runAnimation();
				}
			} else {
				this.resetKeyCodes();
			}
		});
	}

	resetKeyCodes() {
		this.currentKeyCodes = [];
	}

	isNextKey(keyCode) {
		return this.keyCodes[this.currentKeyCodes.length] === keyCode;
	}

	isKonamiComplete() {
		return this.keyCodes.length === this.currentKeyCodes.length;
	}

	runAnimation() {
		this.element.classList.add('konami-image-reveal');
	}
}