const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());
//app.use(bodyParser.json());

const connection = mysql.createConnection({ 
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'control_vacunacion',
    password: 'root123'
});

connection.connect(function(error) {
    if (error) {
        throw error;
        
    }else{
        console.log('Conexion exitosa')
    }

    
    app.get("/list",(req,res)=>{
        let dataLoaded = false;
        const sqlQuery = "SELECT * FROM  VACUNAS";
        connection.query(sqlQuery, (error, results) =>{
            if(error){
                console.log(error)
                console.error("Error en la consulta SQL:", error);
            }else{
               // console.log(results);
                res.json(results);
                dataLoaded = true;
            }
         } )
        });


        
        app.get("/listemp",(req,res)=>{
            let dataLoaded = false;
            const sqlQuery = "SELECT * FROM  EMPLEADOS2";
            connection.query(sqlQuery, (error, results) =>{
                if(error){
                    console.log(error)
                    console.error("Error en la consulta SQL:", error);
                }else{
                    console.log(results);
                    res.json(results);
                    dataLoaded = true;
                }
             } )
            });
    

    app.post("/create",(req,res)=>{
        const nombre = req.body.nombre;
        const puesto = req.body.puesto;
        const estado = req.body.estado;
        const vacunaId = req.body.opcionSeleccionada;
        const fecha = req.body.fecha;
        const dosisAdmin = req.body.dosisAdmin;

        connection.query('INSERT INTO EMPLEADO (nombre, idVacuna, puesto_laboral, estado_vacunacion, fecha_primera_dosis) VALUES(?,?,?,?,?)',[nombre, vacunaId, puesto, estado, fecha],
        (error,result)=>{
            if(error){
                console.log(error)
                console.error("Error en la consulta SQL:", error);
            }else{
                console.log("Empleado registrado con exito!")
            }
        });
    })

    app.listen(1000, '0.0.0.0',()=>{
        console.log("Corriendo en el puerto")
    })
    
});