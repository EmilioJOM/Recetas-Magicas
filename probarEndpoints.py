from time import sleep
import requests
import json

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
    "password": contraseña
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
    login_url = f"{URL}auth/register"
    login_payload = {
    "email": email,
    "alias": alias,
    "password": contraseña
    }
    r = requests.post(login_url, json=login_payload)
    print("registracion de usuario:", r.status_code, r.text)
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
        title="Pizza napolitana h",
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
#############################################

login(emilio.mail,emilio.contraseña)
# testRecoverPassword(emilio.mail)
# testTarjetas(tarjeta1["nroTarjeta"], tarjeta1["nroSeguridad"], tarjeta1["titular"], tarjeta1["vencimiento"])
# getTarjetas()

testCrearReceta()
recuperarRecetas()

# subirDNI(emilio.dni,emilio.nroTramite)
