using API.DAL;
using API.Models;
using API.Services.Interfaces;
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
    public class NotificacaoService : BaseService<Notificacao>
    {
        private readonly DAL<Notificacao> _dal;
        public NotificacaoService(DAL<Notificacao> dal) : base(dal)
        {
            _dal = dal;
        }
        public static bool EnviarEmail(Notificacao notificacao)
        {
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
                mail.To.Add(notificacao.Destinatario);
                mail.Subject = notificacao.Tipo;
                mail.Body = notificacao.Mensagem;
                mail.IsBodyHtml = true;

                using SmtpClient smtp = new("smtp.gmail.com", 587);
                smtp.Credentials = new NetworkCredential(emailLogin, emailPassword);
                smtp.EnableSsl = true;
                smtp.Send(mail);
                return true;
            } catch(Exception ex)
            {
                throw;
            }
        }

        public void gravarNotificacao(Notificacao notificacao)
        {
            _dal.inserir(notificacao);
        }
    }
}
