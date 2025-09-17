using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Services.Interfaces
{
    internal interface IUsuarioService
    {
        bool executarLogin(Usuario usuario, string senha);
        void executarLogout(Usuario usuario);
    }
}
