//
export class Question {
	static create(question) {
		return window.fetch('', {
			method: 'POST',
			body: JSON.stringify(question),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(response => {
				question.id = response.name
				return question
			})
			.then(setLocalS)
			.then(Question.renderList)
	}

	static renderList() {
		const question = getLocalS()
		document.getElementById('list').innerHTML = question.length
			? question.map(toCard).join('')
			: `<div class="mui--text-headline">Вопросов пока нет.</div>`
	}
}

function getLocalS() {
	return JSON.parse(localStorage.getItem('question') || "[]");
}

function setLocalS(question) {
	const allQuestion = getLocalS()
	allQuestion.push(question);
	localStorage.setItem('question', JSON.stringify(allQuestion))
}

function toCard(question) {
	return `
		<div class="mui--text-black-54">
		${new Date(question.date).toLocaleDateString()}
		${new Date(question.date).toLocaleTimeString()}
		</div>
      <div>${question.text}</div>
	`
}



