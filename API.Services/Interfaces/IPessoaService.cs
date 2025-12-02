using API.DAL;
using API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace API.Services.Interfaces
{
    public interface IPessoaService
    {
        void Inserir(Evento entidade);
        IEnumerable<Evento> Listar();
        void Atualizar(Evento entidade);
        bool Deletar(Evento entidade);
    }
}