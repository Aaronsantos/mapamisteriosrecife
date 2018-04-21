import {Dao} from './Dao.js'

export class LogDao extends Dao {

  constructor(connection) {
    super(connection, 'log')
  }
}
