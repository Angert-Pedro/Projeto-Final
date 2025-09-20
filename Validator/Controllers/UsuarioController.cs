using API.Criptografia;
using API.Models;
using API.Services;
using API.Validator.Request;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace API.Validator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _service;
        private readonly BaseService<Usuario> _baseService;
        private readonly BaseService<Pessoa> _baseServicePessoa;
     
        public UsuarioController(UsuarioService service, BaseService<Usuario> baseService, BaseService<Pessoa> baseServicePessoa)
        {
            _service = service;
            _baseService = baseService;
            _baseServicePessoa = baseServicePessoa;
        }

        [HttpPost("criarUsuario")]
        public IActionResult criarUsuario([FromBody] Usuario usuario)
        {
            try
            {
                if (consultarUsuario(usuario.Login) is OkObjectResult okResult)
                {
                    return BadRequest("Usuário já existe!");
                }
                else
                {
                    if(_baseServicePessoa.listarPor(x => x.Cpf == usuario.Pessoa_.Cpf) != null)
                        return BadRequest("CPF já cadastrado!");
                    _service.criarUsuario(usuario);
                    return Ok("Usuário criado com sucesso!");
                }
            } catch(Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisição! Log:" + ex);
            }
        }

        [HttpGet("consultarUsuario")]
        public IActionResult consultarUsuario(string usuario)
        {
            try
            {
                Usuario resultado = _baseService.listarPor(x=> x.Login == usuario);
                if (resultado != null)
                    return Ok(resultado);
                else
                    return NotFound("Usuário não encontrado!");
            }
            catch(Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisição! Log:" + ex);
            }
        }

        [HttpPost("atualizarUsuario")]
        public IActionResult atualizarUsuario([FromBody] Usuario usuario)
        {
            try
            {
                _service.atualizarUsuario(usuario);
                return Ok("Usuário atualizado com sucesso!");
            }
            catch (Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisição! Log:" + ex);
            }
        }

        [HttpPost("excluirUsuario")]
        public IActionResult excluirUsuario([FromBody] string login)
        {
            try
            {
                Usuario usuario = _baseService.listarPor(x => x.Login == login);

                if (usuario == null)
                    return BadRequest("Usuário não existe!");

                if (_baseService.deletar(usuario) && _baseServicePessoa.deletar(usuario.Pessoa_))
                    return Ok("Usuário excluído com sucesso!");
                else
                    return NotFound("Usuário não encontrado!");
            }
            catch (Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisição! Log:" + ex);
            }
        }

        [HttpPost("executarLogin")]
        public IActionResult executarLogin([FromBody] LoginRequest usuario)
        {
            try
            {
                Usuario usuarioLogin = new Usuario();
                usuarioLogin = _baseService.listarPor(x => x.Login == usuario.Login);
                if (usuarioLogin != null)
                {
                    if (usuarioLogin.Usuario_logado == OperacaoLogin.Login)
                        return BadRequest("Usuário já está logado!");
                    if(_service.executarLogin(usuarioLogin, usuario.Senha))
                        return Ok("Usuário logado!");
                    else
                        return BadRequest("Usuário ou senha incorretos!");
                }
                else
                    return NotFound("Usuário não encontrado!");
            }
            catch (Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisição! Log:" + ex);
            }
        }

        [HttpPost("executarLogout")]
        public IActionResult executarLogout([FromBody] string usuario)
        {
            try
            {
                Usuario usuarioLogin = new Usuario();
                usuarioLogin = _baseService.listarPor(x => x.Login == usuario);
                if (usuarioLogin != null)
                {
                    if (usuarioLogin.Usuario_logado == OperacaoLogin.Logout)
                        return BadRequest("Usuário não está logado!");
                    _service.executarLogout(usuarioLogin);
                    return Ok("Usuário deslogado com sucesso!");
                }
                else
                    return NotFound("Usuário não encontrado!");
            }
            catch (Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisição! Log:" + ex);
            }
        }
    }
}
