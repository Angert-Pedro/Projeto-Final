using API.Criptografia;
using API.Models;
using API.Services;
using API.Validator.Request;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic;
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
                    return BadRequest("Usuário já existe!");
                }
                else
                {
                    if(_baseServicePessoa.listarPor(x => x.Cpf == usuario.Pessoa_.Cpf) != null)
                        return BadRequest("CPF já cadastrado!");

                    if (_baseServicePessoa.listarPor(x => x.Email == usuario.Pessoa_.Email) != null)
                        return BadRequest("E-mail já cadastrado!");

                    _service.criarUsuario(usuario);
                    enviarEmail(usuario, "AtivarConta");
                    return Ok("Usuário criado com sucesso!");
                }
            } catch(Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisição! Log:" + ex);
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
                    return NotFound("Usuário não encontrado!");
            }
            catch(Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisição! Log:" + ex);
            }
        }

        [HttpPost("atualizarUsuario")]
        public IActionResult atualizarUsuario([FromBody] Usuario usuario)
        {
            try
            {
                _service.atualizarUsuario(usuario);
                return Ok("Usuário atualizado com sucesso!");
            }
            catch (Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisição! Log:" + ex);
            }
        }

        [HttpPost("excluirUsuario")]
        public IActionResult excluirUsuario([FromBody] string login)
        {
            try
            {
                Usuario usuario = _baseService.listarPor(x => x.Login == login);

                if (usuario == null)
                    return BadRequest("Usuário não existe!");

                if (_baseService.deletar(usuario) && _baseServicePessoa.deletar(usuario.Pessoa_))
                    return Ok("Usuário excluído com sucesso!");
                else
                    return NotFound("Usuário não encontrado!");
            }
            catch (Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisição! Log:" + ex);
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
                        return BadRequest("Usuário já está logado!");
                    else if (!usuarioLogin.Ativo)
                        return Unauthorized("Usuário não foi ativado ainda! Verifique seu e-mail.");
                    if (_service.executarLogin(usuarioLogin, usuario.Senha))
                        return Ok("Usuário logado!");
                    else
                        return BadRequest("Usuário ou senha incorretos!");
                }
                else
                    return NotFound("Usuário não encontrado!");
            }
            catch (Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisição! Log:" + ex);
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
                        return BadRequest("Usuário não está logado!");
                    _service.executarLogout(usuarioLogin);
                    return Ok("Usuário deslogado com sucesso!");
                }
                else
                    return NotFound("Usuário não encontrado!");
            }
            catch (Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisição! Log:" + ex);
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
                    return BadRequest("Token não informado.");

                Token tk = new Token();

                var tokenBanco = _baseServiceNotificacao.listarPor(x => x.Token == token);

                if (tokenBanco == null)
                    return BadRequest("Token já foi utilizado!");

                if (tk.ValidarToken(email, token))
                    return Ok("Token válido.");
                else
                    return BadRequest("Token inválido.");
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
                    return BadRequest("Está faltando o token ou o e-mail.");

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
                            return BadRequest("O token já foi utilizado!");
                    }
                    else
                        return BadRequest("Usuário inválido!");
                }
                else
                {
                    notificacao.Token = "";
                    _baseServiceNotificacao.atualizar(notificacao);
                    return BadRequest("Token inválido!");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("ativarUsuario")]
        public IActionResult ativarUsuario([FromBody] Usuario usuario)
        {
            _baseService.atualizar(usuario);
            return Ok("Usuário ativado com sucesso!");
        }

        [NonAction]
        public void enviarEmail(Usuario usuario, string link)
        {
            try
            {
                Destinatario destinatario = new Destinatario(usuario.Pessoa_.Nome, usuario.Pessoa_.Email);

                string token = gerarToken(1440, destinatario.Email);
                string msg = "";
                string assunto = "";

                if (link.ToUpper() == "RECUPERARSENHA")
                    assunto = "Recuperação de senha";

                else if (link.ToUpper() == "ATIVARCONTA")
                    assunto = "Ativação de conta";
                
                msg = montarMensagemAtivacaoConta(destinatario, $"http://localhost:8081/{link}?token={token}&email={usuario.Pessoa_.Email}");

                Notificacao notificacao = new Notificacao(assunto, destinatario.Email, msg, token, usuario);

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
                  <title>Ativação de conta</title>
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
                  <div class=""preheader"">Ative sua conta e comece a usar nossos serviços.</div>

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
                              <p>Estamos muito felizes em tê-lo(a) conosco. Para começar a usar sua conta, é necessário ativá-la clicando no botão abaixo.</p>
                              
                              <table width=""100%"" role=""presentation"">
                                <tr>
                                  <td class=""button-cell"">
                                    <a href=""{linkAtivacao}"" class=""btn"" target=""_blank"" rel=""noopener"">Ativar minha conta</a>
                                  </td>
                                </tr>
                              </table>

                              <div class=""spacer""></div>

                              <p class=""muted"">Se você não criou esta conta, ignore este e-mail. Caso precise de ajuda, entre em contato com nosso suporte.</p>
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
                  <title>Redefinição de senha</title>
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
                  <div class=""preheader"">Redefina sua senha — link válido por 24 horas.</div>

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
                              <p>Olá {destinatario.Nome},</p>
                              <p>Recebemos uma solicitação para redefinir a senha da sua conta. Clique no botão abaixo para criar uma nova senha. Esse link expira em <strong>24 horas</strong> por motivos de segurança.</p>

                              <table width=""100%"" role=""presentation"">
                                <tr>
                                  <td class=""button-cell"">
                                    <a href=""{linkRedefinicao}"" class=""btn"" target=""_blank"" rel=""noopener"">Redefinir minha senha</a>
                                  </td>
                                </tr>
                              </table>

                              <div class=""spacer""></div>

                              <p class=""muted"">Se você não solicitou a redefinição de senha, ignore este e-mail — sua senha permanecerá a mesma. Se precisar de ajuda, responda a este e-mail ou visite nossa página de suporte.</p>
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
