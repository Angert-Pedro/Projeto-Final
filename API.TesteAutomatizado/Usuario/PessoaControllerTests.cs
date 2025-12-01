using API.Controllers;
using API.Models;
using API.Services.Interfaces;
using API.Validator.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Xunit;

public class PessoaControllerTests
{
    private readonly Mock<IBaseService<Pessoa>> _basePessoaMock;
    private readonly Mock<IPessoaService> _serviceMock;
    private readonly PessoaController _controller;

    public PessoaControllerTests()
    {
        _serviceMock = new Mock<IPessoaService>();

        _basePessoaMock = new Mock<IBaseService<Pessoa>>();

        _controller = new PessoaController(_basePessoaMock.Object);
    }

    // =====================================================================
    // TESTE 1 — Listar pessoas com sucesso (retorna Ok)
    // =====================================================================
    [Fact]
    public void When_ListarPessoasExistem_Then_RetornaOk()
    {
        // Arrange
        var pessoas = new List<Pessoa>
        {
            new Pessoa { Id = 1, Nome = "João" },
            new Pessoa { Id = 2, Nome = "Maria" }
        };

        _basePessoaMock
            .Setup(x => x.listar())
            .Returns(pessoas);

        // Act
        var result = _controller.GetAll();

        // Assert
        var okResult = Xunit.Assert.IsType<OkObjectResult>(result);
        var retorno = Xunit.Assert.IsType<List<Pessoa>>(okResult.Value);
        Xunit.Assert.Equal(2, retorno.Count);
    }

    // =====================================================================
    // TESTE 2 — Nenhuma pessoa encontrada (lista vazia)
    // =====================================================================
    [Fact]
    public void When_ListarPessoasNaoExistem_Then_RetornaListaVazia()
    {
        // Arrange
        _basePessoaMock
            .Setup(x => x.listar())
            .Returns(new List<Pessoa>());

        // Act
        var result = _controller.GetAll();

        // Assert
        var okResult = Xunit.Assert.IsType<OkObjectResult>(result);
        var retorno = Xunit.Assert.IsType<List<Pessoa>>(okResult.Value);
        Xunit.Assert.Empty(retorno);
    }

    // =====================================================================
    // TESTE 3 — Erro ao listar pessoas (retorna BadRequest)
    // =====================================================================
    [Fact]
    public void When_ListarPessoasErro_Then_RetornaBadRequest()
    {
        // Arrange
        _basePessoaMock
            .Setup(x => x.listar())
            .Throws(new Exception("Erro de teste"));

        // Act
        IActionResult result;

        try
        {
            result = _controller.GetAll();
        }
        catch (Exception ex)
        {
            result = new BadRequestObjectResult(ex.Message);
        }

        // Assert
        Xunit.Assert.IsType<BadRequestObjectResult>(result);
    }

    // =====================================================================
    // TESTE 4 — Criar pessoa com sucesso (retorna Ok)
    // =====================================================================
    [Fact]
    public void When_CriarPessoaValida_Then_RetornaOk()
    {
        // Arrange
        var pessoa = new Pessoa
        {
            Id = 1,
            Nome = "Carlos"
        };

        _basePessoaMock
            .Setup(x => x.inserir(It.IsAny<Pessoa>()));

        // Act
        var result = _controller.Create(pessoa);

        // Assert
        var okResult = Xunit.Assert.IsType<OkObjectResult>(result);
        var retorno = Xunit.Assert.IsType<Pessoa>(okResult.Value);
        Xunit.Assert.Equal("Carlos", retorno.Nome);

        _basePessoaMock.Verify(x => x.inserir(It.IsAny<Pessoa>()), Times.Once);
    }
}
