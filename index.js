document.addEventListener('DOMContentLoaded', () => {
	init();
});

function init() {
	let item = document.querySelector('.cd-slider ul');

	let items = item.querySelectorAll('li'),
		current = 0,
		autoUpdate = true,
		timeTrans = 4000;

	//create nav
	let nav = document.createElement('nav');
	nav.className = 'nav_arrows';

	//create button prev
	let prevbtn = document.createElement('button');
	prevbtn.classList.add('prev');
	prevbtn.classList.add('nav_arrow');
	prevbtn.setAttribute('aria-label', 'Prev');

	//create button next
	let nextbtn = document.createElement('button');
	nextbtn.classList.add('next');
	nextbtn.classList.add('nav_arrow');
	nextbtn.setAttribute('aria-label', 'Next');

	//create counter
	let counter = document.createElement('div');
	counter.className = 'counter';
	counter.innerHTML = '<span>1</span><span>' + items.length + '</span>';

	if (items.length > 1) {
		nav.appendChild(prevbtn);
		nav.appendChild(counter);
		nav.appendChild(nextbtn);
		item.appendChild(nav);
	}

	items[current].className = 'current';
	if (items.length > 1) items[items.length - 1].className = 'prev_slide';

	let navigate = function (dir) {
		items[current].className = '';

		if (dir === 'right') {
			current = current < items.length - 1 ? current + 1 : 0;
		} else {
			current = current > 0 ? current - 1 : items.length - 1;
		}

		let prevCurrent = current > 0 ? current - 1 : items.length - 1;

		items[current].className = 'current';
		items[prevCurrent].className = 'prev_slide';

		//update counter
		counter.firstChild.textContent = current + 1;
	};

	item.addEventListener('mouseenter', function () {
		autoUpdate = false;
	});

	item.addEventListener('mouseleave', function () {
		autoUpdate = true;
	});

	setInterval(() => {
		if (autoUpdate) navigate('right');
	}, timeTrans);

	prevbtn.addEventListener('click', function () {
		navigate('left');
	});

	nextbtn.addEventListener('click', function () {
		navigate('right');
	});

	// swipe navigation
	// from http://stackoverflow.com/a/23230280
	item.addEventListener('touchstart', handleTouchStart, false);
	item.addEventListener('touchmove', handleTouchMove, false);
	let xDown = null;
	let yDown = null;
	function handleTouchStart(evt) {
		xDown = evt.touches[0].clientX;
		yDown = evt.touches[0].clientY;
	}

	function handleTouchMove(evt) {
		if (!xDown || !yDown) {
			return;
		}

		let xUp = evt.touches[0].clientX;
		let yUp = evt.touches[0].clientY;

		let xDiff = xDown - xUp;
		let yDiff = yDown - yUp;

		if (Math.abs(xDiff) > Math.abs(yDiff)) {
			/*most significant*/
			if (xDiff > 0) {
				/* left swipe */
				navigate('right');
			} else {
				navigate('left');
			}
		}
		/* reset values */
		xDown = null;
		yDown = null;
	}
}
