const libreria_express=require('express'); /*Se llama a la librería 'express' y se la guarda en una constante creada 
                                            llamada libreria_express*/
const ruta=libreria_express.Router(); /*Se crea una constante llamada ruta, en la que se llama a express 
                                        a través de la constante libreria_express pero usando solamente
                                        su función Router */

ruta.get('/', (req,res)=>{  /*ruta.get escucha una ruta con el método de petición get, cuando se requiera '/', 
                            se responderá el mensaje de send*/
    res.render('index_publico.ejs');
});
ruta.get('/login_publico', (req,res)=>{   /*Son rutas */
    res.render('login_publico.ejs');
});
ruta.get('/principal_cajera', (req,res)=>{   /*Son rutas */
    res.render('principal_cajera.ejs');
});
ruta.get('/cobrar_cajera', (req,res)=>{   /*Son rutas */
    res.render('cobrar_cajera.ejs');
});

module.exports=ruta; /*Este módulo exporta las 'rutas' */