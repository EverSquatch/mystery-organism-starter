// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate () {
      const randIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randIndex] = newBase;
      return this.dna;
    },
    compareDNA (otherDNA) {
      const similarities = this.dna.reduce((acc, curr, idx, arr) => {
        if (arr[idx] === otherDNA.dna[idx]) {
          return acc + 1;
        } else {
          return acc
        }
      },0);
      const percentofDNAshared = (similarities / this.dna.length) * 100;
      const percentToDeci = percentofDNAshared.toFixed(2);
      console.log(`${this.specimenNum} and ${otherDNA.specimenNum} have ${percentToDeci}% DNA in common.`);
    },
    willLikelySurvive() {
      const corg = this.dna.filter(el => el === 'C' || el === 'G');
      return corg.length / this.dna.length >= 0.6;
    }
  }
}

const survivingSpecimen = [];
let idCounter = 1;

while(survivingSpecimen.length < 30) {
  let newOrg = pAequorFactory(idCounter, mockUpStrand());
  if (newOrg.willLikelySurvive()) {
    survivingSpecimen.push(newOrg)
  }
  idCounter++;
}

console.log(survivingSpecimen)