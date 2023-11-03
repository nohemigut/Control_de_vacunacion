Esta prueba practica se basa en una app para el control de vacunacion COVID-19, ha sido desarrollado en react native conectado con Expo GO

Para poder ejecutar este proyecto debe tener instalas las dependencias de React Native y Node.js
A su vez debe instalar la aplicación Expo Go en su teléfono Android y conectarse a la misma red inalámbrica que su computadora. 
En Android, use la aplicación Expo Go para escanear el código QR desde la terminal para abrir el proyecto. 


------------------------------------------------------EJECUCION DEL PROYECTO-------------------------------------------------------------------------------------------
1.Una vez preprarado el entorno a utlizar para visualizar el proyecto debe abrir Visual Studio Code, dentro encontrara dos carpetas principales las cuales son "cliente"
y "server", como su nombre lo indica es una carperta para el cliente y otra carpeta para el servidor. 
La carpeta principal de cliente es "App.js"
La carpeta principal del servidor es "index.js"

2.Para levantar los servicios del cliente desde la terminal debe indicar la carpeta cliente usando "cd ./cliente".
Estando dentro de nuestra carpeta cliente ingresa el siguiente comando "npm start" esto es para levantar los servicios de Expo Go.
*Esto iniciará el servidor de desarrollo de Expo y mostrara un código QR el cual debe escanear este código con la aplicación Expo Go 
 en su dispositivo android para ver la aplicación en tiempo real en su dispositivo.


3.Para levantar los servicios del servidor desde la terminal debe indicar la carpeta server usando "cd ./server".
Estando dentro de nuestra carpeta servidor ingresa el siguiente comando "node index.js" esto es para levantar la conexion a nuestra base de datos.
*En este caso se utilizo MySQL Workbench para nuestra base de datos en donde las credenciales son:
     host: 'localhost',
     port: 3306,
     user: 'root',
     database: 'control_vacunacion',
     password: 'root123'
Para tener una conexion exitosa debe asegurar de que tenga el puerto adecuado escuchando la comunicacion

4.Para conectar la clase cliente con la clase servidor se utilizo Axios, en el cual se le paso como parametro de localhost la direccion IP de la computadora en la que
se esta ejecutando el proyecto. Lo cual se tiene:
    http://192.168.1.26:1000/create   ->  http://localhost:puerto/app de la clase index.js

5.Siguiendo estos pasos podra ver y ejecutar el proyecto usando React Native y Expo Go.