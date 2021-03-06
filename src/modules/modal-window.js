const topic = document.getElementById('topic');
const content = document.getElementById('content');
const modalWindow = document.querySelector('.modal-window');

const keyboardShortcuts = [
  { key: 's', action: 'pause/unpause' },
  { key: 'z', action: 'left rotation of a tile' },
  { key: 'x', action: 'right rotation of a tile' },
  { key: 'left arrow', action: 'left shift of a tile' },
  { key: 'right arrow', action: 'right shift of a tile' },
  { key: 'down arrow', action: 'speed-up' }
];

function showEndGameWindow(score, run) {
  content.innerHTML = '';
  topic.textContent = 'Tetris Game';
  let span = document.createElement('span');
  span.textContent = 'Score: ';
  content.appendChild(span);
  span = document.createElement('span');
  span.textContent = score;
  span.style.color = 'white';
  content.appendChild(span);
  modalWindow.style.visibility = 'visible';
  const button = document.createElement('button');
  button.textContent = 'New game';
  button.addEventListener('click', () => {
    showIntroWindow(run);
  });
  content.appendChild(button);
}

function showIntroWindow(run) {
  content.innerHTML = '';

  const fragment = document.createDocumentFragment();
  const button = document.createElement('button');
  topic.textContent = 'Tetris Game';
  const label = document.createElement('label');
  label.textContent = 'Select the level of the game (from 0 to 29): ';
  label.setAttribute('for', 'level');
  fragment.appendChild(label);
  const input = document.createElement('input');
  input.setAttribute('type', 'number');
  input.setAttribute('id', 'level');
  input.setAttribute('min', '0');
  input.setAttribute('max', '29');
  fragment.appendChild(input);
  button.textContent = 'Start';
  button.addEventListener('click', () => {
    const level = Number(input.value);
    if (!isNaN(level) && level >= 0 && level <= 29) {
      run(level);
      document.querySelector('.modal-window').style.visibility = 'hidden';
    }
  });
  fragment.appendChild(button);
  content.appendChild(fragment);

  modalWindow.style.visibility = 'visible';
}

function showSettingsWindow() {
  content.innerHTML = '';

  const fragment = document.createDocumentFragment();
  const button = document.createElement('button');
  topic.textContent = 'Keyboard Shortcuts';
  const ul = document.createElement('ul');
  keyboardShortcuts.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.key}: ${item.action}`;
    ul.appendChild(li);
  });
  fragment.appendChild(ul);
  button.textContent = 'Close';
  button.addEventListener('click', () => {
    document.querySelector('.modal-window').style.visibility = 'hidden';
  });
  fragment.appendChild(button);
  content.appendChild(fragment);
  modalWindow.style.visibility = 'visible';
}

module.exports = { showIntroWindow, showSettingsWindow, showEndGameWindow };
