from time import sleep
import requests
import json
from dataclasses import dataclass, field
from typing import List
from typing import Optional

URL = "https://recetas-magicas-api.onrender.com/"
global TOKEN

class User:
    mail = str
    alias = str
    contraseña = str
    dni = str
    nroTramite = str

class Receta:
    def __init__(self, title, description, servings, tipoId, ingredients, steps, main_photo_path, step_photos_paths=None):
        self.title = title
        self.description = description
        self.servings = servings
        self.tipoId = tipoId  # Long en backend
        self.ingredients = ingredients  # lista de dicts: quantity, detail, unit, observations
        self.steps = steps  # lista de dicts: instruction
        self.main_photo_path = main_photo_path
        self.step_photos_paths = step_photos_paths or []

@dataclass
class Sede:
    nombre: str
    direccion: str
    capacidad: int
    telefono: str
    mail: str
    whatsapp: str
    main_foto: str
    tipo_bonificacion: str = None
    bonificacion_cursos: str = None
    tipo_promocion: str = None
    promocion_cursos: str = None

@dataclass
class Course:
    title: str
    description: str
    main_photo: str
    contenidos: List[str] = field(default_factory=list)
    requirements: str = ""
    duration: str = ""
    price: float = 0.0
    modality: str = ""

@dataclass
class CronogramaCurso:
    course: int
    sede: int
    ubicacion: Optional[str] = None
    promotion: Optional[float] = None
    fecha_inicio: Optional[str] = None
    fecha_fin: Optional[str] = None
    vacantes: Optional[int] = None

emilio = User()
emilio.mail = "emijesus21@gmail.com"
emilio.contraseña = "claveSetghyygura123"
emilio.alias = "emilio123"
emilio.dni = "12345678"
emilio.nroTramite = "12345678910"

tarjeta1 = {
    "nroTarjeta": "1234567890",
    "nroSeguridad": "077",
    "titular": "Juan pepito peres alfonsin",
    "vencimiento": "2331"
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
        

def validarCodigo(codigo):
    login_url = f"{URL}auth/validateCode"
    login_payload = {
    "codigo": codigo
    }
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
        

def registrarTarjeta(nroTarjeta,nroSeguridad, titular, vencimiento):
    login_url = f"{URL}tarjetas/registrar"
    login_payload = {
    "cardNumber": nroTarjeta,
    "cardHolderName": titular,
    "expirationDate": vencimiento,
    "securityCode": nroSeguridad
    }
    headers = {
        'Authorization': f'Bearer {TOKEN}'
    }
    r = requests.post(login_url, json=login_payload, headers=headers)
    print("se cambio la contraseña del usuario a la ingresada por mail:", r.status_code, r.text)
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
        "tipoId": receta.tipoId
    }
    files = [
        ('data', ('data', json.dumps(data_json), 'application/json'))
    ]
    if receta.main_photo_path:
        files.append(('mainPhoto', open(receta.main_photo_path, 'rb')))
    headers = {'Authorization': f'Bearer {TOKEN}'}
    response = requests.post(url, files=files, headers=headers)
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
        "steps": [{"instruction": s["instruction"]} for s in receta.steps]
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

def search():
    BASE_URL = f"{URL}search/search"

    # Payload de ejemplo compatible con SearchFilterDto
    payload = {
        "query": None,
        "tipoReceta": None,
        "ingredientesIncluidos": None,
        "ingredientesExcluidos": None,
        "porciones": None,
        "tiempoPreparacionMax": None,
        "autorId": None,
        "favoritos": True,
        "modificados": True,
        "valoracionMinima": None,
        "estado": None,
        "fechaDesde": None,
        "fechaHasta": None,
        "orden": None,
        "modalidad": None,
        "sede": None,
        "precioMax": None,
        "vacantesMin": None,
        "misCursos": None
    }

    # Realizar la petición POST
    response = requests.post(BASE_URL, json=payload)

    # Verificar respuesta
    if response.status_code == 200:
        resultados = response.json()
        for r in resultados:
            print(f"{r['tipo'].capitalize()}: {r['titulo']} - {r['descripcion']}")
    else:
        print("Error:", response.status_code)
        print(response.text)
def searchUser():
    BASE_URL = f"{URL}search/search/user"

    # Payload de ejemplo compatible con SearchFilterDto
    payload = {
        "query": None,
        "tipoReceta": None,
        "ingredientesIncluidos": None,
        "ingredientesExcluidos": None,
        "porciones": None,
        "tiempoPreparacionMax": None,
        "autorId": None,
        "favoritos": True,
        "modificados": True,
        "valoracionMinima": None,
        "estado": None,
        "fechaDesde": None,
        "fechaHasta": None,
        "orden": None,
        "modalidad": None,
        "sede": None,
        "precioMax": None,
        "vacantesMin": None,
        "misCursos": None
    }

    headers = {'Authorization': f'Bearer {TOKEN}'}

    # Realizar la petición POST
    response = requests.post(BASE_URL, json=payload, headers=headers)

    # Verificar respuesta
    if response.status_code == 200:
        resultados = response.json()
        for r in resultados:
            print(f"{r['tipo'].capitalize()}: {r['titulo']} - {r['descripcion']}")
    else:
        print("Error:", response.status_code)
        print(response.text)


def subirSede(sede: Sede):
    login_url = f"{URL}admin/sede"
    login_payload = {
        "nombre": sede.nombre,
        "direccion": sede.direccion,
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
    validarCodigo(input("codigo recibido desde el email"))
    registrarse(email,contraseña,alias)

def testTarjetas(nroTarjeta,nroSeguridad, titular, vencimiento):
    registrarTarjeta(nroTarjeta,nroSeguridad, titular, vencimiento)
    getTarjetas()
    DeleteTarjeta(input("ingresarID: "))

def testCrearReceta():
    mi_receta = Receta(
        title="Pizza napolitana a",
        description="Pizza casera con masa fina",
        servings=4,
        tipoId=1,  # Debe existir ese tipo en tu DB
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
            {"instruction": "Mezclar la harina con el agua"},
            {"instruction": "Amasar hasta obtener una masa suave"},
            # Más pasos...
        ],
        main_photo_path=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\pizza2.jpg",
        step_photos_paths=[
            r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\CortarTomate.jpg",
            # Más imágenes si tenés más pasos
        ]
    )
    id = crearRecetaPaso1(mi_receta)
    print(id)
    crearRecetaPaso2(id, mi_receta)
    crearRecetaPaso3(id, mi_receta)

def testSubirCatedra():
    sede = Sede(
        nombre="Sede Central",
        direccion="Av. Siempre Viva 123",
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
        course=1,
        sede=1,
        ubicacion="Aula 3",
        promotion=20.0,
        fecha_inicio="2024-07-10",
        fecha_fin="2024-08-10",
        vacantes=25
    )
    subirCurso(curso)
    subirSede(sede)
    subirCatedra(cronograma)

#############################################
# sleep(300)
testRegistrarUsuario(emilio.mail, emilio.alias, emilio.contraseña)
# login(emilio.mail,emilio.contraseña)
# validarAlias(emilio.mail, emilio.alias)
# eliminarReceta(2)
# subirDNI(emilio.dni, emilio.nroTramite)
# testRecoverPassword(emilio.mail)
# testTarjetas(tarjeta1["nroTarjeta"], tarjeta1["nroSeguridad"], tarjeta1["titular"], tarjeta1["vencimiento"])
# getTarjetas()
testCrearReceta()
# recuperarRecetas()
# recuperarUnaReceta(1)
# marcarFavorito(2)
# searchUser()
# desmarcarFavorito(2)
# searchUser()
# marcarModificado(1)
# searchUser()
# testSubirCatedra()

# eliminar_usuario_admin(1)
# eliminar_catedra_admin(1)
# eliminar_curso_admin(1)
# eliminar_sede_admin(1)
# eliminar_receta_admin(1)


# subirDNI(emilio.dni,emilio.nroTramite)
