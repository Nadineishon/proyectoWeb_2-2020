const libreria_express=require('express'); /*Se llama a la librería 'express' y se la guarda en una constante creada 
                                            llamada libreria_express*/
const app=libreria_express(); /*Se crea una constante llamada app, que será la función de express a través de la 
                                constante libreria_express */
const funcion_path=require('path'); /*Se llama a la librería 'path' y se la guarda en una constante creada 
                                        llamada funcion_path*/

app.set('puerto', 4000); /*app.set es una función que permite almacenar variables globales dentro de la aplicación 
                        La variable global es 'puerto' y se le dará el puerto con el que va a funcionar la aplicación, 
                        en éste caso 4000*/

app.listen (app.get('puerto'),()=>{   /*Se habilita el servidor utilizando app.listen, luego se utiliza el puerto 
                                    que se requiere, y se le da una función con =>{} */
    console.log('El servidor está funcionando en el puerto: ', /*Cuando el servidor se suba, se mostrará ese mensaje
                                                                en la consola de Terminal */
    app.get('puerto'));
});

/*En el archivo 'package.json' se pusieron los scripts: 'dev' y 'start'
dev: Cuando el proyecto este en proceso de desarrolo el servidor usará la librería nodemon en la carpeta src,
start: Cuando el proyecto ya esté funcionando se usará node y el objeto app que está en la aplicación*/

app.use(require('./rutas/index_rutas')); /*A través de esto se hará uso del archivo rutas entrando a la carpeta rutas */

app.set('view engine', 'ejs'); /*Con esto se dice que 'ejs' será el manejador de vistas */
app.set('views', funcion_path.join(__dirname, 'vistas')); /*Con esto se indica que todas las vistas (views), se 
                                                            encuentan en la carpeta 'vistas', utilizando la
                                                            función path.join para manejar las rutas de Windows 
                                                            y Linux */
app.use(libreria_express.static(funcion_path.join(__dirname, 'para_estilos')));  