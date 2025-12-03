using API.Criptografia;
using API.DAL;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Services.Interfaces
{
    public interface IUsuarioService
    {
        void criarUsuario(Usuario usuario);
        void atualizarUsuario(Usuario usuario);
        bool executarLogin(Usuario usuario, string senha);
        void executarLogout(Usuario usuario);
    }
}
