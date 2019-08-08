/**
 * @description to save to local storage
 * @author "mark bashir"
 * @date 2019-07-10
 * @export
 * @param {string} key
 * @param {string} value
 */
export default function setLocalStorage(key,value){
  localStorage.setItem(key,value);
}