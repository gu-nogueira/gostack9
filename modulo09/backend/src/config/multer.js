// Arquivo de configuração do multer
import multer from 'multer';

// Vamos importar crypto do próprio node
import crypto from 'crypto';

// Vamos importar duas funções de 'path', também nativo do node.
// 1. extname para descobrir a extensão do arquivo baseado no nome
// 2. resolve para percorrer um caminho dentro da aplicação
import { extname, resolve } from 'path';

// Vamos exportar um objeto de configuração, assim como nos outros arquivos da pasta config
export default {
  // Storage define como o multer irá guardar os arquivos, pode ser num CDN (Content Delivery Network) ou no próprio servidor
  // Neste caso vamos guardar os arquivos dentro da pasta da aplicação
  storage: multer.diskStorage({
    // Destino dos arquivos
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    // filename recebe uma função com 3 propriedades: req, file & callback
    // req = request normal do express
    // file = temos todas as informações do arquivo como: nome, tamanho, extensão...
    // cb = função de callback
    // Vamos definir o nome dos arquivos, gerando um código único para cada arquivo, evitando conflitos entre nomes
    filename: (req, file, cb) => {
      // Gera 16 bytes aleatórios
      // Ainda utiliza callback, não suporta async & await
      // No callback, vamos passar como 2nd parametro outra função
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        // Se nãO deu erro, vai chamar o callback
        // null como primeiro parâmetro pois o callback recebe como primeiro parâmetro o erro
        // Aqui estamos transformando os 16bytes de conteúdo aleatório em uma string hexadecimal, concatenado com a extensão original do arquivo
        // Exemplo: 322398f9sgw.png
        return cb(null, res.toString('hex') + extname(file.originalname));
      })
    },
  }),
}
