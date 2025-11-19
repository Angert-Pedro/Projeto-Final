using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Models
{
    public class Ingresso
    {
        public int Id { get; set; }
        public string Codigo { get; set; }
        public string Tipo { get; set; }

        [Column("evento_id")]
        public int EventoId { get; set; }
        public virtual Evento? Evento_ { get; set; }

        public DateTime Data_Compra { get; set; }
        public bool Valido { get; set; }
        public int Lote { get; set; }
        public decimal Preco_Base { get; set; }
    }
}
