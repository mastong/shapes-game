export class Utils {
  /**
   * Generate a random integer between min and max (both included)
   * @param min the min value possible for the result
   * @param max the max value possible for the result
   * @returns the random value generated
   */
  public static randInt(min: number, max: number): number{
    return (Math.floor(Math.random() * (max+1-min)) + min);
  }
}
