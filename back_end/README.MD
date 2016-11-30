#Back end#

##Requisitos
* mysql-server
* pip
* libmysqlclient-dev

Para instalar estos paquetes ejecute la siguiente orden (hecho en Ubuntu 16.04):

```shell
sudo apt-get install mysql-server python-pip libmysqlclient-dev
```

##Base de datos
Para acceder a la base de datos es necesario tener instalado MySQL. Si es así, escriba las siguientes órdenes (solo la primera vez):

```sql
create database linuxtricks;

CREATE USER 'usuarioLector'@'localhost' IDENTIFIED BY 'usuarioLector';
GRANT ALL PRIVILEGES ON linuxtricks. * TO 'usuarioLector'@'localhost';
FLUSH PRIVILEGES;
```

##Configuración de Django
Para la configuración de django, se debe utilizar el archivo "local_settings(ejemplo).py" ubicado en "linuxtricks/linuxtricks". Este archivo ha sido creado a modo de ejemplo, por favor renombrar el archivo a "local_settings.py" y configurar las credenciales de acceso respectivas del entorno.

##Dependencias de python
Para instalar las dependencias de Python, ejecute la siguiente orden estando ubicado en la carpeta "back_end":

```shell
pip install -r requirements.txt
```

Si está en un entorno de desarrollo, es MUY recomendable realizar la instalación de las dependencias de Python en un entorno virtual.

##Iniciar Django por primera vez
Al estar ubicado en "back_end/linuxtricks", ejecute la siguiente orden para construir la base de datos:

```shell
python manage.py migrate
```

Después de esto puede desplegar Django con la orden:

```shell
python manage.py runserver 9999
```

El cual iniciará el back_end en el puerto 9999. Puede cambiar el puerto por el que desee.

NOTA: Si está en un entorno de producción es MUY recomendable desplegar el back_end en un programa creado para ello (Por ejemplo Tomcat).

##Poblar la base de datos
Luego de realizar todos los pasos anteriores, puede poblar la base de datos con el script de ejemplo "scriptBD.sql" ubicado en la carpeta "archivos" ejecutando la siguiente orden y luego ingresando la contraseña que haya configurado anteriormente:

```shell
mysql -u usuarioLector -p linuxtricks < scriptBD.sql
```
