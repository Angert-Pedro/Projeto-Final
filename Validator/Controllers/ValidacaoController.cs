﻿using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Validator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ValidacaoController : ControllerBase
    {
        private readonly ValidacaoService _service;

        public ValidacaoController(ValidacaoService service)
        {
            _service = service;
        }

        [HttpPost("criarValidacao")]
        public IActionResult CriarValidacao([FromBody] Validacao validacao)
        {
            try
            {
                _service.Inserir(validacao);
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

                var resultado = _service.BuscarPor(x => x.Id == validacaoId);
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
                var lista = _service.Listar();
                return Ok(lista);
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
                _service.Atualizar(validacao);
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

                var validacao = _service.BuscarPor(x => x.Id == validacaoId);
                if (validacao == null)
                    return NotFound("Validação não encontrada!");

                if (_service.Deletar(validacao))
                    return Ok("Validação excluída com sucesso!");
                else
                    return BadRequest("Erro ao excluir validação!");
            }
            catch (Exception ex)
            {
                return BadRequest("Erro ao excluir validação! Log: " + ex.Message);
            }
        }
    }
}
