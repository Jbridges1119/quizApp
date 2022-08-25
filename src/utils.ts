export const shuffleArray = (array: any[]): any[] => {
  //quick randomizer - not super accurate though
  return [...array].sort(() => Math.random() - 0.5);
}