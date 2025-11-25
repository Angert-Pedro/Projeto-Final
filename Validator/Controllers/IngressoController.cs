using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IngressoController : ControllerBase
    {
        private readonly BaseService<Ingresso> _service;

        public IngressoController(BaseService<Ingresso> service)
        {
            _service = service;
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

        [HttpGet("PorUsuario")]
        public IActionResult ListarIngressoPorUserId(int userId)
        {
            try
            {
                var ingressos = _service.listarPor(x => x.usuario_id == userId);

                if (ingressos != null)
                    return Ok(ingressos);
                else
                    return NotFound("Nenhum ingresso encontrado!");
            }
            catch (Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisição! Log:" + ex);
            }
        }

    }
}   