using API.DAL;
using API.Models;
using System;
using System.Collections.Generic;

namespace API.Services
{
    public class ValidacaoService
    {
        private readonly DAL<Validacao> _dal;

        public ValidacaoService(DAL<Validacao> dal)
        {
            _dal = dal;
        }

        // CREATE
        public void Inserir(Validacao entidade)
        {
            _dal.inserir(entidade);
        }

        // READ - listar todos
        public IEnumerable<Validacao> Listar()
        {
            return _dal.listar();
        }

        // READ - buscar por condição
        public Validacao? BuscarPor(Func<Validacao, bool> condicao)
        {
            return _dal.listarPor(condicao);
        }

        // UPDATE
        public void Atualizar(Validacao entidade)
        {
            _dal.alterar(entidade);
        }

        // DELETE
        public bool Deletar(Validacao entidade)
        {
            if (_dal.verificarExistencia(entidade) != null)
            {
                _dal.excluir(entidade);
                return true;
            }
            return false;
        }
    }
}
