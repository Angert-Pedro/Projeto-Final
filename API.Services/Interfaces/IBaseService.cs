using API.Criptografia;
using API.DAL;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace API.Services.Interfaces
{
    public interface IBaseService<T>
    {
        void inserir(T entidade);
        IEnumerable<T> listar();
        T? listarPor(Expression<Func<T, bool>> func);
        IEnumerable<T?> listarVariosPor(Expression<Func<T, bool>> func);
        void atualizar(T entidade);
        bool deletar(T entidade);
        bool enviarNotificacao(Notificacao notificacao);
        bool verificarExistencia(T? entidade);
    }
}
