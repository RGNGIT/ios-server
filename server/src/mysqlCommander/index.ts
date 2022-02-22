import {createConnection} from 'mysql2';

class MySQL2Commander {

    private connection;

    public get _mysqlConnection() {
        return this.connection;
    }

    async openConnection(): Promise < any > {
        return new Promise(
            (resolve, reject) => {
                this.connection = createConnection({host: process.env.DB_HOST, user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD, database: process.env.DB_NAME});
                this.connection.connect((err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.connection);
                    }
                });
            }
        )
    }

    public async queryExec(queryText : string): Promise < any > {
        return new Promise(
            (resolve, reject) => {
                this.openConnection().then((con) => {
                    con.query(queryText, (err, res, meta) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(res);
                        }
                    });
                });
            }
        );
    }

}

export default new MySQL2Commander();