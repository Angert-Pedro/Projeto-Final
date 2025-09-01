using API.Criptografia;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Validator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _service;
     
        public UsuarioController(UsuarioService service)
        {
            _service = service;
        }

        [HttpPost("criarUsuario")]
        public IActionResult criarUsuario([FromBody] Usuario usuario)
        {
            try
            {
                _service.criarUsuario(usuario);
                return Ok("Usuário criado com sucesso!");
            } catch(Exception)
            {
                throw;
            }
        }

        [HttpGet("consultarUsuario")]
        public IActionResult consultarUsuario(string usuario)
        {
            try
            {
                Usuario resultado = _service.consultarUsuario(usuario);
                if (resultado != null)
                    return Ok(resultado);
                else
                    return NotFound("Usuário não encontrado!");
            }
            catch(Exception)
            {
                throw;
            }
        }

        [HttpGet("atualizarUsuario")]
        public IActionResult atualizarUsuario([FromQuery] Usuario usuario)
        {
            try
            {
                _service.atualizarUsuario(usuario);
                return Ok("Usuário atualizado com sucesso!");
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("excluirUsuario")]
        public IActionResult excluirUsuario([FromQuery] string nome)
        {
            try
            {
                if (_service.excluirUsuario(nome)) 
                    return Ok("Usuário excluído com sucesso!");
                else
                    return NotFound("Usuário não encontrado!");
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
