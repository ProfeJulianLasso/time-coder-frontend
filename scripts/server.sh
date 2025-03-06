#!/bin/bash

# Aseguramos que el script pueda ejecutarse
chmod +x "$0"

# Función para limpiar al salir
cleanup() {
    pkill -f "bun run dev"
    exit 0
}

# Registrar la función de limpieza para señales de terminación
trap cleanup SIGINT SIGTERM

# Iniciar el servidor
bun run dev &

# Esperar a que el proceso termine
wait
