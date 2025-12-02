using API.Models;
using API.Services;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace API.Validator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ValidacaoController : ControllerBase
    {
        private readonly ValidacaoService _service;
        private readonly IBaseService<Validacao> _baseService;
        private readonly IBaseService<Usuario> _baseServiceUsuario;
        private readonly IBaseService<Pessoa> _baseServicePessoa;
        private readonly IBaseService<Carteirinha> _baseServiceCarteirinha;

        public ValidacaoController(ValidacaoService service, IBaseService<Validacao> baseService, IBaseService<Usuario> baseServiceUsuario, IBaseService<Pessoa> baseServicePessoa, IBaseService<Carteirinha> baseServiceCarteirinha)
        {
            _service = service;
            _baseService = baseService;
            _baseServiceUsuario = baseServiceUsuario;
            _baseServicePessoa = baseServicePessoa;
            _baseServiceCarteirinha = baseServiceCarteirinha;
        }

        [HttpPost("criarValidacao")]
        public IActionResult CriarValidacao([FromBody] Validacao validacao)
        {
            try
            {
                _baseService.inserir(validacao);
                return Ok("Validação criada com sucesso!");
            }
            catch (Exception ex)
            {
                return BadRequest("Erro ao criar validação! Log: " + ex.Message);
            }
        }

        [HttpGet("consultarValidacao")]
        public IActionResult ConsultarValidacao(string id)
        {
            try
            {
                if (!int.TryParse(id, out int validacaoId))
                    return BadRequest("Id inválido!");

                var resultado = _baseService.listarPor(x => x.Id == validacaoId);
                if (resultado != null)
                    return Ok(resultado);
                else
                    return NotFound("Validação não encontrada!");
            }
            catch (Exception ex)
            {
                return BadRequest("Erro ao consultar validação! Log: " + ex.Message);
            }
        }

        [HttpGet("listarValidacoes")]
        public IActionResult ListarValidacoes()
        {
            try
            {
                var lista = _baseService.listar();
                return Ok(lista);
            }
            catch (Exception ex)
            {
                return BadRequest("Erro ao listar validações! Log: " + ex.Message);
            }
        }

        [HttpGet("listarValidacaoPorUsuario")]
        public IActionResult listarCarteirinhaPorUsuario(string usuario)
        {
            try
            {
                Usuario user = _baseServiceUsuario.listarPor(x => x.Login == usuario);
                Pessoa pessoa = _baseServicePessoa.listarPor(x => x.Cpf == user.Pessoa_.Cpf);
                Carteirinha carteirinha = _baseServiceCarteirinha.listarPor(x => x.Pessoa_id == pessoa.Id);
                return Ok(carteirinha);
            }
            catch (Exception ex)
            {
                return BadRequest("Erro ao listar validações! Log: " + ex.Message);
            }
        }

        [HttpPost("atualizarValidacao")]
        public IActionResult AtualizarValidacao([FromBody] Validacao validacao)
        {
            try
            {
                _baseService.atualizar(validacao);
                return Ok("Validação atualizada com sucesso!");
            }
            catch (Exception ex)
            {
                return BadRequest("Erro ao atualizar validação! Log: " + ex.Message);
            }
        }

        [HttpPost("excluirValidacao")]
        public IActionResult ExcluirValidacao([FromBody] string id)
        {
            try
            {
                if (!int.TryParse(id, out int validacaoId))
                    return BadRequest("Id inválido!");

                var validacao = _baseService.listarPor(x => x.Id == validacaoId);
                if (validacao == null)
                    return NotFound("Validação não encontrada!");

                if (_baseService.deletar(validacao))
                    return Ok("Validação excluída com sucesso!");
                else
                    return BadRequest("Erro ao excluir validação!");
            }
            catch (Exception ex)
            {
                return BadRequest("Erro ao excluir validação! Log: " + ex.Message);
            }
        }

        [HttpPost("CriarCarteirinha")]
        public async Task<IActionResult> CriarCarteirinha([FromBody] string cpf)
        {
            try { 
                using var client = new HttpClient();

                client.DefaultRequestHeaders.Add("User-Agent",
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0 Safari/537.36");

                var response = await client.GetAsync(
                    $"https://fesn-dne-digital.azurewebsites.net/app/{cpf}"
                );

                Validacao validacao = new Validacao();

                validacao.Data_hora = DateTime.Now;
                validacao.Tipo_validacao = "criação";

                if (!response.IsSuccessStatusCode)
                {
                    validacao.Status_validacao = "invalida";
                    return BadRequest("Carteirinha não existe!");
                }

                var result = await response.Content.ReadFromJsonAsync<MeiaEntradaResponse>();

                if (result == null)
                    return BadRequest("Retorno inválido.");

                var pessoa = _baseServicePessoa.listarPor(x => x.Cpf == result.cpf);

                if (pessoa == null)
                    return BadRequest("O CPF não existe no nosso registro de dados!");

                Carteirinha carteirinha = new Carteirinha()
                {
                    DataNascimento = Convert.ToDateTime(result.birth),
                    Curso = result.course,
                    TipoCurso = result.course_type,
                    Pessoa_id = pessoa?.Id ?? 0,
                    Instituicao = result.entity,
                    Nome = result.name,
                    Foto = result.photo,
                    QRCode = result.qrcode,
                    Turno = result.shift,
                    CodigoUso = result.use_code,
                    Validade = Convert.ToDateTime(result.validity)
                };

                validacao.Status_validacao = "valida";
                CriarValidacao(validacao);
                _baseServiceCarteirinha.inserir(carteirinha);
                return Ok(carteirinha);
            }
            catch (Exception ex)
            {
                return BadRequest("Erro ao consultar meia entrada! Log: " + ex.Message);
            }
        }
    }
}
