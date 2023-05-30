// ## Necesita la dependencia de multer

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Especifica el directorio donde se guardarán los archivos subidos
    const filePath = path.resolve(__dirname, '../public/uploads')
    cb(null, filePath)
  },
  filename: function (req, file, cb) {
    // Genera un nombre de archivo único para evitar conflictos
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    
    const parsedName = path.parse(file.originalname)
    
    const fileNameWithoutExt = parsedName.name.replace(/\s+/g, '-')
    const fileExtension = parsedName.ext
    
    // Establece el nombre del archivo como la marca de tiempo actual más un sufijo único
    const finalName = fileNameWithoutExt + '-' + uniqueSuffix + fileExtension
    cb(null, finalName)
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 15 * 1024 * 1024 // 15mb
  },
  fileFilter: function (req, file, cb) {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif']
    const fileExtension = path.extname(file.originalname)

    if (allowedExtensions.includes(fileExtension)) {
      cb(null, true)
    } else {
      const errorMessage = `Error en extencion del archivo, 
        las extensiones validas son ${allowedExtensions.join(', ')}`
      cb(new Error(errorMessage))
    }
  }
})

app.post('/upload', upload.single('file'), (req, res) => {
  // Accede al archivo cargado mediante req.file
  // Realiza las operaciones necesarias con el archivo
  res.send('Archivo cargado exitosamente')
})
