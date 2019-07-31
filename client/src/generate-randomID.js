/**
 *helper method to generate random number 
 *
 * @returns number
 */
function generateRandom() {
  return Math.floor((Math.random() * 10000000)).toString();
}



/**
 *helper function to generate random user ID
 *
 * @returns number
 */
export default function generateUserID() {
 let random = generateRandom();
  var ID = random.length <= 4 ? generateRandom() : random; //for random number not less than four in length
  return ID;
}



