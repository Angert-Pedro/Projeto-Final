using System.Security.Cryptography;
using System.Text;

namespace API.Criptografia
{
    public class CriptografiaAES
    {
        public string CriptografarAES(string valor)
        {
            using var aes = Aes.Create();
            aes.Key = Config.Chave;
            aes.IV = Config.IV;

            var encryptor = aes.CreateEncryptor(aes.Key, aes.IV);
            var textoBytes = Encoding.UTF8.GetBytes(valor);

            byte[] resultado;
            using (var ms = new MemoryStream())
            using (var cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write))
            {
                cs.Write(textoBytes, 0, textoBytes.Length);
                cs.FlushFinalBlock();
                resultado = ms.ToArray();
            }

            return Convert.ToBase64String(resultado);
        }
    }
}
