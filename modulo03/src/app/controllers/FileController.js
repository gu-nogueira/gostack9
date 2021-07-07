import File from '../models/File';

class FileController {
  async store(req, res) {

    // Toda vez que o multer (upload) age sobre uma rota, ela disponibiliza req.file ou req.files
    // Vamos realizar uma desestruturação dentro de req.file para pegar: originalname & filename
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    })

    return res.json(file);
  }
}

export default new FileController ();
