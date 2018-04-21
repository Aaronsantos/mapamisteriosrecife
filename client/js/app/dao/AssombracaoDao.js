import {Dao} from './Dao.js'

export class AssombracaoDao extends Dao{

  constructor (connection) {
    super(connection, 'assombracoes')
  }

}
