const conexion=require('../database');
module.exports={      
    insertar(nombre, apellido, ci, direccion, celular, foto){
        return new Promise((resolve,reject) =>{
            conexion.query('INSERT INTO personal SET nombre=?, apellido=?, ci=?, direccion=?, celular=?, foto=?, estado=1',[nombre, apellido, ci, direccion, celular, foto],(err,personal)=>{
                if (err) reject(err)
                //else if (usuario.length>=1) resolve(usuario[0]);
                else  resolve("si");
            });
        });
    },
    listar(){
        return new Promise((resolve,reject) =>{
            conexion.query('SELECT * FROM personal ORDER BY ci ASC',(err,personal)=>{
                if (err) reject(err)
                //else if (usuario.length>=1) resolve(usuario[0]);
                return resolve(personal)
            });
        } );
    },
    listar_activos(){
        return new Promise((resolve,reject) =>{
            conexion.query('SELECT * FROM personal WHERE estado=1 ORDER BY ci ASC',(err,personal)=>{
                if (err) reject(err)
                //else if (usuario.length>=1) resolve(usuario[0]);
                return resolve(personal)
            });
        } );
    },
    buscar(id){
        return new Promise((resolve,reject) =>{
            conexion.query('SELECT * FROM personal WHERE idpersonal=? ORDER BY ci ASC',[id],(err,personal)=>{
                if (err) reject(err)
                //else if (usuario.length>=1) resolve(usuario[0]);
                return resolve(personal)
            });
        } )
    }
}