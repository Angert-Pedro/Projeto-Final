using API.Models;
using API.DAL;
using API.Services.Interfaces;
using API.Criptografia;

namespace API.Services
{
    public class UsuarioService : BaseService<Usuario>, IUsuarioService
    {
        public UsuarioService(DAL<Usuario> dal) : base(dal)
        {
            _dal = dal;
        }
        private readonly DAL<Usuario> _dal;
        public int DuracaoSessao { get; set; }
        protected DateTime HorarioEntrou { get; set; }
        protected bool UsuarioLogado { get; set; }
        public bool executarLogin(string usuario, string senha)
        {
            if (_dal.verificarExistencia(usuario) != null)
            {
                this.HorarioEntrou = DateTime.Now;
                this.UsuarioLogado = true;
                return true;
            }
            else
            {
                return false;
            }
        }
        public void executarLogout(string usuario)
        {
            this.DuracaoSessao = (int)(DateTime.Now - this.HorarioEntrou).TotalSeconds;
            this.UsuarioLogado = false;
        }

        public Usuario consultarUsuario(string usuario)
        {
            return _dal.listarPor(user=>user.Login == usuario);
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

        public bool excluirUsuario(string nome)
        {
            Usuario usuario = _dal.verificarExistencia(nome);
            if (usuario != null)
            {
                _dal.excluir(usuario);
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
