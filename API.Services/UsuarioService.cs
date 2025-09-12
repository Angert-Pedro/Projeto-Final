using API.Models;
using API.DAL;
using API.Services.Interfaces;
using API.Criptografia;

namespace API.Services
{
    public class UsuarioService : BaseService<Usuario>, IUsuarioService
    {
        private readonly DAL<Usuario> _dal;
        public UsuarioService(DAL<Usuario> dal) : base(dal)
        {
            _dal = dal;
        }
        public int DuracaoSessao { get; set; }
        protected DateTime HorarioEntrou { get; set; }
        protected bool UsuarioLogado { get; set; }
        public bool executarLogin(string login, string senha)
        {
            Usuario usuario = new Usuario(login, senha);
            if (_dal.listarPor(x => x.Login == usuario.Login && base.DescriptografarAES(x.Senha) == usuario.Senha) != null)
            {
                this.HorarioEntrou = DateTime.Now;
                this.UsuarioLogado = true;
                return true;
            }
            return false;
        }
        public void executarLogout(string usuario)
        {
            this.DuracaoSessao = (int)(DateTime.Now - this.HorarioEntrou).TotalSeconds;
            this.UsuarioLogado = false;
        }

        public void criarUsuario(Usuario usuario)
        {
            CriptografiaAES cripto = new CriptografiaAES();
            usuario.Senha = cripto.CriptografarAES(usuario.Senha);
            _dal.inserir(usuario);
        }

        public void atualizarUsuario(Usuario usuario)
        {
            CriptografiaAES cripto = new CriptografiaAES();
            cripto.CriptografarAES(usuario.Senha);
            _dal.alterar(usuario);
        }
    }
}
