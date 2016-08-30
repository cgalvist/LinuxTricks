#! /bin/bash
# -*- ENCODING: UTF-8 -*-

# este script permite compilar y/o correr la aplicación en el emulador
# o en un dispositivo físico

EMULATOR=false
DEVICE=false
BUILD=false

# verificando parametros

echo

if [ $# -lt 1 ]
then
	echo "NOTA: script ejecutado sin parámetros, se ejecutará la configuración predeterminada"
	DEVICE=true
else
	case "$1" in

	-build) echo "NOTA: solo se compilará el proyecto"
		BUILD=true
		;;

	-simulator) echo "NOTA: se ejecutará el programa en el emulador"
		EMULATOR=true
		;;

	-device) echo "NOTA: se ejecutará el programa en el dispositivo"
		DEVICE=true
		;;

	*) echo "ERROR: parámetro inválido"
		exit
		;;

	esac
fi

echo
echo "agregando variable de entorno"
echo

export PATH=${PATH}:/opt/android-sdk-linux/tools/

cd ..

echo

if $BUILD
	then
		echo "...compilando proyecto..."
		echo
		ionic build android	
fi

if $DEVICE
	then
		echo "...compilando proyecto para ejecutarlo en dispositivo..."
		echo
		ionic run android		
fi

if $EMULATOR
	then
		echo "...compilando proyecto para ejecutarlo en emulador..."
		echo
		ionic emulate android	
fi

echo "proceso terminado"
