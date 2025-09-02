using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Models
{
    public class Usuario
    {
        public Usuario(){}
        public int Id { get; set; }
        public string Login { get; set; } = "";
        public string Senha { get; set; } = "";
        public virtual Pessoa? Pessoa_ { get; set; }
    }
}
