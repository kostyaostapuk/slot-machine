const DISPLAY = document.querySelector('.slot-machine__display');
const SLOTS = document.querySelectorAll('.slot-machine__slots > .slot-machine__slot');
const BUTTON = document.querySelector('.slot-machine button');
const TITLE = document.querySelector('.slot-machine__score > span');

const RUNNED_INTERVALS = [];
const ITEMS = [
	{ name: 'seven', value: 70 },
	{ name: 'big', value: 0 },
	{ name: 'cherry', value: -70 },
	{ name: 'banana', value: -140 },
	{ name: 'watermelow', value: -215 },
	{ name: 'orange', value: -286 },
	{ name: 'plum', value: -360 },
	{ name: 'lemon', value: -430 },
	{ name: 'bar', value: -500 },
];

let RANDOM_COMBINATION;
let SPINNING = false;
let SCORE = 10000;
TITLE.textContent=SCORE;

function updateScore(value){
	SCORE+=value;
	TITLE.textContent=SCORE;
	
	if(SCORE<1000){
		DISPLAY.textContent = 'Need to purchase game currency';
		DISPLAY.classList.toggle('blink');
		BUTTON.disabled = true;
	}
}

function swapImages() {
	SLOTS.forEach((item) => {
		item.style.backgroundImage = SPINNING ? 'url(img/blur.png)' : 'url(img/default.png)';
	});
}

function random() {
	const combination = [];
	for (let i = 0; i < SLOTS.length; i++) {
		const index = Math.floor(Math.random() * ITEMS.length);
		combination.push(index === 1 ? ITEMS[0].value : ITEMS[index].value);
	}
	return combination;
}

function spin() {
	let startValue = 0;
	let interval;
	for (let i = 0; i < SLOTS.length; i++) {
		interval = setInterval(() => {
			SLOTS[i].style.backgroundPosition = `0 ${(startValue += 40)
			}px`;

		}, 50);
		RUNNED_INTERVALS.push(interval);
	}
}
function start() {
	if(SCORE<1000){
	 return;
	}
	SPINNING = true;
	BUTTON.disabled = true;
	DISPLAY.textContent = 'Spinning...';
	RANDOM_COMBINATION = random();
	swapImages();
	spin();
	stop();
}
function stop() {
	let timeout = 3000;
	const slotPromises = [];
	SLOTS.forEach((slot, index) => {
		const promise = new Promise((resolve, reject) => {
			setTimeout(() => {
				clearInterval(RUNNED_INTERVALS[index]);
				slot.style.backgroundPosition = `0 ${RANDOM_COMBINATION[index]}px`;
				slot.style.backgroundImage = 'url(img/default.png)';
				resolve();
			}, timeout);
		});
		timeout += 500;
		SPINNING = false;
		slotPromises.push(promise);
	});

	Promise.all(slotPromises).then(() => {
		BUTTON.disabled = false;
		RUNNED_INTERVALS.length = 0;
		swapImages();
		checkCombination();
	});
}

function checkCombination() {
	setTimeout(() => {
		if (RANDOM_COMBINATION[0] === RANDOM_COMBINATION[1] && RANDOM_COMBINATION[0] === RANDOM_COMBINATION[2]) {
			DISPLAY.textContent = 'You win!';
			updateScore(1000);
		} else {
			DISPLAY.textContent = 'You lose';
			updateScore(-1000);
		}
	}, 500);
}
BUTTON.addEventListener('click', start);



(function(){
	const BULBS = document.querySelectorAll('.light-bulbs > .light-bulb');
	BULBS.forEach(bulb=>{
		const classModificatorColor = bulb.classList[1];
		setInterval(()=>{
			bulb.classList.toggle(classModificatorColor);
		},Math.round(Math.random()*1000 + 1000 - 500));
		bulb.classList.toggle(classModificatorColor);
	})
})();
