
const conexion=require('../database');

module.exports={          
    insertar(usuario, nombre, contra, foto, tipo){
        //Password sha1
        return new Promise((resolve,reject) =>{            
            conexion.query('INSERT INTO usuario SET usuario=?, nombre=?, contra=?, foto=?, tipo=?',[usuario, nombre, contra, foto, tipo],(err,personal)=>{
                if (err) reject(err)
                //else if (usuario.length>=1) resolve(usuario[0]);
                else  resolve("si");
            });
        });
    },
    listar(){
        return new Promise((resolve,reject) =>{
            conexion.query('SELECT * FROM usuario ORDER BY nombre ASC',(err,usuario)=>{
                if (err) reject(err)
                //else if (usuario.length>=1) resolve(usuario[0]);
                return resolve(usuario)
            });
        } );
    },
    buscar(id){
        return new Promise((resolve,reject) =>{
            conexion.query('SELECT * FROM usuario WHERE idusuario=?',[id],(err,usuario)=>{
                if (err) reject(err)
                //else if (usuario.length>=1) resolve(usuario[0]);
                return resolve(usuario)
            });
        } )
    }
}