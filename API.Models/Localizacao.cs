using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Models
{
    public class Localizacao
    {
        public Localizacao(string nome, string endereco, int capacidade)
        {
            this.Nome = nome;
            this.Endereco = endereco;
            this.Capacidade = capacidade;
        }
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Endereco { get; set; }
        public int Capacidade { get; set; }
    }
}
