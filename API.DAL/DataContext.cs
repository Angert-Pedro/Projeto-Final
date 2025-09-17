using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
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
        public DbSet<Localizacao> Localizacao { get; set; }
        public DbSet<Pessoa> Pessoa { get; set; }
        public DbSet<Validacao> Validacao { get; set; }
        private string connectionString = "Data Source=THIAGOBOTAFOFO;Initial Catalog=Validator;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False;";
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(connectionString).UseLazyLoadingProxies();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Pessoa>()
                .HasIndex(p => p.Cpf)
                .IsUnique();
        }

        // Método de diagnóstico: tenta abrir a conexão e lança a exceção em caso de falha
        public void TestarConexao()
        {
            try
            {
                using var conn = new SqlConnection(connectionString);
                conn.Open(); // lança SqlException em caso de problema
                // opcional: conn.Close();
            }
            catch (Exception)
            {
                // rethrow para que quem chamar receba a exceção completa para log
                throw;
            }
        }
    }
}
