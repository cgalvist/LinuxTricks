#Back end#

##Base de datos
Para acceder a la base de datos es necesario tener instalado MySQL. Si es así, escriba las siguientes órdenes (solo la primera vez):

```sql
create database linuxtricks;

CREATE USER 'usuarioLector'@'localhost' IDENTIFIED BY 'usuarioLector';
GRANT ALL PRIVILEGES ON linuxtricks. * TO 'usuarioLector'@'localhost';
FLUSH PRIVILEGES;
```

##Django
Para la configuración de django, se debe utilizar el archivo "local_settings(ejemplo).py" ubicado en "linuxtricks/linuxtricks". Este archivo ha sido creado a modo de ejemplo, por favor renombrar el archivo a "local_settings.py" y configurar las credenciales de acceso respectivas del entorno.

##Dependencias de python
Para instalar las dependencias de Python, ejecute la siguiente orden:

```bash
pip install -r requirements.txt
```

Si está en un entorno de desarrollo, es MUY recomendable realizar la instalación de las dependencias de Python en un entorno virtual.
