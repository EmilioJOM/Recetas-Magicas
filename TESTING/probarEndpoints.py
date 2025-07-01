from time import sleep
import requests
import json
from dataclasses import dataclass, field
from typing import *
from enum import Enum
from definicionEntidades import *

# URL = "https://recetas-magicas-api.onrender.com/"
URL = "http://localhost:8080/"
global TOKEN
print(URL)
emilio = User(
    mail = "emijesus21@gmail.com",
    contraseña = "claveSergura123",
    alias = "emilio123",
    dni = "12345678",
    nroTramite = "12345678910"
    )

tarjeta1 = {
    "nroTarjeta": "5031755734530604",
    "nroSeguridad": "123",
    "titular": "comprador",
    "vencimiento": "11/30",
    "mailMP" : "test_user_2526826844@testuser.com"
    }

def login(email, contraseña):
    global TOKEN
    login_url = f"{URL}auth/login"
    login_payload = {
    "email": email,
    "password": contraseña,
    "rememberMe": False
    }
    r = requests.post(login_url, json=login_payload)
    print("Login:", r.status_code, r.text)
    if r.status_code != 200:
        print("Login failed.")
        
    login_data = r.json()
    TOKEN = login_data["token"] 

def subirDNI (dni,nroTramite):
    url = f"{URL}user/dni"
    with open(r'D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\burguer.jpg', 'rb') as f1, open(r'D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\burguer.jpg', 'rb') as f2:
        files = {
            'dniFront': f1,
            'dniBack': f2
        }

        data = {
            'dniTramite': nroTramite,
            'dni': dni
        }

        headers = {
            'Authorization': f'Bearer {TOKEN}'
        }

        response = requests.post(url, files=files, data=data, headers=headers)

        print(response.status_code)
        print(response.text)

def validarAlias(email,alias):
    login_url = f"{URL}auth/validate"
    login_payload = {
    "email": email,
    "alias": alias
    }
    r = requests.post(login_url, json=login_payload)
    print("validacion de alias y email:", r.status_code, r.text)
    if r.status_code != 200:
        print("validacion failed.")
        

def validarCodigo(codigo, email):
    login_url = f"{URL}auth/validateCode"
    login_payload = {
    "code": codigo,
    "email": email
    }
    print(login_payload)
    r = requests.post(login_url, json=login_payload)
    print("validacion de codigo:", r.status_code, r.text)
    if r.status_code != 200:
        print("validacion failed.")
        
    
def registrarse(email,contraseña, alias):
    global TOKEN
    login_url = f"{URL}auth/register"
    login_payload = {
    "email": email,
    "alias": alias,
    "password": contraseña
    }
    r = requests.post(login_url, json=login_payload)
    print("registracion de usuario:", r.status_code, r.text)
            
    login_data = r.json()
    TOKEN = login_data["token"] 
    if r.status_code != 200:
        print("validacion failed.")
        

def subRecoverPassword1(email):
    login_url = f"{URL}auth/recoverPassword1"
    login_payload = {
    "email": email
    }
    r = requests.post(login_url, json=login_payload)
    print("se cambio la contraseña del usuario a la ingresada por mail:", r.status_code, r.text)
    if r.status_code != 200:
        print("validacion failed.")
        
def subRecoverPassword2(email, codigo):
    global TOKEN
    login_url = f"{URL}auth/recoverPassword2"
    login_payload = {
    "email": email,
    "code": codigo
    }
    r = requests.post(login_url, json=login_payload)
    print("validacion de codigo:", r.status_code, r.text)
    if r.status_code != 200:
        print("validacion failed.")
    login_data = r.json()
    TOKEN = login_data["token"] 

def newPassword(newPassword):
    login_url = f"{URL}user/changePassword"
    login_payload = {
    "newPassword": newPassword
    }
    headers = {
        'Authorization': f'Bearer {TOKEN}'
    }
    r = requests.put(login_url, json=login_payload, headers=headers)
    print("se cambio la contraseña del usuario exitosamente:", r.status_code, r.text)
    if r.status_code != 200:
        print("validacion failed.")
        

def datosPersonales():
    login_url = f"{URL}user/me"
    headers = {
        'Authorization': f'Bearer {TOKEN}'
    }
    r = requests.get(login_url, headers=headers)
    print("datos del usuario:", r.status_code, r.text)
    if r.status_code != 200:
        print("validacion failed.")
        

def registrarTarjeta(tarjeta1):
    login_url = f"{URL}tarjetas/registrar"
    login_payload = {
    "cardNumber": tarjeta1["nroTarjeta"],
    "cardHolderName": tarjeta1["titular"],
    "expirationDate": tarjeta1["vencimiento"],
    "securityCode": tarjeta1["nroSeguridad"],
    # "emailMP": tarjeta1["mailMP"]
    }
    headers = {
        'Authorization': f'Bearer {TOKEN}'
    }
    r = requests.post(login_url, json=login_payload, headers=headers)
    print("tarjeta registrada:", r.status_code, r.text)
    if r.status_code != 200:
        print("validacion failed.")
        

def getTarjetas():
    login_url = f"{URL}tarjetas"
    headers = {
        'Authorization': f'Bearer {TOKEN}'
    }
    r = requests.get(login_url, headers=headers)
    print("tarjetas registradas:", r.status_code, r.json())
    for i in r.json():
        print(i)
    if r.status_code != 200:
        print("validacion failed.")
        

def DeleteTarjeta(id):
    login_url = f"{URL}tarjetas/{id}"
    headers = {
        'Authorization': f'Bearer {TOKEN}'
    }
    r = requests.delete(login_url, headers=headers)
    print("tarjetas registradas:", r.status_code, r.text)
    if r.status_code != 200:
        print("validacion failed.")
        
def crearRecetaPaso1(receta):
    url = URL + "recipes/crearReceta1"
    data_json = {
        "title": receta.title,
        "description": receta.description,
        "servings": receta.servings,
        "tipoId": receta.tipoId,
        "experienceLevel": receta.experiencia
    }
    files = [
        ('data', ('data', json.dumps(data_json), 'application/json'))
    ]
    if receta.main_photo_path:
        files.append(('mainPhoto', open(receta.main_photo_path, 'rb')))
    headers = {'Authorization': f'Bearer {TOKEN}'}
    response = requests.post(url, files=files, headers=headers)
    print(response.text)
    try:
        resp = response.json()
        print("Paso 1:", response.status_code, resp)
        return int(resp.get("id"))
    except Exception:
        print("Paso 1:", response.status_code, response.text)
        return None
    finally:
        for f in files:
            if hasattr(f[1], 'close'):
                try: f[1].close()
                except: pass
            elif isinstance(f[1], tuple) and hasattr(f[1][1], 'close'):
                try: f[1][1].close()
                except: pass

def crearRecetaPaso2(id, receta):
    url = URL + f"recipes/crearReceta2/{id}"
    data_json = {
        "ingredients": receta.ingredients
    }
    headers = {
        'Authorization': f'Bearer {TOKEN}',
        'Content-Type': 'application/json'
    }
    response = requests.post(url, data=json.dumps(data_json), headers=headers)
    print("Paso 2:", response.status_code, response.text)

def crearRecetaPaso3(id, receta):
    url = URL + f"recipes/crearReceta3/{id}"
    data_json = {
        "steps": [{"instruction": s["instruction"],"foto": s["foto"]} for s in receta.steps]
    }
    files = [
        ('data', ('data', json.dumps(data_json), 'application/json'))
    ]
    for path in receta.step_photos_paths:
        files.append(('stepPhotos', open(path, 'rb')))
    headers = {'Authorization': f'Bearer {TOKEN}'}
    response = requests.post(url, files=files, headers=headers)
    print("Paso 3:", response.status_code, response.text)
    for f in files:
        if hasattr(f[1], 'close'):
            try: f[1].close()
            except: pass
        elif isinstance(f[1], tuple) and hasattr(f[1][1], 'close'):
            try: f[1][1].close()
            except: pass


def recuperarRecetas():
    login_url = f"{URL}recipes/latest/5"
    r = requests.get(login_url)
    print("get RECETAS:", r.status_code, r.text)
    for i in r.json():
        print(i)
    if r.status_code != 200:
        print("validacion failed.")
    
def recuperarUnaReceta(id):
    login_url = f"{URL}recipes/{id}"
    r = requests.get(login_url)
    print("get RECETAS:", r.status_code, r.text)
    for clave, valor in r.json().items():
            print(f"{clave}: {valor}")
    if r.status_code != 200:
        print("validacion failed.")
    
def eliminarReceta(id):
    login_url = f"{URL}recipes/{id}"    
    headers = {'Authorization': f'Bearer {TOKEN}'}
    r = requests.delete(login_url, headers= headers)
    print("del RECETAS:", r.status_code, r.text)

def marcarFavorito(id):
    login_url = f"{URL}recipes/{id}/favorito"
    headers = {'Authorization': f'Bearer {TOKEN}'}
    r = requests.post(login_url, headers= headers)
    print("marcar favorito:", r.status_code, r.text)
    if r.status_code != 200:
        print("validacion failed.")

def desmarcarFavorito(id):
    login_url = f"{URL}recipes/{id}/favorito"
    headers = {'Authorization': f'Bearer {TOKEN}'}
    r = requests.delete(login_url, headers= headers)
    print("marcar favorito:", r.status_code, r.text)
    if r.status_code != 200:
        print("validacion failed.")

def marcarModificado(id):
    login_url = f"{URL}recipes/{id}/modificada"
    headers = {'Authorization': f'Bearer {TOKEN}'}
    r = requests.post(login_url, headers= headers)
    print("marcar modificada:", r.status_code, r.text)
    if r.status_code != 200:
        print("validacion failed.")

def subirSede(sede: Sede):
    login_url = f"{URL}admin/sede"
    login_payload = {
        "nombre": sede.nombre,
        "direccion": sede.direccion,
        "coordenadas": sede.coordenadas,
        "telefono": sede.telefono,
        "mail": sede.mail,
        "whatsapp": sede.whatsapp,
        "tipoBonificacion": sede.tipo_bonificacion,
        "bonificacionCursos": sede.bonificacion_cursos,
        "tipoPromocion": sede.tipo_promocion,
        "promocionCursos": sede.promocion_cursos,
        "capacidadAlumnos":sede.capacidad
        }
    files = [
        ('data', ('data', json.dumps(login_payload), 'application/json'))
    ]
    if sede.main_foto:
        files.append(('mainPhoto', open(sede.main_foto, 'rb')))
    r = requests.post(login_url, files=files)
    print("registracion de sede:", r.status_code, r.text)
    if r.status_code != 200:
        print("validacion failed.")

def subirCurso(curso: Course):
    login_url = f"{URL}admin/courses"

    login_payload = {
        "title": curso.title,
        "description": curso.description,
        "contenidos": curso.contenidos,
        "requirements": curso.requirements,
        "duration": curso.duration,
        "price": curso.price,
        "modality": curso.modality
        }
    files = [
        ('data', ('data', json.dumps(login_payload), 'application/json'))
    ]
    if curso.main_photo:
        files.append(('mainPhoto', open(curso.main_photo, 'rb')))
    r = requests.post(login_url, files=files)
    print("registracion de modelo de curso:", r.status_code, r.text)
    if r.status_code != 200:
        print("validacion failed.")

def subirCatedra(catedra: CronogramaCurso):
    login_url = f"{URL}admin/catedra"
    login_payload = {
        "courseId": catedra.course,
        "sedeId": catedra.sede,
        "ubicacion": catedra.ubicacion,
        "promotion": catedra.promotion,
        "fechaInicio": catedra.fecha_inicio,
        "fechaFin": catedra.fecha_fin,
        "vacantes": catedra.vacantes
        }
    r = requests.post(login_url, json=login_payload)
    print("registracion de catedra:", r.status_code, r.text)
    if r.status_code != 200:
        print("validacion failed.")

def eliminar_usuario_admin(id):
    url = f"{URL}admin/user/{id}"
    r = requests.delete(url)
    print(f"DELETE /admin/user/{id}: {r.status_code} {r.text}")
    if r.status_code != 200:
        print("No se pudo eliminar el usuario.")

def eliminar_curso_admin(id):
    url = f"{URL}admin/course/{id}"
    r = requests.delete(url)
    print(f"DELETE /admin/course/{id}: {r.status_code} {r.text}")
    if r.status_code != 200:
        print("No se pudo eliminar el curso.")

def eliminar_receta_admin(id):
    url = f"{URL}admin/recipe/{id}"
    r = requests.delete(url)
    print(f"DELETE /admin/recipe/{id}: {r.status_code} {r.text}")
    if r.status_code != 200:
        print("No se pudo eliminar la receta.")

def eliminar_sede_admin(id):
    url = f"{URL}admin/sede/{id}"
    r = requests.delete(url)
    print(f"DELETE /admin/sede/{id}: {r.status_code} {r.text}")
    if r.status_code != 200:
        print("No se pudo eliminar la sede.")

def eliminar_catedra_admin(id):
    url = f"{URL}admin/Catedra/{id}"
    r = requests.delete(url)
    print(f"DELETE /admin/Catedra/{id}: {r.status_code} {r.text}")
    if r.status_code != 200:
        print("No se pudo eliminar la catedra.")

def recuperarCursos():
    login_url = f"{URL}courses/latest/5"
    r = requests.get(login_url)
    print("get CURSOS:", r.status_code, r.text)
    for i in r.json():
        print(i)
    if r.status_code != 200:
        print("validacion failed.")

def recuperarUnCurso(id):
    login_url = f"{URL}courses/{id}"
    r = requests.get(login_url)
    print("get CURSO:", r.status_code, r.text)
    for clave, valor in r.json().items():
            print(f"{clave}: {valor}")
    if r.status_code != 200:
        print("validacion failed.")

def recuperarCatedras(id):
    login_url = f"{URL}courses/catedras/{id}"
    headers = {'Authorization': f'Bearer {TOKEN}'}
    r = requests.get(login_url,headers=headers)
    print("get CATEDRAS:", r.status_code, r.text)
    for i in r.json():
        print()
        for clave, valor in i.items():
                print(f"{clave}: {valor}")
        print()
    if r.status_code != 200:
        print("validacion failed.")

def buscarRecetas(filtros):
    url = f"{URL}search/receta"
    headers = {
        "Authorization": f"Bearer {TOKEN}",
        "Content-Type": "application/json"
    }
    response = requests.post(url, headers=headers, data=json.dumps(filtros))
    print(response.status_code, response.text)

def buscarCursos(filtros):
    url = f"{URL}search/curso"
    headers = {
        # "Authorization": f"Bearer {TOKEN}",
        "Content-Type": "application/json"
    }
    response = requests.post(url, headers=headers, data=json.dumps(filtros))
    print(response.status_code, response.text)

def getOrdenCompra(catedra):
    login_url = f"{URL}courses/catedras/{catedra}/ordenCompra"
    headers = {'Authorization': f'Bearer {TOKEN}'}
    r = requests.get(login_url,headers=headers)
    print("GET OrdenCompra:", r.status_code, r.text)
    if r.status_code != 200:
        print("validacion failed.")
    return r.json()

def Inscribirse(catedra):
    login_url = f"{URL}inscripciones/{catedra}"
    headers = {'Authorization': f'Bearer {TOKEN}'}
    r = requests.post(login_url,headers=headers)
    print("POST Inscripcion:", r.status_code, r.text)
    if r.status_code != 200:
        print("validacion failed.")
    return r.json()

def pagar(ordenCompra,isncripcion):
    login_url = f"{URL}pagar/payu"
    headers = {'Authorization': f'Bearer {TOKEN}'}
    payload = {
        "monto": isncripcion["precioFinal"],
        "cardID": ordenCompra["mediosPago"][0]["id"],
        "codigoPago": isncripcion["codigoPago"]
        }
    r = requests.post(login_url,json = payload, headers=headers)
    print("POST Pago:", r.status_code, r.text)
    if r.status_code != 200:
        print("validacion failed.")

def getRecetas():
    login_url = f"{URL}recipes"
    r = requests.get(login_url)
    print("get RECETAS:", r.status_code, r.text)
    for i in r.json():
        print(i)
def getCursos():
    login_url = f"{URL}courses"
    r = requests.get(login_url)
    print("get RECETAS:", r.status_code, r.text)
    for i in r.json():
        print(i)


def CC():
    login_url = f"{URL}pagar/CC"
    headers = {'Authorization': f'Bearer {TOKEN}'}
    r = requests.get(login_url,headers=headers)
    print(f"GET pagar/CC",r.status_code, r.text)

def baja(id):
    login_url = f"{URL}inscripciones/{id}"
    headers = {'Authorization': f'Bearer {TOKEN}'}
    r = requests.delete(login_url,headers=headers)
    print(f"DELETE inscripciones/{id}", r.text)

def rembolso():
    pass

#######################################################################

def testRecoverPassword(email):
    subRecoverPassword1(email)
    subRecoverPassword2(email, input("codigo: "))
    nwpd = input("nueva contraseña: ")
    newPassword(nwpd)
    login(email, nwpd)
    newPassword(emilio.contraseña)

def testRegistrarUsuario(email,alias,contraseña):
    validarAlias(email,alias)
    validarCodigo(input("codigo recibido desde el email"),email)
    registrarse(email,contraseña,alias)

def testTarjetas(tarjeta):
    registrarTarjeta(tarjeta)
    getTarjetas()
    DeleteTarjeta(input("ingresarID: "))

def testCrearReceta(receta):
    mi_receta = receta
    id = crearRecetaPaso1(mi_receta)
    print(id)
    crearRecetaPaso2(id, mi_receta)
    mi_receta = Receta(
        title="Pizza napolitana h",
        description="Pizza casera con masa fina",
        servings=4,
        tipoId="1",
        experiencia= NivelDificultad.PRINCIPIANTE.name,
        ingredients=[
            {
                "quantity": 500,
                "detail": "harina 000",
                "unit": "gramos",
                "observations": ""
            },
            # Más ingredientes...
        ],
        steps=[
            {"instruction": "Mezclar la harina con el agua","foto":True},
            {"instruction": "Amasar hasta obtener una masa suave","foto":False},
            {"instruction": "Cortar cebolla","foto":True},
            # Más pasos...
        ],
        main_photo_path=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\pizza2.jpg",
        step_photos_paths=[
            r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\CortarTomate.jpg",
            r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\CortarCebolla.jpg"
        ]
    )
    crearRecetaPaso3(id, mi_receta)

def testSubirCatedra():
    sede = Sede(
        nombre="Sede Central",
        direccion="Av. Siempre Viva 123",
        coordenadas= "-34.61704597628892, -58.381914081793745",
        capacidad=30,
        telefono="1122334455",
        mail="central@cocina.com",
        whatsapp="1144556677",
        main_foto=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\aula-2-de-cocina-en-mausi.jpg"
    )

    # Crear un curso
    curso = Course(
        title="Pastelería Avanzada",
        description="Curso profesional de pastelería.",
        main_photo=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\6941723985_960d764b2a_o.jpg",
        contenidos=["Masa quebrada", "Tortas clásicas"],
        requirements="Haber completado Pastelería Básica.",
        duration="8 semanas",
        price=30000,
        modality="presencial"
    )

    # Crear un cronograma de curso
    cronograma = CronogramaCurso(
        course=2,
        sede=2,
        ubicacion="Aula 3",
        promotion=20.0,
        fecha_inicio="2024-07-10",
        fecha_fin="2024-08-10",
        vacantes=25
    )
    subirCurso(curso)
    subirSede(sede)
    subirCatedra(cronograma)

def testInscribirme():
    recuperarCursos()
    curso = int(input("ingrese el id del curso a inscribirse: "))
    recuperarUnCurso(curso)
    recuperarCatedras(curso)
    catedra = int(input("ingrese el id de la catedra a inscribirse: "))
    ordenCompra = getOrdenCompra(catedra)
    isncripcion = Inscribirse(catedra)
    pagar(ordenCompra=ordenCompra,isncripcion=isncripcion)


#############################################
# sleep(300)
# testRegistrarUsuario(emilio.mail, emilio.alias, emilio.contraseña)
login(emilio.mail,emilio.contraseña)
# registrarTarjeta(tarjeta1)
# validarAlias(emilio.mail, emilio.alias)
# eliminarReceta(2)
# subirDNI(emilio.dni, emilio.nroTramite)
# testRecoverPassword(emilio.mail)
# testTarjetas(tarjeta1)
# getTarjetas()
# testCrearReceta("dsdsd")
# recuperarRecetas()
# recuperarUnaReceta(12)
# marcarFavorito(2)
# searchUser()
# desmarcarFavorito(2)
# searchUser()
# marcarModificado(1)
# searchUser()
# testSubirCatedra()
recuperarCursos()
# recuperarUnCurso(7)
# recuperarCatedras(5)

# eliminar_usuario_admin(1)
# eliminar_catedra_admin(1)
# eliminar_curso_admin(1)
# eliminar_sede_admin(1)
# eliminar_receta_admin(1)


# subirDNI(emilio.dni,emilio.nroTramite)

# registrarTarjeta(tarjeta1=tarjeta1)
# testInscribirme()
# pagar()
# recuperarRecetas()
# getRecetas()
getCursos()


# CC()