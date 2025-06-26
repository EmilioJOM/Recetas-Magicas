import os

contenido = ""
def sumar_txts(ruta):
    """
    Busca recursivamente todos los archivos .txt en 'ruta' y los concatena en 'archivo_salida'.
    """
    global contenido
    for archivo in os.listdir(ruta):
        path_completo = os.path.join(ruta, archivo)
        if os.path.isfile(path_completo) and (archivo.endswith('.txt') or archivo.endswith('.java') or archivo.endswith('.xml') or archivo.endswith('.properties')):
            contenido += "\n\n" + path_completo
            with open(path_completo, 'r', encoding='utf-8') as f:
                contenido += "\n" + f.read()
        elif os.path.isdir(path_completo):
            sumar_txts(path_completo) 

# ----- PARÁMETROS -----

rutaRepo = "D:/Documentos/UADE/desarrollo_de_aplicaciones_distribuidas/Recetas-Magicas/"
ruta_inicial = rutaRepo + 'API/src/main/java/com/cocinaapp/RecetasMagicas'  # Cambia esto por tu ruta real

# Ejecuta el script
suma_total_path = rutaRepo[:-17]
if os.path.exists(suma_total_path+"\suma_total_API.txt"):
    os.remove(suma_total_path+"\suma_total_API.txt")
sumar_txts(ruta_inicial)
with open(suma_total_path+"\suma_total_API.txt", 'w', encoding='utf-8') as f:
    f.write(contenido)
# print(contenido)
print(f"¡Listo! Todos los .txt han sido sumados en: \"{suma_total_path}\"")
