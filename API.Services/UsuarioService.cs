using API.Models;
using API.DAL;
using API.Services.Interfaces;
using API.Criptografia;

namespace API.Services
{
    public class UsuarioService : BaseService<Usuario>, IUsuarioService
    {
        private readonly DAL<Usuario> _dal;
        private readonly DAL<Pessoa> _dalPessoa;
        public UsuarioService(DAL<Usuario> dal, DAL<Pessoa> dalPessoa) : base(dal)
        {
            _dal = dal;
            _dalPessoa = dalPessoa;
        }
        public int DuracaoSessao { get; set; }
        protected DateTime HorarioEntrou { get; set; }
        protected bool UsuarioLogado { get; set; }
        public bool executarLogin(Usuario usuario, string senha)
        {
            if (_dal.listarPor(x => x.Login == usuario.Login && DescriptografarAES(x.Senha) == senha) != null)
            {
                this.HorarioEntrou = DateTime.Now;
                this.UsuarioLogado = true;
                _dal.logarDeslogarUsuario(usuario,OperacaoLogin.Login);
                return true;
            }
            return false;
        }
        public void executarLogout(Usuario usuario)
        {
            this.DuracaoSessao = (int)(DateTime.Now - this.HorarioEntrou).TotalSeconds;
            this.UsuarioLogado = false;
            _dal.logarDeslogarUsuario(usuario, OperacaoLogin.Logout);
        }

        public void criarUsuario(Usuario usuario)
        {
            CriptografiaAES cripto = new CriptografiaAES();
            usuario.Senha = cripto.CriptografarAES(usuario.Senha);
            _dal.inserir(usuario);
        }

        public void atualizarUsuario(Usuario usuario)
        {
            //Consulta pessoa existente
            var pessoaExistente = _dalPessoa.listarPor(x => x.Cpf == usuario.Pessoa_.Cpf);

            //Caso exista a pessoa cadastrada ao usuário, atualizar, senão, inserir
            if (pessoaExistente!= null)
            {
                pessoaExistente.Nome = usuario.Pessoa_.Nome;
                pessoaExistente.Email = usuario.Pessoa_.Email;
                pessoaExistente.Numero = usuario.Pessoa_.Numero;
                pessoaExistente.Data_Nasc = usuario.Pessoa_.Data_Nasc;

                usuario.Pessoa_ = pessoaExistente;
                _dalPessoa.alterar(usuario.Pessoa_);
            }

            //Atualizar os dados do usuário existente
            var usuarioExistente = _dal.listarPor(x => x.Login == usuario.Login);

            if (usuarioExistente == null)
                throw new Exception("Usuário não encontrado.");

            usuarioExistente.Login = usuario.Login;
            usuarioExistente.Senha = usuario.Senha;

            _dal.alterar(usuarioExistente);
        }
    }
}
