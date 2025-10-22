using API.Criptografia;
using API.Models;
using API.Services;
using API.Validator.Request;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Text;

namespace API.Validator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _service;
        private readonly BaseService<Usuario> _baseService;
        private readonly BaseService<Pessoa> _baseServicePessoa;
        private readonly BaseService<Notificacao> _baseServiceNotificacao;
     
        public UsuarioController(UsuarioService service, BaseService<Usuario> baseService, BaseService<Pessoa> baseServicePessoa, BaseService<Notificacao> baseServiceNotificacao)
        {
            _service = service;
            _baseService = baseService;
            _baseServicePessoa = baseServicePessoa;
            _baseServiceNotificacao = baseServiceNotificacao;
        }

        [HttpPost("criarUsuario")]
        public IActionResult criarUsuario([FromBody] Usuario usuario)
        {
            try
            {
                if (consultarUsuario(usuario.Login) is OkObjectResult okResult)
                {
                    return BadRequest("Usu�rio j� existe!");
                }
                else
                {
                    if(_baseServicePessoa.listarPor(x => x.Cpf == usuario.Pessoa_.Cpf) != null)
                        return BadRequest("CPF j� cadastrado!");
                    
                    _service.criarUsuario(usuario);
                    enviarEmail(usuario, "AtivarConta");
                    return Ok("Usu�rio criado com sucesso!");
                }
            } catch(Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisi��o! Log:" + ex);
            }
        }

        [HttpGet("consultarUsuario")]
        public IActionResult consultarUsuario(string usuario)
        {
            try
            {
                Usuario resultado = _baseService.listarPor(x=> x.Login == usuario);
                if (resultado != null)
                    return Ok(resultado);
                else
                    return NotFound("Usu�rio n�o encontrado!");
            }
            catch(Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisi��o! Log:" + ex);
            }
        }

        [HttpPost("atualizarUsuario")]
        public IActionResult atualizarUsuario([FromBody] Usuario usuario)
        {
            try
            {
                _service.atualizarUsuario(usuario);
                return Ok("Usu�rio atualizado com sucesso!");
            }
            catch (Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisi��o! Log:" + ex);
            }
        }

        [HttpPost("excluirUsuario")]
        public IActionResult excluirUsuario([FromBody] string login)
        {
            try
            {
                Usuario usuario = _baseService.listarPor(x => x.Login == login);

                if (usuario == null)
                    return BadRequest("Usu�rio n�o existe!");

                if (_baseService.deletar(usuario) && _baseServicePessoa.deletar(usuario.Pessoa_))
                    return Ok("Usu�rio exclu�do com sucesso!");
                else
                    return NotFound("Usu�rio n�o encontrado!");
            }
            catch (Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisi��o! Log:" + ex);
            }
        }

        [HttpPost("executarLogin")]
        public IActionResult executarLogin([FromBody] LoginRequest usuario)
        {
            try
            {
                Usuario usuarioLogin = new Usuario();
                usuarioLogin = _baseService.listarPor(x => x.Login == usuario.Login);
                if (usuarioLogin != null)
                {
                    if (usuarioLogin.Usuario_logado == OperacaoLogin.Login)
                        return BadRequest("Usu�rio j� est� logado!");
                    if(_service.executarLogin(usuarioLogin, usuario.Senha))
                        return Ok("Usu�rio logado!");
                    else
                        return BadRequest("Usu�rio ou senha incorretos!");
                }
                else
                    return NotFound("Usu�rio n�o encontrado!");
            }
            catch (Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisi��o! Log:" + ex);
            }
        }

        [HttpPost("executarLogout")]
        public IActionResult executarLogout([FromBody] string usuario)
        {
            try
            {
                Usuario usuarioLogin = new Usuario();
                usuarioLogin = _baseService.listarPor(x => x.Login == usuario);
                if (usuarioLogin != null)
                {
                    if (usuarioLogin.Usuario_logado == OperacaoLogin.Logout)
                        return BadRequest("Usu�rio n�o est� logado!");
                    _service.executarLogout(usuarioLogin);
                    return Ok("Usu�rio deslogado com sucesso!");
                }
                else
                    return NotFound("Usu�rio n�o encontrado!");
            }
            catch (Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisi��o! Log:" + ex);
            }
        }

        [HttpPost("recuperarSenha")]
        public IActionResult recuperarSenha([FromBody] string email)
        {
            try
            {
                Usuario usuario = _baseService.listarPor(x => x.Pessoa_.Email == email);
                if (usuario != null)
                {
                    enviarEmail(usuario, "RecuperarSenha");
                    return Ok();
                }
                else
                    return NotFound("E-mail inexistente!");
            } catch(Exception ex)
            {
                throw;
            }
        }

        private string gerarToken(int tempoExpiracao, string email)
        {
            Token tk = new Token();
            string token = tk.GenerateToken(email, tempoExpiracao);
            return token;
        }

        [HttpGet("validarToken")]
        public IActionResult ValidarToken([FromQuery] string email, string token)
        {
            try
            {
                if (string.IsNullOrEmpty(token))
                    return BadRequest("Token n�o informado.");

                Token tk = new Token();

                var tokenBanco = _baseServiceNotificacao.listarPor(x => x.Token == token);

                if (tokenBanco == null)
                    return BadRequest("Token j� foi utilizado!");

                if (tk.ValidarToken(email, token))
                    return Ok("Token v�lido.");
                else
                    return BadRequest("Token inv�lido.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("alterarSenha")]
        public IActionResult AlterarSenha([FromBody] AlterarSenhaRequest request)
        {
            try
            {
                var token = request.Token;
                var email = request.Email;
                var novaSenha = request.NovaSenha;

                if (string.IsNullOrEmpty(token) || string.IsNullOrEmpty(email))
                    return BadRequest("Est� faltando o token ou o e-mail.");

                Token tk = new Token();

                Notificacao notificacao = _baseServiceNotificacao.listarPor(x => x.Token == token);

                if (tk.ValidarToken(email, token))
                {
                    Usuario usuario = _baseService.listarPor(y => y.Pessoa_.Email == email);
                    if (usuario != null)
                    {
                        if (notificacao != null)
                        {
                            CriptografiaAES crip = new CriptografiaAES();
                            usuario.Senha = crip.CriptografarAES(novaSenha);
                            _baseService.atualizar(usuario);
                            notificacao.Token = "";
                            _baseServiceNotificacao.atualizar(notificacao);
                            return Ok("Senha atualizada com sucesso!");
                        }
                        else
                            return BadRequest("O token j� foi utilizado!");
                    }
                    else
                        return BadRequest("Usu�rio inv�lido!");
                }
                else
                    return BadRequest("Token inv�lido!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [NonAction]
        public void enviarEmail(Usuario usuario, string link)
        {
            try
            {
                Destinatario destinatario = new Destinatario(usuario.Pessoa_.Nome, usuario.Pessoa_.Email);

                string token = gerarToken(1440, destinatario.Email);
            
                Notificacao notificacao = new Notificacao("Recupera��o de senha", destinatario.Email, montarMensagemRecuperacaoSenha(destinatario, $"http://localhost:8081/{link}?token={token}&email={usuario.Pessoa_.Email}"), token, usuario);

                notificacao.Data_Envio = DateTime.Now;

                _baseServiceNotificacao.inserir(notificacao);
                _baseService.enviarNotificacao(notificacao);

            }
            catch(Exception ex)
            {
                throw;
            }
        }

        private string montarMensagemAtivacaoConta(Destinatario destinatario, string linkAtivacao)
        {
            return $@"
                <!doctype html>
                <html lang=""pt-BR"">
                <head>
                  <meta charset=""utf-8"">
                  <meta name=""viewport"" content=""width=device-width,initial-scale=1"">
                  <title>Ativa��o de conta</title>
                  <style>
                    /* Reset simples */
                    body,table,td{{margin:0;padding:0;border:0;font-family:Helvetica, Arial, sans-serif}}
                    img{{border:0;display:block;outline:none;text-decoration:none}}
                    a{{color:inherit;text-decoration:none}}
                    /* Container */
                    .email-wrap{{width:100%;background-color:#f4f6f8;padding:20px 0}}
                    .email-content{{max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden}}
                    .spacer{{height:24px}}
                    /* Header */
                    .header{{padding:24px;text-align:center;background:linear-gradient(90deg,#0ea5a0,#06b6d4);color:#ffffff}}
                    .brand{{font-size:20px;font-weight:700}}
                    .preheader{{display:none!important;visibility:hidden;mso-hide:all;opacity:0;color:transparent;height:0;width:0}}
                    /* Body */
                    .body{{padding:28px}}
                    h1{{font-size:20px;margin:0 0 8px;color:#0f172a}}
                    p{{font-size:15px;line-height:1.5;color:#475569;margin:0 0 12px}}
                    .button-cell{{padding:22px 0;text-align:center}}
                    .btn{{display:inline-block;padding:12px 22px;border-radius:8px;background:#0ea5a0;color:#fff;font-weight:600}}
                    .muted{{font-size:13px;color:#94a3b8}}
                    /* Footer */
                    .footer{{padding:18px;text-align:center;font-size:13px;color:#94a3b8}}
                    .small-link{{color:#64748b}}
                    /* Responsivo */
                    @media only screen and (max-width:480px){{
                      .body{{padding:18px}}
                      .header{{padding:18px}}
                      .brand{{font-size:18px}}
                      .btn{{width:100%;box-sizing:border-box}}
                    }}
                  </style>
                </head>
                <body>
                  <!-- Preheader -->
                  <div class=""preheader"">Ative sua conta e comece a usar nossos servi�os.</div>

                  <table class=""email-wrap"" width=""100%"" cellpadding=""0"" cellspacing=""0"" role=""presentation"">
                    <tr>
                      <td align=""center"">
                        <table class=""email-content"" width=""100%"" cellpadding=""0"" cellspacing=""0"" role=""presentation"">

                          <!-- Header -->
                          <tr>
                            <td class=""header"">
                              <div class=""brand"">Validator</div>
                            </td>
                          </tr>

                          <!-- Corpo -->
                          <tr>
                            <td class=""body"">
                              <h1>Bem-vindo(a), {destinatario.Nome}!</h1>
                              <p>Estamos muito felizes em t�-lo(a) conosco. Para come�ar a usar sua conta, � necess�rio ativ�-la clicando no bot�o abaixo.</p>
                              
                              <table width=""100%"" role=""presentation"">
                                <tr>
                                  <td class=""button-cell"">
                                    <a href=""{linkAtivacao}"" class=""btn"" target=""_blank"" rel=""noopener"">Ativar minha conta</a>
                                  </td>
                                </tr>
                              </table>

                              <div class=""spacer""></div>

                              <p class=""muted"">Se voc� n�o criou esta conta, ignore este e-mail. Caso precise de ajuda, entre em contato com nosso suporte.</p>
                            </td>
                          </tr>

                        </table>
                      </td>
                    </tr>
                  </table>
                </body>
                </html>";
        }

        private string montarMensagemRecuperacaoSenha(Destinatario destinatario, string linkRedefinicao)
        {
            return $@"
                <!doctype html>
                <html lang=""pt-BR"">
                <head>
                  <meta charset=""utf-8"">
                  <meta name=""viewport"" content=""width=device-width,initial-scale=1"">
                  <title>Redefini��o de senha</title>
                  <style>
                    /* Reset simples */
                    body,table,td{{margin:0;padding:0;border:0;font-family:Helvetica, Arial, sans-serif}}
                    img{{border:0;display:block;outline:none;text-decoration:none}}
                    a{{color:inherit;text-decoration:none}}
                    /* Container */
                    .email-wrap{{width:100%;background-color:#f4f6f8;padding:20px 0}}
                    .email-content{{max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden}}
                    .spacer{{height:24px}}
                    /* Header */
                    .header{{padding:24px;text-align:center;background:linear-gradient(90deg,#0ea5a0,#06b6d4);color:#ffffff}}
                    .brand{{font-size:20px;font-weight:700}}
                    .preheader{{display:none!important;visibility:hidden;mso-hide:all;opacity:0;color:transparent;height:0;width:0}}
                    /* Body */
                    .body{{padding:28px}}
                    h1{{font-size:20px;margin:0 0 8px;color:#0f172a}}
                    p{{font-size:15px;line-height:1.5;color:#475569;margin:0 0 12px}}
                    .button-cell{{padding:22px 0;text-align:center}}
                    .btn{{display:inline-block;padding:12px 22px;border-radius:8px;background:#0ea5a0;color:#fff;font-weight:600}}
                    .muted{{font-size:13px;color:#94a3b8}}
                    .code{{display:inline-block;padding:8px 10px;border-radius:6px;background:#f1f5f9;border:1px solid #e2e8f0;font-family:monospace}}
                    /* Footer */
                    .footer{{padding:18px;text-align:center;font-size:13px;color:#94a3b8}}
                    .small-link{{color:#64748b}}
                    /* Responsivo */
                    @media only screen and (max-width:480px){{
                      .body{{padding:18px}}
                      .header{{padding:18px}}
                      .brand{{font-size:18px}}
                      .btn{{width:100%;box-sizing:border-box}}
                    }}
                  </style>
                </head>
                <body>
                  <!-- Preheader -->
                  <div class=""preheader"">Redefina sua senha � link v�lido por 24 horas.</div>

                  <table class=""email-wrap"" width=""100%"" cellpadding=""0"" cellspacing=""0"" role=""presentation"">
                    <tr>
                      <td align=""center"">
                        <table class=""email-content"" width=""100%"" cellpadding=""0"" cellspacing=""0"" role=""presentation"">

                          <!-- Header -->
                          <tr>
                            <td class=""header"">
                              <div class=""brand"">Validator</div>
                            </td>
                          </tr>

                          <!-- Corpo -->
                          <tr>
                            <td class=""body"">
                              <h1>Redefina sua senha</h1>
                              <p>Ol� {destinatario.Nome},</p>
                              <p>Recebemos uma solicita��o para redefinir a senha da sua conta. Clique no bot�o abaixo para criar uma nova senha. Esse link expira em <strong>24 horas</strong> por motivos de seguran�a.</p>

                              <table width=""100%"" role=""presentation"">
                                <tr>
                                  <td class=""button-cell"">
                                    <a href=""{linkRedefinicao}"" class=""btn"" target=""_blank"" rel=""noopener"">Redefinir minha senha</a>
                                  </td>
                                </tr>
                              </table>

                              <div class=""spacer""></div>

                              <p class=""muted"">Se voc� n�o solicitou a redefini��o de senha, ignore este e-mail � sua senha permanecer� a mesma. Se precisar de ajuda, responda a este e-mail ou visite nossa p�gina de suporte.</p>
                            </td>
                          </tr>

                        </table>
                      </td>
                    </tr>
                  </table>
                </body>
                </html>";
        }
    }
}
