using API.Models;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace API.Services
{
    public class NotificacaoService
    {
        public static bool EnviarEmail(Notificacao notificacao)
        {
            string linkRedefinicao = "https://localhost:8081/";
            string linkRemocao = "";
            string emailLogin = Environment.GetEnvironmentVariable("EMAIL_LOGIN");
            string emailPassword = Environment.GetEnvironmentVariable("EMAIL_PASSWORD");

            if (string.IsNullOrEmpty(emailLogin) || string.IsNullOrEmpty(emailPassword))
            {
                Console.WriteLine("As variáveis de ambiente EMAIL_LOGIN e/ou EMAIL_PASSWORD não estão definidas.");
                return false;
            }

            try
            {
                using MailMessage mail = new();
                mail.From = new MailAddress(emailLogin);
                mail.To.Add(notificacao.Destinatario.Email);
                mail.Subject = "Redefinição de senha";
                mail.Body = $@"
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
                              <!-- Preheader: aparece nas preview lines do inbox -->
                              <div class=""preheader"">Redefina sua senha — link válido por 24 horas.</div>

                              <table class=""email-wrap"" width=""100%"" cellpadding=""0"" cellspacing=""0"" role=""presentation"">
                                <tr>
                                  <td align=""center"">
                                    <table class=""email-content"" width=""100%"" cellpadding=""0"" cellspacing=""0"" role=""presentation"">

                                      <!-- Header -->
                                      <tr>
                                        <td class=""header"">
                                          <div class=""brand"">SuaEmpresa</div>
                                        </td>
                                      </tr>

                                      <!-- Conteúdo principal -->
                                      <tr>
                                        <td class=""body"">
                                          <h1>Redefina sua senha</h1>
                                          <p>Olá {notificacao.Destinatario.Nome},</p>
                                          <p>Recebemos uma solicitação para redefinir a senha da sua conta. Clique no botão abaixo para criar uma nova senha. Esse link expira em <strong>24 horas</strong> por motivos de segurança.</p>

                                          <table width=""100%"" role=""presentation"">
                                            <tr>
                                              <td class=""button-cell"">
                                                <!-- Botão principal -->
                                                <a href=""{linkRedefinicao}"" class=""btn"" target=""_blank"" rel=""noopener"">Redefinir minha senha</a>
                                              </td>
                                            </tr>
                                          </table>

                                          <p class=""muted"">Se o botão acima não funcionar, copie e cole o link abaixo no seu navegador:</p>
                                          <p class=""code"" style=""word-break:break-all;"">{linkRedefinicao}</p>

                                          <div class=""spacer""></div>

                                          <p class=""muted"">Se você não solicitou a redefinição de senha, ignore este e-mail — sua senha permanecerá a mesma. Se precisar de ajuda, responda a este e-mail ou visite nossa página de suporte.</p>

                                        </td>
                                      </tr>

                                      <!-- Rodapé -->
                                      <tr>
                                        <td class=""footer"" style=""background:#f8fafc"">
                                          <div style=""max-width:520px;margin:0 auto""> 
                                            <p style=""margin:0 0 6px"">SuaEmpresa • Av. Exemplo, 123 • Cidade, Brasil</p>
                                            <p style=""margin:0"">Se quiser remover notificações, <a href=""{linkRemocao}"" class=""small-link"">clique aqui</a>.</p>
                                          </div>
                                        </td>
                                      </tr>

                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </body>
                            </html>";
                mail.IsBodyHtml = true;

                using SmtpClient smtp = new("smtp.gmail.com", 587);
                smtp.Credentials = new NetworkCredential(emailLogin, emailPassword);
                smtp.EnableSsl = true;
                smtp.Send(mail);
                return true;
            } catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
