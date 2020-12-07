const conexion=require('../database');
module.exports={    
    insertar(fecha, idservicio, idusuario, idcliente, idpersonal){
        return new Promise((resolve,reject) =>{
            conexion.query('INSERT INTO venta SET fecha=?, idservicio=?, idusuario=?, idcliente=?, idpersonal=?',[fecha, idservicio, idusuario, idcliente, idpersonal],(err,cliente)=>{
                if (err) reject(err)
                //else if (usuario.length>=1) resolve(usuario[0]);
                else  resolve("si");
            });
        });
    },
    listar(){
        return new Promise((resolve,reject) =>{
            conexion.query('SELECT venta.fecha, servicio.nombre_servicio AS nombre_servicio, servicio.descripcion_servicio, servicio.monto, usuario.nombre AS nombre_usuario, clientes.nombre AS nombre_cliente, clientes.apellido AS apellido_cliente, personal.nombre AS personal_nombre, personal.apellido AS personal_apellido FROM venta INNER JOIN servicio ON servicio.idservicio=venta.idservicio INNER JOIN usuario ON usuario.idusuario=venta.idusuario INNER JOIN clientes ON clientes.idcliente=venta.idcliente INNER JOIN personal ON personal.idpersonal=venta.idpersonal ORDER BY venta.fecha DESC', (err, datos) => {
                if (err) {
                 return reject(err)
                }                
                return resolve(datos)
            })
        });
    },
    lista_fecha(fecha){ 
        //Un listado con el servicio con el cliente y con el usuario        
        return new Promise((resolve,reject) =>{
            conexion.query('SELECT venta.fecha, servicio.nombre_servicio AS nombre_servicio, servicio.descripcion_servicio, servicio.monto, usuario.nombre AS nombre_usuario, clientes.nombre AS nombre_cliente, clientes.apellido AS apellido_cliente, personal.nombre AS personal_nombre, personal.apellido AS personal_apellido FROM venta INNER JOIN servicio ON servicio.idservicio=venta.idservicio INNER JOIN usuario ON usuario.idusuario=venta.idusuario INNER JOIN clientes ON clientes.idcliente=venta.idcliente INNER JOIN personal ON personal.idpersonal=venta.idpersonal WHERE venta.fecha = ? ORDER BY fecha DESC',[fecha], (err, datos) => {
                if (err) {
                 return reject(err)
                }                
                return resolve(datos)
            })
        });
    },
    lista_entrefechas(fecha_inicial, fecha_final){ 
        //Un listado con el servicio con el cliente y con el usuario        
        return new Promise((resolve,reject) =>{
            conexion.query('SELECT venta.fecha, servicio.nombre_servicio AS nombre_servicio, servicio.descripcion_servicio, servicio.monto, usuario.nombre AS nombre_usuario, clientes.nombre AS nombre_cliente, clientes.apellido AS apellido_cliente, personal.nombre AS personal_nombre, personal.apellido AS personal_apellido FROM venta INNER JOIN servicio ON servicio.idservicio=venta.idservicio INNER JOIN usuario ON usuario.idusuario=venta.idusuario INNER JOIN clientes ON clientes.idcliente=venta.idcliente INNER JOIN personal ON personal.idpersonal=venta.idpersonal WHERE venta.fecha BETWEEN ? AND ? ORDER BY fecha DESC',[fecha_inicial, fecha_final], (err, datos) => {
                if (err) {
                 return reject(err)
                }                
                return resolve(datos)
            })
        });
    }
}