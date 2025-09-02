using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Models
{
    public class Ingresso
    {
        public int Id { get; set; }
        public int Codigo { get; set; }
        public string? Tipo { get; set; }
        public virtual Evento Evento { get; set; }
        public DateTime DataCompra { get; set; }
        public bool Valido { get; set; }
        public int Lote { get; set; }
        public decimal PrecoBase { get; set; }
    }
}
