class Misc {
  escapeSlashes(key: string): string {
    let temp = "";
    const toEscape = ['/', '\\'];
    for(const i of key) {
      if(!toEscape.includes(i)) {
        temp += i;
      }
    }
    return temp;
  } 
}

export default new Misc();