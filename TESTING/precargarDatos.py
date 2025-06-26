import requests
import json
from dataclasses import dataclass, field
from typing import *
from enum import Enum
import datosParaPrecargar as datos
from definicionEntidades import *


URL = "https://recetas-magicas-api.onrender.com/"
global TOKEN


emilio = User(
    mail = "emijesus21@gmail.com",
    contraseña = "claveSergura123",
    alias = "emilio123",
    dni = "12345678",
    nroTramite = "12345678910"
    )

recetas = datos.receta
sedes = datos.sedes()
cursos = datos.cursos()
catedras = datos.catedras()

def login(user):
    global TOKEN
    login_url = f"{URL}auth/login"
    login_payload = {
    "email": user.email,
    "password": user.contraseña,
    "rememberMe": False
    }
    r = requests.post(login_url, json=login_payload)
    print("Login:", r.status_code, r.text)
    if r.status_code != 200:
        print("Login failed.")
        
    login_data = r.json()
    TOKEN = login_data["token"] 

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

def testCrearReceta(receta):
    id = crearRecetaPaso1(receta)
    print(id)
    crearRecetaPaso2(id, receta)
    crearRecetaPaso3(id, receta)

