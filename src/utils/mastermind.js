export default class Mastermind {
  constructor(colors /*array*/, numOfColorsToFind /*num*/) {
    this.colors = colors; // array
    this.numOfColorsToFind = numOfColorsToFind; // num
    this.secret = []; // array
    this.count = 0; // num
    this.initGame(); // method
  }
  makeSecret() {
    let newSecret = [];
    for (let i = 0; i < this.numOfColorsToFind; i++) {
      let j = ~~(Math.random() * this.colors.length);
      newSecret.push(this.colors[j]);
    }
    return newSecret;
  }
  initGame() {
    this.secret = this.makeSecret(); // returns an array
    console.log(
      `possible colors: ${this.colors}\n\nfind the ${this.numOfColorsToFind} colors code...`
    );
  }
  play(guess /*array*/) {
    // submitted by player
    let correctColorsAndPositions = 0;
    let correctColorsWrongPositions = 0;
    let secretCheck = [...this.secret];
    this.count++;
    for (let i = 0; i < this.numOfColorsToFind; i++) {
      if (secretCheck[i] === guess[i]) {
        secretCheck[i] = null;
        guess[i] = null;
        correctColorsAndPositions++;
      }
    }
    for (let i = 0; i < this.numOfColorsToFind; i++) {
      for (let j = 0; j < this.numOfColorsToFind; j++) {
        if (secretCheck[i] !== null && secretCheck[i] === guess[j]) {
          secretCheck[i] = null;
          guess[j] = null;
          correctColorsWrongPositions++;
        }
      }
    }
    return [correctColorsAndPositions, correctColorsWrongPositions];
  }
}
