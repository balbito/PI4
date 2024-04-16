import {fileURLToPath} from 'url';
import { dirname } from 'path';

//Imports para sesion y login:
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Crypto functions
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => {
    console.log(`Datos a validar: user-password: ${user.password}, password: ${password}`);
    return bcrypt.compareSync(password, user.password);
}

//JSON Web Tokens JWT functinos:
export const PRIVATE_KEY = "CoderhouseBackendCourseSecretKeyJWT";
/**
 * Generate token JWT usando jwt.sign:
 * Primer argumento: objeto a cifrar dentro del JWT
 * Segundo argumento: La llave privada a firmar el token.
 * Tercer argumento: Tiempo de expiración del token.
 */
export const generateJWToken = (user) => {
    return jwt.sign({user}, PRIVATE_KEY, {expiresIn: '120s'}); //-->Token generado con duracion en segundos.
};

//Util para llamados más controlados de los strategy de Passport.
export const passportCall = (strategy) => {
    return async (req, res, next) => {
        console.log("Entrando a llamar strategy: ");
        console.log(strategy);
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.status(401).send({error: info.messages?info.messages:info.toString()});
            }
            console.log("Usuario obtenido del strategy: ");
            console.log(user);
            req.user = user;
            next();
        })(req, res, next);
    }
};

//Multers

//Profile
const profileStorage = multer.diskStorage({
    // ubicaion del directorio donde voy a guardar los archivos
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/documents/profiles`);
    },
    // el nombre que quiero que tengan los archivos que voy a subir
    filename: function (req, file, cb) {
      // console.log(file);
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  export const profileUploader = multer({
    storage: profileStorage,
    onError: function (err, next) {
      console.log(err);
      next();
    },
  });
  
  //Products
  const productsStorage = multer.diskStorage({
    // ubicaion del directorio donde voy a guardar los archivos
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/documents/products`);
    },
    // el nombre que quiero que tengan los archivos que voy a subir
    filename: function (req, file, cb) {
      // console.log(file);
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  export const productsUploader = multer({
    storage: productsStorage,
    onError: function (err, next) {
      console.log(err);
      next();
    },
  });
  
  //Documents
  const documentsStorage = multer.diskStorage({
    // ubicaion del directorio donde voy a guardar los archivos
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/documents/documents`);
    },
    // el nombre que quiero que tengan los archivos que voy a subir
    filename: function (req, file, cb) {
      // console.log(file);
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  export const documentsUploader = multer({
    storage: documentsStorage,
    onError: function (err, next) {
      console.log(err);
      next();
    },
  });


export default __dirname;

