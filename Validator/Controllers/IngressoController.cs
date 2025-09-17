using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Validator.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class IngressoController : ControllerBase
    {
        private readonly BaseService<Ingresso> _service;
        public IngressoController(BaseService<Ingresso> service)
        {
            _service = service;
        }

        [HttpPost("criarIngresso")]
        public IActionResult criarIngresso([FromBody] Ingresso ingresso)
        {
            try
            {
                _service.inserir(ingresso);
                return Ok("ingresso criado com sucesso!");
            }
            catch (Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisição! Log:" + ex);
            }
        }

        [HttpGet("ObterIngresso")]
        public IActionResult obterIngresso()
        {
            try
            {
                IEnumerable<Ingresso> listaIngressos = _service.listar();
                if (listaIngressos.Count() > 0)
                    return Ok(listaIngressos);
                else
                    return NotFound("Nenhum ingresso foi encontrado!");
            }
            catch (Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisição! Log:" + ex);
            }
        }
        
        [HttpGet("atualizarIngresso")]
        public IActionResult atualizarIngresso([FromBody] Ingresso ingresso)
        {
            try
            {
                _service.atualizar(ingresso);
                return Ok("Ingresso atualizado com sucesso");
            }
            catch (Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisição! Log:" + ex);
            }
        }
    }
}
