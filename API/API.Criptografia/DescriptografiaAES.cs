using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace API.Criptografia
{
    public class DescriptografiaAES
    {
        private string DescriptografarAES(string valorCriptografado)
        {
            using var aes = Aes.Create();
            aes.Key = Config.Chave;
            aes.IV = Config.IV;

            var decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
            var textoBytes = Convert.FromBase64String(valorCriptografado);

            byte[] resultado;
            using (var ms = new MemoryStream())
            using (var cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Write))
            {
                cs.Write(textoBytes, 0, textoBytes.Length);
                cs.FlushFinalBlock();
                resultado = ms.ToArray();
            }

            return Encoding.UTF8.GetString(resultado);
        }
    }
}
