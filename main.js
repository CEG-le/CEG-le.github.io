var hintnumber = undefined;
var year = "2024";
var month = "07";
var day = "15";


window.onload = function() { changeHintNumber(1); };

function getImagePath() {
	return `images/${year}/${month}/${day}/${hintnumber}.png`
}

function changeHintNumber(number) {
	if (number > 5 || number < 1) throw new Error("invalid hint number: " + number);
	hintnumber = number;
	const image = document.getElementById("main_image");
	image.src = getImagePath();
}

function answerEntered() {
	const episode_list = document.getElementById("episodes");
	const answered_list = document.getElementById("answered_list");
	const episode_selection = document.getElementById("episode_selection");
	const answer = episode_selection.value;
	episode_selection.value = "";
	const child = containsChildWithValue(episode_list.children, answer);
	if (child == null) {
		return;
	}
	episode_list.removeChild(child);

	const is_correct = checkAnswer(answer);
	const answer_item = document.createElement("li");
	answer_item.innerHTML = answer;
	answer_item.style.color = is_correct ? "green" : "red";
	answer_item.style.padding = 0;
	answer_item.style.margin = 0;
	answered_list.appendChild(answer_item);

	if (is_correct) {
		win();
		return;
	}

	if (hintnumber == 5) {
		lose();
		return;
	}

	changeHintNumber(hintnumber + 1);


	const button = document.getElementById("button_"+hintnumber);
	button.disabled = false;
}

function containsChildWithValue(children, value) {
	for (var i = 0; i < children.length; i++) {
		const child = children[i];
		if (child.value == value) return child;
	}
	return null;
}

function getTodaysAnswer() {
	return days[`${year}-${month}-${day}`];
}
function checkAnswer(answer) {
	return getTodaysAnswer() == answer;
}


function congratsMessage() {
	return `Congrats! you got it on your ${formatHintNumber()} try!`;
}

function formatHintNumber() {
	switch (hintnumber) {
		case 1: return "first";
		case 2: return "second";
		case 3: return "third";
		case 4: return "fourth";
		case 5: return "fifth";
		default: throw new Error("invalid hint number: " + hintnumber);
	}
}

function end() {
	const episode_selection = document.getElementById("episode_selection");
	const episode_selection_button = document.getElementById("episode_selection_submit_button");

	episode_selection.disabled = true;
	episode_selection_submit_button.disabled = true;

	for (var i = 1; i <= 5; i++) {
		const button = document.getElementById("button_" + i);
		button.disabled = false;
	}

	changeHintNumber(5);
}

function win() {
	const result_div = document.getElementById("game_result_message");
	result_div.innerHTML = congratsMessage();
	end();
}

function lose() {
	const result_div = document.getElementById("game_result_message");
	result_div.innerHTML = "welp :/, it was: " + getTodaysAnswer() + "!";
	end();
}

const days = {
	"2024-07-15": "S1E3 I Hope Josh Comes to My Party!",
};
