using API.Models;
using API.Services;
using API.Services.Interfaces;
using API.Validator.Request;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IngressoController : ControllerBase
    {
        private readonly IBaseService<Ingresso> _service;
        private readonly IBaseService<Usuario> _serviceUsuario;

        public IngressoController(IBaseService<Ingresso> service, IBaseService<Usuario> serviceUsuario)
        {
            _service = service;
            _serviceUsuario = serviceUsuario;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.listar());
        }

        [HttpPost("Create")]
        public IActionResult Create([FromBody] Ingresso ingresso)
        {
            _service.inserir(ingresso);
            return Ok(ingresso);
        }

        [HttpGet("ListarPorUsuario")]
        public IActionResult ListarPorUsuario([FromQuery] string usuario)
        {
            try
            {
                Usuario user = _serviceUsuario.listarPor(x => x.Login == usuario);
                if (user != null)
                    return Ok(_service.listarVariosPor(x => x.usuario_id == user.Id && x.Evento_.Data_Evento > DateTime.Now));
                else
                    return BadRequest("Usuário inválido!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}   