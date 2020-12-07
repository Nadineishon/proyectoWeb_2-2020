const conexion=require('../database');
module.exports={    
    insertar(nombre_servicio, descripcion_servicio, monto){
        return new Promise((resolve,reject) =>{
            conexion.query('INSERT INTO servicio SET nombre_servicio=?, descripcion_servicio=?, monto=?',[nombre_servicio, descripcion_servicio, monto],(err,cliente)=>{
                if (err) reject(err)
                //else if (usuario.length>=1) resolve(usuario[0]);
                else  resolve("si");
            });
        });
    },
    listar(){
        return new Promise((resolve,reject) =>{
            conexion.query('SELECT * FROM servicio ORDER BY nombre_servicio ASC', (err, datos) => {
                if (err) {
                 return reject(err)
                }                
                return resolve(datos)
            })
        });
    },
    listado_general(){
        return new Promise((resolve,reject) =>{
            conexion.query('SELECT DISTINCT(nombre_servicio) FROM `servicio` ORDER BY nombre_servicio ASC', (err, datos) => {
                if (err) {
                 return reject(err)
                }                
                return resolve(datos)
            })
        });
    }
}