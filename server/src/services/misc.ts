class Misc {
    async logger(log : string, dt : boolean): Promise < string > {
        var today: Date = new Date();
        var date = today.getFullYear() + '-' + (
            today.getMonth() + 1
        ) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        console.log(
            (dt ? '<' + dateTime + '> ' : '') + log
        );
        return(
            (dt ? '<' + dateTime + '> ' : '') + log
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
}

export default new Misc();
