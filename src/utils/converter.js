// Conversion rates
const coinToBDT = 0.2; // 1 coin = 0.2 BDT
const coinToMYR = 0.1; // 1 coin = 0.1 MYR

// Function to convert coins to currencies
const convertCoins = (totalCoins) => {
  const convertedBDT = totalCoins * coinToBDT;
  const convertedMYR = totalCoins * coinToMYR;

  return {
    bdt: convertedBDT,
    myr: convertedMYR,
  };
};
export default convertCoins;
