class Misc {
    async logger(log : string, dt : boolean): Promise < string > {
        console.log(
            (dt ? '<' + await this.getDateTime() + '> ' : '') + log
        );
        return(
            (dt ? '<' + await this.getDateTime() + '> ' : '') + log
        );
    }
    async formatter(string : string): Promise < string > {
        let format = '';
        for (let i = 0; i < string.length; i++) {
            if (string[i] == `'`) {
                format += '`';
            } else {
                format += string[i];
            }
        }
        return format;
    }
    async getDateTime() {
        let today = new Date();
        let date = today.getFullYear() + '-' + (
            today.getMonth() + 1
        ) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;
        return dateTime;
    }
}

export default new Misc();
