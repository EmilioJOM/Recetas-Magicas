from typing import *
from enum import Enum
import datosParaPrecargar

@dataclass
class User:
    mail: str
    alias: str
    contraseña: str
    dni: str
    nroTramite: str

class NivelDificultad(Enum):
    PRINCIPIANTE = "PRINCIPIANTE"
    INTERMEDIO = "INTERMEDIO"
    EXPERTO = "EXPERTO"

@dataclass
class Receta:
    title: str
    description: str
    servings: int
    tipoId: int  # Long en backend
    ingredients: List[Dict]  # lista de dicts: quantity, detail, unit, observations
    steps: List[Dict]        # lista de dicts: instruction
    main_photo_path: str
    step_photos_paths: Optional[List[str]] = field(default_factory=list)
    experiencia: NivelDificultad = NivelDificultad.PRINCIPIANTE

@dataclass
class Sede:
    nombre: str
    direccion: str
    coordenadas: str
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
