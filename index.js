const bottomInp = document.getElementById('bottom');
const bottomInp2 = document.getElementById('bottomPar');
const topInp = document.getElementById('top');
const topInp2 = document.getElementById('topPar');
const fInp = document.getElementById('f');
const formula = document.getElementById('formula');
const formula2 = document.getElementById('formula2');
const getRes = document.getElementById('resBtn');
const getRes2 = document.getElementById('resBtn2');
const res = document.getElementById('res');
const cancel = document.getElementById('cancel');
const err = document.querySelector(".error");
const select = document.getElementById('select');
const fileInput = document.getElementById('fileInput');
const manualInput = document.getElementById('manualInput');

const inpFile = document.getElementById('input-b2');

const clean = () => {
	bottomInp.value = '';
	topInp.value = '';
	fInp.value = '';
	formula.innerText = '() dx';
	formula2.innerText = '() dx';
	res.innerText = '';
	bottomInp2.innerText = '0';
	topInp2.innerText = '0';
}

const wasErr = () => {
	err.classList.remove("hidden");
	clean();
}



const integral = (a, b, f) => {
	const n = 100
	let s;
	const d = (b - a) / n;
	let xb;
	let xe;
	let x;
	s = 0;
	xb = a;
	f = "with (Math) {" + f + "}";
	for(let i = 0; i < n; i++) {
		xe = xb + d;
		x = (xb + xe) / 2;
		s = s + d * eval(f);
		xb = xe;
	}
	console.log(f)
	return Math.round(s * 1000) / 1000;
	}

// console.log(Math.round(integral(0, 1, 'x*x') * 100) / 100);

	fInp.addEventListener("change", (ev) => {
		console.log(ev.target.value)
		formula.innerText = `(${ev.target.value}) dx`;
	})

	getRes.addEventListener("click", () => {
		try {
			if (isNaN(integral(+bottomInp.value, +topInp.value, fInp.value))) throw "rkvbdf";
			res.innerText = `${integral(+bottomInp.value, +topInp.value, fInp.value)}`
		} catch (e) {
			err.classList.remove("hidden");
			bottomInp.value = '';
			topInp.value = '';
			fInp.value = '';
			formula.innerText = '() dx';
			res.innerText = ''
		}
	})

getRes2.addEventListener("click", () => {
	try {
		let file = inpFile.files[0];
		let topp, bott, func
		let reader = new FileReader();
		reader.readAsText(file);
		reader.onload = function() {
			[topp, bott, func] = reader.result.split(' ');
			bottomInp2.innerText = bott;
			topInp2.innerText = topp;
			formula2.innerText = `(${func}) dx`;
			if (isNaN(integral(+topp, +bott, func))) throw "rkvbdf";
			res.innerText = `${integral(+bott, +topp, func)}`
			};
		reader.onerror = function() {
			throw 'err';
		};
	} catch (e) {
		err.classList.remove("hidden");
		bottomInp.value = '';
		topInp.value = '';
		fInp.value = '';
		formula.innerText = '() dx';
		res.innerText = ''
	}
})

cancel.addEventListener("click", () => {
	err.classList.add("hidden");
});

select.addEventListener('change', (event) => {

	switch (event.target.value){
		case 'file':
			manualInput.classList.add('hidden');
			fileInput.classList.remove('hidden');
			getRes.classList.add('hidden');
			getRes2.classList.remove('hidden');
			clean();
			break

		case 'notFile':
			fileInput.classList.add('hidden');
			manualInput.classList.remove('hidden');
			getRes.classList.remove('hidden');
			getRes2.classList.add('hidden');
			clean();
			break
	}
});