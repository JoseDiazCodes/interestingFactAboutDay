const fetchButton = document.querySelector("button");
const numberInput = document.getElementById("numberInput");
const numberFactDiv = document.getElementById("numberFact");
const dateEventDiv = document.getElementById("dateEvent");

fetchButton.addEventListener("click", handleButtonClick);

function handleButtonClick() {
	const number = numberInput.value;
	fetchNumberFact(number);

	if (number >= 1 && number <= 31) {
		const today = new Date();
		const month = today.getMonth() + 1;
		fetchHistoricalEvent(month, number);
	} else {
		dateEventDiv.innerText = "";
	}
}

function fetchNumberFact(number) {
	const proxyUrl = "https://api.allorigins.win/raw?url=";
	const targetUrl = `http://numbersapi.com/${number}`;
	fetch(proxyUrl + targetUrl)
		.then(checkResponseStatus)
		.then((response) => response.text())
		.then((data) => {
			numberFactDiv.innerText = `Fact about ${number}: ${data}`;
		})
		.catch(handleNumberFactError);
}

function fetchHistoricalEvent(month, day) {
	fetch(`https://history.muffinlabs.com/date/${month}/${day}`)
		.then(checkResponseStatus)
		.then((response) => response.json())
		.then((data) => {
			const events = data.data.Events;
			if (events && events.length) {
				const event = events[Math.floor(Math.random() * events.length)];
				dateEventDiv.innerText = `On ${month}/${day} in ${event.year}: ${event.text}`;
			} else {
				dateEventDiv.innerText = "No historical events found for this date.";
			}
		})
		.catch(handleHistoricalEventError);
}

function checkResponseStatus(response) {
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response;
}

function handleNumberFactError(error) {
	console.error("Error fetching number fact:", error);
	numberFactDiv.innerText = "Error fetching number fact.";
}

function handleHistoricalEventError(error) {
	console.error("Error fetching historical event:", error);
	dateEventDiv.innerText = "Error fetching historical event.";
}

// const fetchButton = document.querySelector("button");
// const numberInput = document.getElementById("numberInput");
// const numberFactDiv = document.getElementById("numberFact");
// const dateEventDiv = document.getElementById("dateEvent");

// fetchButton.addEventListener("click", handleButtonClick);

// function handleButtonClick() {
// 	const number = numberInput.value;
// 	fetchNumberFact(number);

// 	if (number >= 1 && number <= 31) {
// 		const today = new Date();
// 		const month = today.getMonth() + 1;
// 		fetchHistoricalEvent(month, number);
// 	} else {
// 		dateEventDiv.innerText = "";
// 	}
// }

// function fetchNumberFact(number) {
// 	fetch(`http://numbersapi.com/${number}`)
// 		.then(checkResponseStatus)
// 		.then((response) => response.text())
// 		.then((data) => {
// 			numberFactDiv.innerText = `Fact about ${number}: ${data}`;
// 		})
// 		.catch(handleNumberFactError);
// }

// function fetchHistoricalEvent(month, day) {
// 	fetch(`https://history.muffinlabs.com/date/${month}/${day}`)
// 		.then(checkResponseStatus)
// 		.then((response) => response.json())
// 		.then((data) => {
// 			const events = data.data.Events;
// 			if (events && events.length) {
// 				const event = events[Math.floor(Math.random() * events.length)];
// 				dateEventDiv.innerText = `On ${month}/${day} in ${event.year}: ${event.text}`;
// 			} else {
// 				dateEventDiv.innerText = "No historical events found for this date.";
// 			}
// 		})
// 		.catch(handleHistoricalEventError);
// }

// function checkResponseStatus(response) {
// 	if (!response.ok) {
// 		throw new Error("Network response was not ok");
// 	}
// 	return response;
// }

// function handleNumberFactError(error) {
// 	console.error("Error fetching number fact:", error);
// 	numberFactDiv.innerText = "Error fetching number fact.";
// }

// function handleHistoricalEventError(error) {
// 	console.error("Error fetching historical event:", error);
// 	dateEventDiv.innerText = "Error fetching historical event.";
// }
