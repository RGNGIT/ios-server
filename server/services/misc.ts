var colors = require('colors');

colors.enable();

class Misc {
  async logger(log: string, dt: boolean): Promise<string> {
    dt = true;
    console.log((dt ? colors.red("<") + colors.green(await this.getDateTime()) + colors.red("> ") : "") + colors.blue(log));
    return (dt ? "<" + (await this.getDateTime()) + "> " : "") + log;
  }
  async formatter(string: string): Promise<string> {
    let format = "";
    for (let i = 0; i < string.length; i++) {
      if (string[i] == `'`) {
        format += "`";
      } else {
        format += string[i];
      }
    }
    return format;
  }
  async getDateTime(): Promise<string> {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;
    return dateTime;
  }
  async pyJsonFix(json: string): Promise<string> {
    let format = "";
    for (let i = 0; i < json[0].length; i++) {
      if (json[0][i] == `'`) {
        format += '"';
      } else {
        format += json[0][i];
      }
    }
    return format;
  }
  parseTypes(types) {
    let temp = '';
    for(let i = 0; i < types.length; i++) {
      if(types[i] != '[' && types[i] != ']') {
        temp += types[i];
      }
    }
    const splitTypes = temp.split(',');
    return splitTypes;
  }
}

export default new Misc();
