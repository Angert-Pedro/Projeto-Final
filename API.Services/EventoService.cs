using API.DAL;
using API.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System;
using API.Services.Interfaces;

namespace API.Services
{
    public class EventoService : IEventoService
    {
        private readonly DAL<Evento> _dal;

        public EventoService(DAL<Evento> dal)
        {
            _dal = dal;
        }

        // CREATE
        public void Inserir(Evento entidade)
        {
            try
            {
                _dal.inserir(entidade);
            }
            catch (DbUpdateException ex)
            {
                var msg = ex.InnerException?.Message ?? ex.Message;
                throw new Exception("Erro ao inserir evento: " + msg, ex);
            }
        }

        // READ - listar todos
        public IEnumerable<Evento> Listar()
        {
            try
            {
                return _dal.listar();
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao listar eventos: " + ex.Message, ex);
            }
        }

        // UPDATE
        public void Atualizar(Evento entidade)
        {
            try
            {
                _dal.alterar(entidade);
            }
            catch (DbUpdateException ex)
            {
                var msg = ex.InnerException?.Message ?? ex.Message;
                throw new Exception("Erro ao atualizar evento: " + msg, ex);
            }
        }

        // DELETE
        public bool Deletar(Evento entidade)
        {
            try
            {
                if (_dal.verificarExistencia(entidade) != null)
                {
                    _dal.excluir(entidade);
                    return true;
                }
                return false;
            }
            catch (DbUpdateException ex)
            {
                var msg = ex.InnerException?.Message ?? ex.Message;
                throw new Exception("Erro ao excluir evento: " + msg, ex);
            }
        }
    }
}
