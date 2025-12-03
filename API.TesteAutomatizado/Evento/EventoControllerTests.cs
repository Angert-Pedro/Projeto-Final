using API.Models;
using API.Services.Interfaces;
using API.Validator.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Xunit;

public class EventoControllerTests
{
    private readonly Mock<IBaseService<Evento>> _baseEventoMock;
    private readonly Mock<IBaseService<Localizacao>> _baseLocalizacaoMock;

    private readonly EventoController _controller;

    public EventoControllerTests()
    {
        _baseEventoMock = new Mock<IBaseService<Evento>>();
        _baseLocalizacaoMock = new Mock<IBaseService<Localizacao>>();

        _controller = new EventoController(
            _baseEventoMock.Object,
            _baseLocalizacaoMock.Object
        );
    }

    // =====================================================================
    // TESTES DE criarEvento
    // =====================================================================

    [Fact]
    public void When_CriarEventoComSucesso_Then_RetornaOk()
    {
        // Arrange
        var evento = new Evento
        {
            Id = 1,
            Nome = "Show",
            Data_Evento = DateTime.Now.AddDays(5)
        };

        _baseEventoMock
            .Setup(x => x.inserir(evento))
            .Verifiable();

        // Act
        var result = _controller.criarEvento(evento);

        // Assert
        Xunit.Assert.IsType<OkObjectResult>(result);
        _baseEventoMock.Verify(x => x.inserir(evento), Times.Once);
    }

    [Fact]
    public void When_CriarEventoFalha_Then_RetornaBadRequest()
    {
        // Arrange
        var evento = new Evento { Id = 1, Nome = "Erro" };

        _baseEventoMock
            .Setup(x => x.inserir(It.IsAny<Evento>()))
            .Throws(new Exception("Falha ao inserir"));

        // Act
        var result = _controller.criarEvento(evento);

        // Assert
        Xunit.Assert.IsType<BadRequestObjectResult>(result);
    }

    // =====================================================================
    // TESTES de obterEventos
    // =====================================================================

    [Fact]
    public void When_ListarEventosFuturosExistem_Then_RetornaOk()
    {
        // Arrange
        var eventos = new List<Evento>
        {
            new Evento { Id = 1, Nome = "Show", Data_Evento = DateTime.Now.AddDays(1) },
            new Evento { Id = 2, Nome = "Feira", Data_Evento = DateTime.Now.AddDays(2) }
        };

        _baseEventoMock
            .Setup(x => x.listarVariosPor(It.IsAny<Expression<Func<Evento, bool>>>()))
            .Returns(eventos);

        // Act
        var result = _controller.obterEventos();

        // Assert
        Xunit.Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public void When_ListarEventosFuturosNaoExistem_Then_RetornaNotFound()
    {
        // Arrange
        _baseEventoMock
            .Setup(x => x.listarVariosPor(It.IsAny<Expression<Func<Evento, bool>>>()))
            .Returns(new List<Evento>());

        // Act
        var result = _controller.obterEventos();

        // Assert
        Xunit.Assert.IsType<NotFoundObjectResult>(result);
    }

    [Fact]
    public void When_ListarEventosFuturosErro_Then_RetornaBadRequest()
    {
        // Arrange
        _baseEventoMock
            .Setup(x => x.listarVariosPor(It.IsAny<Expression<Func<Evento, bool>>>()))
            .Throws(new Exception("Erro"));

        // Act
        var result = _controller.obterEventos();

        // Assert
        Xunit.Assert.IsType<BadRequestObjectResult>(result);
    }

    // =====================================================================
    // TESTES de obterEventoPorID
    // =====================================================================

    [Fact]
    public void When_ObterEventoPorIDExiste_Then_RetornaOk()
    {
        // Arrange
        var evento = new Evento
        {
            Id = 10,
            Nome = "Teste",
            Data_Evento = DateTime.Now.AddDays(10)
        };

        _baseEventoMock
            .Setup(x => x.listarPor(It.IsAny<Expression<Func<Evento, bool>>>()))
            .Returns(evento);

        // Act
        var result = _controller.obterEventoPorID(10);

        // Assert
        Xunit.Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public void When_ObterEventoPorIDNaoExiste_Then_RetornaNotFound()
    {
        // Arrange
        _baseEventoMock
            .Setup(x => x.listarPor(It.IsAny<Expression<Func<Evento, bool>>>()))
            .Returns((Evento)null);

        // Act
        var result = _controller.obterEventoPorID(5);

        // Assert
        Xunit.Assert.IsType<NotFoundObjectResult>(result);
    }

    [Fact]
    public void When_ObterEventoPorIDErro_Then_RetornaBadRequest()
    {
        // Arrange
        _baseEventoMock
            .Setup(x => x.listarPor(It.IsAny<Expression<Func<Evento, bool>>>()))
            .Throws(new Exception("erro"));

        // Act
        var result = _controller.obterEventoPorID(1);

        // Assert
        Xunit.Assert.IsType<BadRequestObjectResult>(result);
    }
}
