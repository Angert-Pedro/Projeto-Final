using API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.DAL
{
    public class DataContext : DbContext
    {
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Evento> Evento { get; set; }
        public DbSet<Ingresso> Ingresso { get; set; }
        public DbSet<Localizacao> Local { get; set; }
        public DbSet<Pessoa> Pessoa { get; set; }
        private string connectionString = "Data Source=(localdb)\\Local;Initial Catalog=Validator;Integrated Security=True;Encrypt=False;Trust Server Certificate=False;";
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(connectionString).UseLazyLoadingProxies();
        }
    }
}
