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
    public class Carteirinha
    {
        [Key]
        public int Id { get; set; }
        public int Pessoa_id { get; set; }
        public string Instituicao { get; set; } = string.Empty;
        public string Curso { get; set; } = string.Empty;
        public string Matricula { get; set; } = string.Empty;
        public string Foto { get; set; } = string.Empty;
        public DateTime DataNascimento { get; set; }
        public string TipoCurso { get; set; } = string.Empty;
        public string EntidadeEmissora { get; set; } = string.Empty;
        public string Nome { get; set; } = string.Empty;
        public string QRCode { get; set; } = string.Empty;
        public string Turno { get; set; } = string.Empty;
        public string CodigoUso { get; set; } = string.Empty;
        public DateTime Validade { get; set; }
    }
}
