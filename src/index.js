import './index.css';

const refreshBtn = document.querySelector('#refresh-btn');
const form = document.querySelector('#form');

const scoreBoard = document.querySelector('#score-board');
const apiKey = 'OuDovQU3bVPHCM87jkUW';

const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${apiKey}/scores/`;

refreshBtn.addEventListener('click', async () => {
  try {
    const response = await fetch(url, {
      method: 'GET',
    });
    const data = await response.json();

    // Clear the scoreboard
    scoreBoard.innerHTML = '';

    // Add the new scores
    data.result.forEach((element) => {
      const li = document.createElement('li');
      li.innerHTML = `${element.user} : ${element.score}`;
      scoreBoard.appendChild(li);
    });
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.querySelector('#name').value;
  const score = document.querySelector('#score').value;

  const data = {
    user: name,
    score,
  };

  try {
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).json();
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
});
