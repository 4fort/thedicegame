const GAME_OVERALL_RECORD = {
  wins: 0,
  losses: 0,
  total_games: 0,
};

const GAME_1_RECORD = {
  wins: 0,
  losses: 0,
  total_games: 0,
};

const GAME_2_RECORD = {
  wins: 0,
  losses: 0,
  total_games: 0,
};

export class GameRecord {
  #key;
  #wins;
  #losses;
  #total_games;
  constructor(key) {
    this.#key = key;
    if (localStorage.getItem(this.#key)) {
      const record = JSON.parse(localStorage.getItem(this.#key));

      this.#wins = record.wins;
      this.#losses = record.losses;
      this.#total_games = record.total_games;
    } else {
      this.#wins = 0;
      this.#losses = 0;
      this.#total_games = 0;
    }
  }

  addWin() {
    this.#wins++;
    this.#total_games++;
    this.#setRecordToLocalStorage();
  }

  addLoss() {
    this.#losses++;
    this.#total_games++;
    this.#setRecordToLocalStorage();
  }

  #setRecordToLocalStorage() {
    const record = {
      wins: this.#wins,
      losses: this.#losses,
      total_games: this.#total_games,
    };
    localStorage.setItem(this.#key, JSON.stringify(record));
  }
}
