const bottomInp = document.getElementById('bottom');
const topInp = document.getElementById('top');
const fInp = document.getElementById('f');
const formula = document.getElementById('formula');

const integral = (a, b, f) => {
	const n = 100
	let s;
	const d = (b - a) / n;
	let xb;
	let xe;
	let x;
	const t = f;
	s = 0;
	xb = a;
	f = "with (Math) {" + f + "}";
	// console.log(f)
	// console.log(eval(f))
	for(let i = 0; i < n; i++) {
		xe = xb + d;
		x = (xb + xe) / 2;
		s = s + d * eval(f);
		xb = xe;
	}
	return s;
	}

// console.log(Math.round(myTest() * 100) / 100);

fInp.addEventListener( "change", (ev) => {
	console.log(ev.target.value)
	formula.innerText = `(${ev.target.value}) dx`;
})