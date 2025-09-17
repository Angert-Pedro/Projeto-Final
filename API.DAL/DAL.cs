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

        public T? verificarExistencia(T? entidade)
        {
            return context.Set<T>().FirstOrDefault(x=>x.Equals(entidade));
        }

        protected void enviarNotificacao(Notificacao mensagem)
        {
            context.Set<Notificacao>().Add(mensagem);
        }

        public void logarDeslogarUsuario(Usuario usuario, OperacaoLogin operacao)
        {
            if (operacao == 0)
            {
                usuario.Usuario_logado = OperacaoLogin.Logout;
                context.Set<Usuario>().Update(usuario);
                context.SaveChanges();
            } else
            {
                int valor = (int)operacao;
                usuario.Usuario_logado = (OperacaoLogin)valor;
                context.Set<Usuario>().Update(usuario);
                context.SaveChanges();
            }
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
