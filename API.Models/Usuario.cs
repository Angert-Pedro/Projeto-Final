using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Models
{
    public class Usuario
    {
        public Usuario(){}
        public Usuario(string login, string senha)
        {
            this.Login = login;
            this.Senha = senha;
        }
        public int Id { get; set; }
        public string Login { get; set; } = "";
        public string Senha { get; set; } = "";
        [JsonIgnore]
        public OperacaoLogin Usuario_logado { get; set; } = OperacaoLogin.Logout;
        public virtual Pessoa? Pessoa_ { get; set; }
        public bool Ativo { get; set; }
    }
    public enum OperacaoLogin
    {
        Logout = 0,
        Login = 1
    }
}
