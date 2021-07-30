import Files from '../models/Files';

export default async (req, res, next) => {
    if (!req.file) {
      return next();
    }
    // Gerados por multerConfig
    const { originalname: name, filename: path } = req.file;
    const file = await Files.create({
      name,
      path,
    })
    req.fileId = file.id;
    return next();
}
