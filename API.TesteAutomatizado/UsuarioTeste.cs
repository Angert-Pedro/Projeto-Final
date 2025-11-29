using API.Models;
using API.Services.Interfaces;
using API.Validator.Controllers;
using API.Validator.Request;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Linq.Expressions;
using Xunit;

public class UsuarioControllerTests
{
    private readonly Mock<IUsuarioService> _serviceMock;
    private readonly Mock<IBaseService<Usuario>> _baseUsuarioMock;
    private readonly Mock<IBaseService<Pessoa>> _basePessoaMock;
    private readonly Mock<IBaseService<Notificacao>> _baseNotificacaoMock;

    private readonly UsuarioController _controller;

    public UsuarioControllerTests()
    {
        _serviceMock = new Mock<IUsuarioService>();
        _baseUsuarioMock = new Mock<IBaseService<Usuario>>();
        _basePessoaMock = new Mock<IBaseService<Pessoa>>();
        _baseNotificacaoMock = new Mock<IBaseService<Notificacao>>();

        _controller = new UsuarioController(
            _serviceMock.Object,
            _baseUsuarioMock.Object,
            _basePessoaMock.Object,
            _baseNotificacaoMock.Object
        );
    }

    // =====================================================================
    // TESTE 1 — Criar Usuário com Sucesso
    // =====================================================================
    [Fact]
    public void When_CriarUsuarioValido_Then_RetornaOk()
    {
        var usuario = new Usuario
        {
            Login = "teste",
            Pessoa_ = new Pessoa { Cpf = "111", Email = "a@a.com" }
        };

        // listarPor
        _baseUsuarioMock.Setup(x => x.listarPor(It.IsAny<Expression<Func<Usuario, bool>>>()))
                        .Returns((Usuario)null);

        _basePessoaMock.Setup(x => x.listarPor(It.IsAny<Expression<Func<Pessoa, bool>>>()))
                       .Returns((Pessoa)null);

        // verificarExistencia (IMPORTANTE)
        _baseUsuarioMock.Setup(x => x.verificarExistencia(It.IsAny<Usuario>()))
                        .Returns(false);

        _basePessoaMock.Setup(x => x.verificarExistencia(It.IsAny<Pessoa>()))
                       .Returns(false);

        // inserir
        _baseUsuarioMock.Setup(x => x.inserir(It.IsAny<Usuario>()));
        _basePessoaMock.Setup(x => x.inserir(It.IsAny<Pessoa>()));

        // criarUsuario do service
        _serviceMock.Setup(x => x.criarUsuario(It.IsAny<Usuario>()));

        // notificação
        _baseNotificacaoMock.Setup(x => x.inserir(It.IsAny<Notificacao>()));
        _baseUsuarioMock.Setup(x => x.enviarNotificacao(It.IsAny<Notificacao>()))
                        .Returns(true);

        // Act
        var result = _controller.criarUsuario(usuario);

        // Xunit
        Xunit.Assert.IsType<OkObjectResult>(result);
    }

    // =====================================================================
    // TESTE 2 — Criar Usuário Repetido
    // =====================================================================
    [Fact]
    public void When_CriarUsuarioExistente_Then_RetornaBadRequest()
    {
        _baseUsuarioMock.Setup(x => x.listarPor(It.IsAny<Expression<Func<Usuario, bool>>>()))
                        .Returns(new Usuario());

        var usuario = new Usuario
        {
            Login = "joao",
            Pessoa_ = new Pessoa()
        };

        var result = _controller.criarUsuario(usuario);

        Xunit.Assert.IsType<BadRequestObjectResult>(result);
    }

    // =====================================================================
    // TESTE 3 — Consultar Usuário Existente
    // =====================================================================
    [Fact]
    public void When_ConsultarUsuarioExistente_Then_RetornaOk()
    {
        _baseUsuarioMock.Setup(x => x.listarPor(It.IsAny<Expression<Func<Usuario, bool>>>()))
                        .Returns(new Usuario());

        var result = _controller.consultarUsuario("teste");

        Xunit.Assert.IsType<OkObjectResult>(result);
    }

    // =====================================================================
    // TESTE 4 — Consultar Usuário Não Encontrado
    // =====================================================================
    [Fact]
    public void When_ConsultarUsuarioInexistente_Then_RetornaNotFound()
    {
        _baseUsuarioMock.Setup(x => x.listarPor(It.IsAny<Expression<Func<Usuario, bool>>>()))
                        .Returns((Usuario)null);

        var result = _controller.consultarUsuario("abc");

        Xunit.Assert.IsType<NotFoundObjectResult>(result);
    }

    // =====================================================================
    // TESTE 5 — Atualizar Usuário
    // =====================================================================
    [Fact]
    public void When_AtualizarUsuario_Then_RetornaOk()
    {
        _serviceMock.Setup(x => x.atualizarUsuario(It.IsAny<Usuario>()));

        var result = _controller.atualizarUsuario(new Usuario());

        Xunit.Assert.IsType<OkObjectResult>(result);
    }

    // =====================================================================
    // TESTE 6 — Excluir Usuário quando Existe
    // =====================================================================
    [Fact]
    public void When_ExcluirUsuarioExistente_Then_RetornaOk()
    {
        var usuario = new Usuario { Pessoa_ = new Pessoa() };

        // listarPor
        _baseUsuarioMock.Setup(x => x.listarPor(It.IsAny<Expression<Func<Usuario, bool>>>()))
                        .Returns(usuario);

        // verificarExistencia
        _baseUsuarioMock.Setup(x => x.verificarExistencia(It.IsAny<Usuario>()))
                        .Returns(true);

        _basePessoaMock.Setup(x => x.verificarExistencia(It.IsAny<Pessoa>()))
                       .Returns(true);

        // deletar
        _baseUsuarioMock.Setup(x => x.deletar(It.IsAny<Usuario>()))
                        .Returns(true);

        _basePessoaMock.Setup(x => x.deletar(It.IsAny<Pessoa>()))
                       .Returns(true);

        var result = _controller.excluirUsuario("login");

        Xunit.Assert.IsType<OkObjectResult>(result);
    }

    // =====================================================================
    // TESTE 7 — Login Usuário Não Encontrado
    // =====================================================================
    [Fact]
    public void When_ExecutarLoginUsuarioInexistente_Then_RetornaNotFound()
    {
        _baseUsuarioMock.Setup(x => x.listarPor(It.IsAny<Expression<Func<Usuario, bool>>>()))
                        .Returns((Usuario)null);

        var request = new LoginRequest { Login = "x", Senha = "123" };

        var result = _controller.executarLogin(request);

        Xunit.Assert.IsType<NotFoundObjectResult>(result);
    }

    // =====================================================================
    // TESTE 8 — Logout Usuário Não Encontrado
    // =====================================================================
    [Fact]
    public void When_ExecutarLogoutUsuarioInexistente_Then_RetornaNotFound()
    {
        _baseUsuarioMock.Setup(x => x.listarPor(It.IsAny<Expression<Func<Usuario, bool>>>()))
                        .Returns((Usuario)null);

        var result = _controller.executarLogout("login");

        Xunit.Assert.IsType<NotFoundObjectResult>(result);
    }
}
