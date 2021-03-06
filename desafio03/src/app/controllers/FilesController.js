import Files from '../models/Files';

class FilesController {

  async store(req, res) {

    // Gerados por multerConfig
    const { originalname: name, filename: path } = req.file;

    const file = await Files.create({
      name,
      path,
    })
    return res.json(file);
  }
}

export default new FilesController ();
