using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.DAL
{
    //Data Access Layer -> Estrutura de acesso aos dados
    public class DAL<T> where T : class
    {
        protected readonly DataContext context;
        public DAL(DataContext contexto)
        {
            this.context = contexto;
        }

        #region Consultas genéricas

        public T? listarPor(Func<T,bool> condicao)
        {
            return context.Set<T>().FirstOrDefault(condicao);
        }

        public T? verificarExistencia(string valor)
        {
            return context.Set<T>().FirstOrDefault(x=>x.Equals(valor));
        }

        protected void enviarNotificacao(Notificacao mensagem)
        {
            context.Set<Notificacao>().Add(mensagem);
        }

        #endregion

        #region CRUD

        public void inserir(T entidade)
        {
            context.Set<T>().Add(entidade);
            context.SaveChanges();
        }

        public IEnumerable<T> listar()
        {
            return context.Set<T>().ToList();
        }

        public void excluir(T entidade)
        {
            context.Set<T>().Remove(entidade);
            context.SaveChanges();
        }

        public void alterar(T entidade)
        {
            context.Set<T>().Update(entidade);
            context.SaveChanges();
        }

#endregion

    }
}
