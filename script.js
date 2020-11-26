const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const facebookBtn = document.getElementById('facebook');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loading
function loading() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
	if (!loader.hidden) {
		quoteContainer.hidden = false;
		loader.hidden = true;
	}
}

// Get Quote From API
async function getQuote() {
	loading();
	const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
	try {
		const response = await fetch(proxyUrl + apiUrl);
		const data = await response.json();
		// if Author is blank, add Unknown
		if (data.quoteAuthor === '') {
			authorText.innerText = 'Unknown';
		} else {
			authorText.innerText = data.quoteAuthor
		}
		// Reduce font size for long quotes
		// if(data.quoteText.length > 50){
		// 	quoteText.classList.add('long-quote');
		// }else{
		// 	quoteText.classList.remove('long-quote');
		// }
		console.log(data);
		quoteText.innerText = data.quoteText;
		// Stop Loader, Show container
		complete();
	} catch (error) {
		getQuote();
	}
}

// Event Listener
newQuoteBtn.addEventListener('click', getQuote);

// On Load
getQuote();









