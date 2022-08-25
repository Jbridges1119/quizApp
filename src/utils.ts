export const shuffleArray = (array: any[]) => {
  //quick randomizer - not super accurate though
  [...array].sort(() => Math.random() - 0.5);
}