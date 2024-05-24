const datasource = require('../database/models')
const Services = require('./Services.js');

class PessoaServices extends Services {
  constructor() {
    super('Pessoa');
    this.matriculaServices = new Services('Matricula')
  }

  async pegaMatriculasAtivasPorEstudante(id) {
    const estudante = await super.pegaUmRegistroPorId(id);
    const listaMatriculas = await estudante.getAulasMatriculadas();
    return listaMatriculas;
  }
  async pegaPessoasPorEscopo() {
    const listaPessoas = await super.pegaRegistrosPorEscopo('todosOsRegistros')
    return listaPessoas
  }

  async pegaTodasAsMatriculasPorEstudante(id) {
    const estudante = await super.pegaUmRegistroPorId(id);
    const listaMatriculas = await estudante.getTodasAsMatriculas();
    return listaMatriculas;
  }
  async cancelaPessoasEMatriculas(estudanteId) {
    return datasource.sequelize.transaction(async (transacao) => {
      await super.atualizaRegistro({ativo: false}, {id: estudanteId}, transacao);
      await this.matriculaServices.atualizaRegistro({status: 'cancelado'}, { estudante_id: estudanteId}, transacao)
    })
  }
}

module.exports = PessoaServices;
