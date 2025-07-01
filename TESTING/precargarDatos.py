import requests
import json
from dataclasses import dataclass, field
from typing import *
from enum import Enum
import datosParaPrecargar as datos
from definicionEntidades import *
import probarEndpoints

# probarEndpoints.login(probarEndpoints.emilio.mail,probarEndpoints.emilio.contraseña)

for receta in datos.recetas:
    probarEndpoints.testCrearReceta(receta=receta)
for sede in datos.sedes:
    probarEndpoints.subirSede(sede)
for curso in datos.cursos:
    probarEndpoints.subirCurso(curso)
for catedra in datos.cronogramas:
    probarEndpoints.subirCatedra(catedra)

# for filtro in datos.filtros_receta:
#     probarEndpoints.buscarRecetas(filtro)

# for filtro in datos.filtros_cursos:
#     probarEndpoints.buscarCursos(filtro)