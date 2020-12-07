const libreria_express=require('express'); /*Se llama a la librería 'express' y se la guarda en una constante creada 
                                            llamada libreria_express*/
const ruta=libreria_express.Router(); /*Se crea una constante llamada ruta, en la que se llama a express 
                                        a través de la constante libreria_express pero usando solamente
                                        su función Router */
const musuario=require('../modelos/usuario');
const mclientes=require('../modelos/clientes');
const mpersonal=require('../modelos/personal');
const mservicio=require('../modelos/servicio');
const mventa=require('../modelos/venta');
var multer  = require('multer');
const path = require('path');
const crypto = require('crypto');

var storage = multer.diskStorage({
    destination: 'src/para_estilos/imagenes/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
   
var upload = multer({ storage: storage })
//var upload = multer({ dest: 'uploads/' })

ruta.get('/', (req,res)=>{  /*ruta.get escucha una ruta con el método de petición get, cuando se requiera '/', 
                            se responderá el mensaje de send*/

    mservicio.listado_general().then(datos=>{        
        res.render('index_publico.ejs',{datos});
    });    
    

});

/*ruta.get('/test', (req,res)=>{
    console.log("-----");
    mclientes.listar().then(datos=>{
        console.log(datos);
        res.json(datos);
    });
})*/

ruta.get('/index_publico', (req,res)=>{   /*Son rutas */
    //proceso 
    res.render('index_publico.ejs');
});
ruta.get('/login_publico', (req,res)=>{   /*Son rutas */
    res.render('login_publico.ejs');
});
ruta.get('/principal_cajera', (req,res)=>{   /*Son rutas */
    res.render('principal_cajera.ejs');
});
ruta.get('/cobrar_cajera', (req,res)=>{   /*Son rutas */
    let serv = [];
    mclientes.listar().then(datos_cliente=>{
        mservicio.listar().then(datos=>{ 
            datos.forEach(function(dato){
                let i=serv.findIndex(x => x.nombre_servicio === dato.nombre_servicio);  
            });
           /* { nombre_servicio:'maquillaje',
              descripcion:[
                  {
                      descripcion_servicio:'de fantasia',
                      monto:'100'
                  }
              ]
            }*/           
            res.render('cobrar_cajera.ejs',{datos_cliente, datos_servicios});
        });
    });    
});

ruta.get('/principal_gerente', (req,res)=>{   /*Son rutas */
    //buscar los cobros de Hoy
    const f = new Date();
    let a = f.getFullYear();
    let m = f.getMonth() + 1;
    if(m<10){
        m = '0'+m;
    }
    let d = f.getDate();
    if(d<10){
        d = '0'+d;
    }
    let fecha = a+'-'+m+'-'+d;
    
    mventa.lista_fecha(fecha).then(datos=>{                
        res.render('principal_gerente.ejs',{datos});
    });        
});

/*
Servicios
***********************************/

ruta.get('/servicios', (req,res)=>{   /*Son rutas */
    mservicio.listar().then(datos=>{        
        res.render('servicios.ejs',{datos});
    });    
});

ruta.post('/servicios', (req,res)=>{
    let {nombre_servicio, descripcion_servicio, monto} = req.body;
    mservicio.insertar(nombre_servicio, descripcion_servicio, monto)
        .then(datos=>{
            res.redirect('/servicios');
    });
});

/*********************************/

/*
Operario
*********************************/
ruta.get('/operario', (req,res)=>{   /*Son rutas */    
    mpersonal.listar().then(datos=>{                
        res.render('registrar_operario.ejs',{datos});
    });    
});

ruta.post('/operario', upload.single('foto'), (req,res)=>{
    const file = req.file; 
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const ci = req.body.ci;
    const direccion = req.body.direccion; 
    const celular = req.body.celular;
    const foto = file.filename;
    mpersonal.insertar(nombre, apellido, ci, direccion, celular, foto)
    .then(datos=>{
        res.redirect('/operario');
    });
});
/*********************************/

/*
 Usuario 
 **********************************
 */

ruta.get('/registrar_usuario', (req,res)=>{   /*Son rutas */    
    musuario.listar().then(datos=>{                
        res.render('registrar_usuario.ejs',{datos});
    });    
});

ruta.post('/usuario', upload.single('foto'), (req,res)=>{
    const usuario = req.body.usuario;
    const nombre = req.body.nombre;
    const pass = req.body.contra;
    const file = req.file;
    const tipo = req.body.tipo;
    /*
    tipo
    1->Gerente
    2->Cajero
    */
    const foto = file.filename;
    const contra = crypto.createHmac('sha1', 'secreto').update(pass).digest('hex');    
    musuario.insertar(usuario, nombre, contra, foto, tipo)
    .then(datos=>{
        res.redirect('/usuario');
    });
});
/*********************************/


/*
 Clientes
 **********************************
 */
ruta.post('/cliente',(req,res)=>{
    const {nombre, apellido, celular} = req.body;
    mclientes.insertar(nombre, apellido, celular)
    .then(datos=>{
        res.redirect('/cobrar_cajera');
    });
});
/*********************************/


ruta.get('/test', (req,res)=>{
    usuario ='';
    pass = 'texto';
    const contra = crypto.createHmac('sha1', 'secreto').update(pass).digest('hex');
    res.send(contra);
});
module.exports=ruta; /*Este módulo exporta las 'rutas' */