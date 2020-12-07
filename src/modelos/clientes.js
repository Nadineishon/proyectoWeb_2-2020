const conexion=require('../database');
module.exports={    
    insertar(nombre, apellido, celular){
        return new Promise((resolve,reject) =>{
            conexion.query('INSERT INTO clientes SET nombre=?, apellido=?, celular=?',[nombre, apellido, celular],(err,cliente)=>{
                if (err) reject(err)
                //else if (usuario.length>=1) resolve(usuario[0]);
                else  resolve("si");
            });
        });
    },
    listar(){
        return new Promise((resolve,reject) =>{
            conexion.query('SELECT * FROM clientes ORDER BY nombre ASC', (err, datos) => {
                if (err) {
                 return reject(err)
                }                
                return resolve(datos)
            })
        });
    },
    buscar(id){
        return new Promise((resolve,reject) =>{
            conexion.query('SELECT * FROM clientes WHERE idcliente=?',[id],(err,cliente)=>{
                if (err) reject(err)
                //else if (usuario.length>=1) resolve(usuario[0]);
                return resolve(cliente)
            });
        } )
    }
}