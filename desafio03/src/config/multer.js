// Native node modules
import crypto from 'crypto';
import { extname, resolve } from 'path';

import multer from 'multer';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      // Gera hash randômico para nome de arquivos
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);
        return cb(null, res.toString('hex') + extname(file.originalname));
      })
    },
  }),
}
