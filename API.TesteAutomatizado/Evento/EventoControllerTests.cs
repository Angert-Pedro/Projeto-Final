using API.Models;
using API.Services.Interfaces;
using API.Validator.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Xunit;
namespace API.TesteAutomatizadoEvento;

public class EventoControllerTests
{
    private readonly Mock<IEventoService> _serviceMock;
    private readonly EventoController _controller;
    private readonly Mock<IBaseService<Evento>> _baseEventoMock;
    private readonly Mock<IBaseService<Localizacao>> _baseLocalizacaoMock;

    public EventoControllerTests()
    {
        _serviceMock = new Mock<IEventoService>();

        _baseEventoMock = new Mock<IBaseService<Evento>>();
        _baseLocalizacaoMock = new Mock<IBaseService<Localizacao>>();

        _controller = new EventoController(
            _baseEventoMock.Object,
            _baseLocalizacaoMock.Object
        );
    }

    // =====================================================================
    // TESTE 1 — Listar eventos com sucesso (retorna eventos futuros)
    // =====================================================================
    [Fact]
    public void When_ListarEventosFuturosExistem_Then_RetornaOk()
    {
        // Triple A - AAA - Arrange / Assert / Act

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

    // =====================================================================
    // TESTE 2 — Nenhum evento encontrado (retorna NotFound)
    // =====================================================================
    [Fact]
    public void When_ListarEventosFuturosNaoExistem_Then_RetornaNotFound()
    {
        // Arrange
        _baseEventoMock
            .Setup(x => x.listarVariosPor(It.IsAny<Expression<Func<Evento, bool>>>()))
            .Returns(new List<Evento>()); // vazio

        // Act
        var result = _controller.obterEventos();

        // Assert
        Xunit.Assert.IsType<NotFoundObjectResult>(result);
    }

    // =====================================================================
    // TESTE 3 — Service lança exceção (retorna BadRequest)
    // =====================================================================
    [Fact]
    public void When_ListarEventosFuturosErro_Then_RetornaBadRequest()
    {
        // Arrange
        _baseEventoMock
            .Setup(x => x.listarVariosPor(It.IsAny<Expression<Func<Evento, bool>>>()))
            .Throws(new Exception("Erro de teste"));

        // Act
        var result = _controller.obterEventos();

        // Assert
        Xunit.Assert.IsType<BadRequestObjectResult>(result);
    }
}
