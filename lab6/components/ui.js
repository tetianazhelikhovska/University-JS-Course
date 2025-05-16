export const ui = {
  updateSteps(steps) {
    document.getElementById('stepCounter').textContent = `Кроків: ${steps}`;
  },

  updateTime(seconds) {
    document.getElementById('timer').textContent = `Час: ${seconds} сек`;
  },

  populateLevelSelect(levels, callback) {
    const levelSelect = document.getElementById('levelSelect');
    levelSelect.innerHTML = ''; // Clear existing options

    levels.forEach((level, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = `${level.name} (мін. кроків: ${level.minSteps})`;
      levelSelect.appendChild(option);
    });

    levelSelect.addEventListener('change', () => {
      callback(parseInt(levelSelect.value));
    });
  }
};