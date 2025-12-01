using API.Controllers;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Xunit;

public class IngressoControllerTests
{
    private readonly Mock<BaseService<Ingresso>> _ingressoServiceMock;
    private readonly Mock<BaseService<Usuario>> _usuarioServiceMock;
    private readonly IngressoController _controller;

    public IngressoControllerTests()
    {
        _ingressoServiceMock = new Mock<BaseService<Ingresso>>();
        _usuarioServiceMock = new Mock<BaseService<Usuario>>();

        _controller = new IngressoController(
            _ingressoServiceMock.Object,
            _usuarioServiceMock.Object
        );
    }

    // =====================================================================
    // TESTE 1 — GetAll retorna lista de ingressos com sucesso
    // =====================================================================
    [Fact]
    public void When_GetAll_Then_RetornaOkComListaIngressos()
    {
        // Arrange
        var ingressos = new List<Ingresso>
        {
            new Ingresso { Id = 1, Codigo = "ING001", Tipo = "VIP" },
            new Ingresso { Id = 2, Codigo = "ING002", Tipo = "Normal" }
        };

        _ingressoServiceMock.Setup(x => x.listar())
                           .Returns(ingressos);

        // Act
        var result = _controller.GetAll();

        // Assert
        var okResult = Xunit.Assert.IsType<OkObjectResult>(result);
        var listaRetornada = Xunit.Assert.IsAssignableFrom<List<Ingresso>>(okResult.Value);
        Xunit.Assert.Equal(2, listaRetornada.Count);
    }

    // =====================================================================
    // TESTE 2 — GetAll retorna lista vazia
    // =====================================================================
    [Fact]
    public void When_GetAllSemIngressos_Then_RetornaOkComListaVazia()
    {
        // Arrange
        _ingressoServiceMock.Setup(x => x.listar())
                           .Returns(new List<Ingresso>());

        // Act
        var result = _controller.GetAll();

        // Assert
        var okResult = Xunit.Assert.IsType<OkObjectResult>(result);
        var listaRetornada = Xunit.Assert.IsAssignableFrom<List<Ingresso>>(okResult.Value);
        Xunit.Assert.Empty(listaRetornada);
    }

    // =====================================================================
    // TESTE 3 — Create ingresso com sucesso
    // =====================================================================
    [Fact]
    public void When_CriarIngressoValido_Then_RetornaOkComIngresso()
    {
        // Arrange
        var ingresso = new Ingresso
        {
            Id = 1,
            Codigo = "ING001",
            Tipo = "VIP",
            Data_Compra = DateTime.Now,
            Valido = true
        };

        _ingressoServiceMock.Setup(x => x.inserir(It.IsAny<Ingresso>()));

        // Act
        var result = _controller.Create(ingresso);

        // Assert
        var okResult = Xunit.Assert.IsType<OkObjectResult>(result);
        var ingressoRetornado = Xunit.Assert.IsType<Ingresso>(okResult.Value);
        Xunit.Assert.Equal("ING001", ingressoRetornado.Codigo);
        _ingressoServiceMock.Verify(x => x.inserir(It.IsAny<Ingresso>()), Times.Once);
    }

    // =====================================================================
    // TESTE 4 — ListarPorUsuario com usuário válido
    // =====================================================================
    [Fact]
    public void When_ListarPorUsuarioValido_Then_RetornaOkComIngressos()
    {
        // Arrange
        var usuario = new Usuario
        {
            Id = 1,
            Login = "teste@teste.com"
        };

        var ingressos = new List<Ingresso>
        {
            new Ingresso
            {
                Id = 1,
                usuario_id = 1,
                Evento_ = new Evento { Data_Evento = DateTime.Now.AddDays(10) }
            }
        };

        _usuarioServiceMock.Setup(x => x.listarPor(It.IsAny<Expression<Func<Usuario, bool>>>()))
                          .Returns(usuario);

        _ingressoServiceMock.Setup(x => x.listarVariosPor(It.IsAny<Expression<Func<Ingresso, bool>>>()))
                           .Returns(ingressos);

        // Act
        var result = _controller.ListarPorUsuario("teste@teste.com");

        // Assert
        var okResult = Xunit.Assert.IsType<OkObjectResult>(result);
        var ingressosRetornados = Xunit.Assert.IsAssignableFrom<List<Ingresso>>(okResult.Value);
        Xunit.Assert.Single(ingressosRetornados);
    }

    // =====================================================================
    // TESTE 5 — ListarPorUsuario com usuário inexistente
    // =====================================================================
    [Fact]
    public void When_ListarPorUsuarioInexistente_Then_RetornaBadRequest()
    {
        // Arrange
        _usuarioServiceMock.Setup(x => x.listarPor(It.IsAny<Expression<Func<Usuario, bool>>>()))
                          .Returns((Usuario)null);

        // Act
        var result = _controller.ListarPorUsuario("usuarioInexistente");

        // Assert
        var badRequestResult = Xunit.Assert.IsType<BadRequestObjectResult>(result);
        Xunit.Assert.Equal("Usuário inválido!", badRequestResult.Value);
    }

    // =====================================================================
    // TESTE 6 — ListarPorUsuario com exceção no serviço
    // =====================================================================
    [Fact]
    public void When_ListarPorUsuarioComExcecao_Then_RetornaBadRequestComExcecao()
    {
        // Arrange
        var exception = new Exception("Erro no banco de dados");

        _usuarioServiceMock.Setup(x => x.listarPor(It.IsAny<Expression<Func<Usuario, bool>>>()))
                          .Throws(exception);

        // Act
        var result = _controller.ListarPorUsuario("teste@teste.com");

        // Assert
        var badRequestResult = Xunit.Assert.IsType<BadRequestObjectResult>(result);
        Xunit.Assert.Equal(exception, badRequestResult.Value);
    }

    // =====================================================================
    // TESTE 7 — ListarPorUsuario com usuário válido mas sem ingressos futuros
    // =====================================================================
    [Fact]
    public void When_ListarPorUsuarioValidoSemIngressosFuturos_Then_RetornaOkComListaVazia()
    {
        // Arrange
        var usuario = new Usuario
        {
            Id = 1,
            Login = "teste@teste.com"
        };

        var ingressosVazios = new List<Ingresso>();

        _usuarioServiceMock.Setup(x => x.listarPor(It.IsAny<Expression<Func<Usuario, bool>>>()))
                          .Returns(usuario);

        _ingressoServiceMock.Setup(x => x.listarVariosPor(It.IsAny<Expression<Func<Ingresso, bool>>>()))
                           .Returns(ingressosVazios);

        // Act
        var result = _controller.ListarPorUsuario("teste@teste.com");

        // Assert
        var okResult = Xunit.Assert.IsType<OkObjectResult>(result);
        var ingressosRetornados = Xunit.Assert.IsAssignableFrom<List<Ingresso>>(okResult.Value);
        Xunit.Assert.Empty(ingressosRetornados);
    }

    // =====================================================================
    // TESTE 8 — Create ingresso nulo
    // =====================================================================
    [Fact]
    public void When_CriarIngressoNulo_Then_RetornaOkComValorNulo()
    {
        // Arrange
        Ingresso ingresso = null;

        _ingressoServiceMock.Setup(x => x.inserir(It.IsAny<Ingresso>()));

        // Act
        var result = _controller.Create(ingresso);

        // Assert
        var okResult = Xunit.Assert.IsType<OkObjectResult>(result);
        Xunit.Assert.Null(okResult.Value);
        _ingressoServiceMock.Verify(x => x.inserir(null), Times.Once);
    }
}
