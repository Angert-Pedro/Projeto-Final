using API.Criptografia;
using API.DAL;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Services
{
    public class BaseService<T> : DescriptografiaAES where T : class
    {
        protected readonly DAL<T> _dal;

        public BaseService(DAL<T> dal)
        {
            _dal = dal;
        }

        public void inserir(T entidade)
        {
            _dal.inserir(entidade);
        }

        public IEnumerable<T> listar()
        {
            return _dal.listar();
        }

        public T? listarPor(Func<T, bool> func)
        {
            return _dal.listarPor(func);
        }

        public void atualizar(T entidade)
        {
            _dal.alterar(entidade);
        }

        public bool deletar(T entidade)
        {
            if (verificarExistencia(entidade))
            {
                _dal.excluir(entidade);
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool enviarNotificacao(Notificacao notificacao)
        {
            try
            {
                NotificacaoService.EnviarEmail(notificacao);            
                return true;
            } catch(Exception ex)
            {
                throw ex;
            }
        }

        public bool verificarExistencia(T? entidade)
        {
            return _dal.verificarExistencia(entidade) != null ? true : false;
        }
    }
}
