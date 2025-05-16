export const levelLoader = {
  LEVELS_PATH: 'data/levels.json',

  async fetchLevels() {
    try {
      const response = await fetch(this.LEVELS_PATH);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      return data.levels;
    } catch (error) {
      console.error("Помилка при завантаженні рівнів:", error);
      return [];
    }
  }
};