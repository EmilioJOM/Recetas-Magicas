from dataclasses import dataclass, field
from typing import *
from enum import Enum
from definicionEntidades import *

recetas = [
    Receta(
        title="Espaguetis a la carbonara",
        description="Un clásico italiano cremoso y sabroso.",
        servings=2,
        tipoId=1,
        dificultad=NivelDificultad.PRINCIPIANTE.name,
        ingredients=[
            {"quantity": 200, "detail": "espaguetis", "unit": "gramos", "observations": ""},
            {"quantity": 100, "detail": "panceta", "unit": "gramos", "observations": "o bacon"},
            {"quantity": 2, "detail": "huevos", "unit": "unidad", "observations": ""},
            {"quantity": 50, "detail": "queso parmesano", "unit": "gramos", "observations": "rallado"},
            {"quantity": 1, "detail": "sal", "unit": "cucharadita", "observations": "a gusto"},
            {"quantity": 1, "detail": "pimienta negra", "unit": "cucharadita", "observations": "a gusto"}
        ],
        steps=[
            {"instruction": "Cocinar los espaguetis según las instrucciones del paquete."},
            {"instruction": "Saltear la panceta en una sartén hasta dorar."},
            {"instruction": "Batir los huevos y mezclar con el queso rallado."},
            {"instruction": "Escurrir la pasta y mezclar rápidamente con la panceta y la mezcla de huevo y queso."},
            {"instruction": "Servir con sal y pimienta a gusto."}
        ],
        main_photo_path="",
        step_photos_paths=[]
    ),
    Receta(
        title="Tarta de espinaca y ricota",
        description="Tarta salada de espinaca y ricota, ideal para almuerzos o cenas.",
        servings=6,
        tipoId=2,
        dificultad=NivelDificultad.INTERMEDIO.name,
        ingredients=[
            {"quantity": 2, "detail": "masa de tarta", "unit": "unidad", "observations": "tapas"},
            {"quantity": 300, "detail": "espinaca", "unit": "gramos", "observations": "fresca o congelada"},
            {"quantity": 250, "detail": "ricota", "unit": "gramos", "observations": ""},
            {"quantity": 1, "detail": "cebolla", "unit": "unidad", "observations": "picada"},
            {"quantity": 2, "detail": "huevos", "unit": "unidad", "observations": ""},
            {"quantity": 50, "detail": "queso rallado", "unit": "gramos", "observations": ""},
            {"quantity": 1, "detail": "sal", "unit": "cucharadita", "observations": "a gusto"},
            {"quantity": 1, "detail": "pimienta", "unit": "cucharadita", "observations": "a gusto"}
        ],
        steps=[
            {"instruction": "Saltear la cebolla hasta que esté transparente."},
            {"instruction": "Agregar la espinaca y cocinar hasta que reduzca."},
            {"instruction": "En un bol, mezclar la espinaca con la ricota, huevos y queso rallado."},
            {"instruction": "Salpimentar a gusto."},
            {"instruction": "Colocar una tapa de tarta en un molde, agregar el relleno y cubrir con la otra tapa."},
            {"instruction": "Hornear a 180°C por 40 minutos o hasta dorar."}
        ],
        main_photo_path="",
        step_photos_paths=[]
    ),
    Receta(
        title="Lomo a la mostaza",
        description="Filetes de lomo con salsa cremosa de mostaza.",
        servings=4,
        tipoId=3,
        dificultad=NivelDificultad.EXPERTO.name,
        ingredients=[
            {"quantity": 4, "detail": "filetes de lomo", "unit": "unidad", "observations": "de vaca"},
            {"quantity": 2, "detail": "cucharadas de mostaza Dijon", "unit": "cucharada", "observations": ""},
            {"quantity": 200, "detail": "crema de leche", "unit": "mililitros", "observations": ""},
            {"quantity": 1, "detail": "cebolla", "unit": "unidad", "observations": "picada"},
            {"quantity": 1, "detail": "ajo", "unit": "diente", "observations": "picado"},
            {"quantity": 1, "detail": "aceite de oliva", "unit": "cucharada", "observations": ""},
            {"quantity": 1, "detail": "sal", "unit": "cucharadita", "observations": "a gusto"},
            {"quantity": 1, "detail": "pimienta", "unit": "cucharadita", "observations": "a gusto"}
        ],
        steps=[
            {"instruction": "Dorar los filetes de lomo en una sartén con aceite de oliva y reservar."},
            {"instruction": "En la misma sartén, saltear la cebolla y el ajo hasta dorar."},
            {"instruction": "Agregar la mostaza y la crema de leche, mezclar bien."},
            {"instruction": "Volver a colocar los filetes en la sartén, cocinar 5 minutos más."},
            {"instruction": "Servir caliente con la salsa por encima."}
        ],
        main_photo_path="",
        step_photos_paths=[]
    ),
    Receta(
        title="Milanesas de berenjena",
        description="Milanesas crocantes y sabrosas, aptas para vegetarianos.",
        servings=4,
        tipoId=2,
        dificultad=NivelDificultad.PRINCIPIANTE.name,
        ingredients=[
            {"quantity": 2, "detail": "berenjenas", "unit": "unidad", "observations": "grandes"},
            {"quantity": 2, "detail": "huevos", "unit": "unidad", "observations": ""},
            {"quantity": 200, "detail": "pan rallado", "unit": "gramos", "observations": ""},
            {"quantity": 1, "detail": "sal", "unit": "cucharadita", "observations": "a gusto"},
            {"quantity": 1, "detail": "pimienta", "unit": "cucharadita", "observations": "a gusto"},
            {"quantity": 1, "detail": "aceite", "unit": "cantidad necesaria", "observations": "para freír"}
        ],
        steps=[
            {"instruction": "Cortar las berenjenas en rodajas de 1 cm."},
            {"instruction": "Salarlas y dejarlas reposar 30 minutos. Secar con papel."},
            {"instruction": "Pasar las rodajas por huevo batido y luego por pan rallado."},
            {"instruction": "Freír en abundante aceite caliente hasta dorar."},
            {"instruction": "Escurrir sobre papel absorbente y servir."}
        ],
        main_photo_path="",
        step_photos_paths=[]
    ),
    Receta(
        title="Galletitas de avena y miel",
        description="Galletas dulces, ideales para merendar.",
        servings=12,
        tipoId=4,
        dificultad=NivelDificultad.PRINCIPIANTE.name,
        ingredients=[
            {"quantity": 150, "detail": "avena arrollada", "unit": "gramos", "observations": ""},
            {"quantity": 100, "detail": "harina", "unit": "gramos", "observations": ""},
            {"quantity": 80, "detail": "miel", "unit": "gramos", "observations": ""},
            {"quantity": 80, "detail": "manteca", "unit": "gramos", "observations": "a temperatura ambiente"},
            {"quantity": 1, "detail": "huevo", "unit": "unidad", "observations": ""},
            {"quantity": 1, "detail": "polvo de hornear", "unit": "cucharadita", "observations": ""}
        ],
        steps=[
            {"instruction": "Batir la manteca con la miel hasta lograr una crema."},
            {"instruction": "Agregar el huevo e integrar."},
            {"instruction": "Sumar la avena, harina y polvo de hornear."},
            {"instruction": "Formar bolitas y aplastar en una placa para horno."},
            {"instruction": "Hornear a 180°C por 12 minutos o hasta dorar."}
        ],
        main_photo_path="",
        step_photos_paths=[]
    ),
    Receta(
        title="Ratatouille clásico",
        description="Guarnición de verduras al horno típica francesa.",
        servings=4,
        tipoId=2,
        dificultad=NivelDificultad.INTERMEDIO.name,
        ingredients=[
            {"quantity": 1, "detail": "berenjena", "unit": "unidad", "observations": "mediana"},
            {"quantity": 1, "detail": "zucchini", "unit": "unidad", "observations": "mediano"},
            {"quantity": 1, "detail": "morrón rojo", "unit": "unidad", "observations": ""},
            {"quantity": 1, "detail": "cebolla", "unit": "unidad", "observations": ""},
            {"quantity": 2, "detail": "tomates", "unit": "unidad", "observations": "grandes"},
            {"quantity": 3, "detail": "dientes de ajo", "unit": "unidad", "observations": ""},
            {"quantity": 2, "detail": "aceite de oliva", "unit": "cucharada", "observations": ""},
            {"quantity": 1, "detail": "sal y pimienta", "unit": "cantidad necesaria", "observations": ""}
        ],
        steps=[
            {"instruction": "Cortar todas las verduras en rodajas finas."},
            {"instruction": "Saltear cebolla y ajo en aceite de oliva."},
            {"instruction": "Disponer las verduras en una fuente intercalando los colores."},
            {"instruction": "Salpimentar y rociar con aceite."},
            {"instruction": "Hornear a 180°C durante 40 minutos."}
        ],
        main_photo_path="",
        step_photos_paths=[]
    ),
    Receta(
        title="Brownie de chocolate",
        description="Postre húmedo y chocolatoso, ideal para acompañar con helado.",
        servings=8,
        tipoId=4,
        dificultad=NivelDificultad.INTERMEDIO.name,
        ingredients=[
            {"quantity": 200, "detail": "chocolate semiamargo", "unit": "gramos", "observations": ""},
            {"quantity": 120, "detail": "manteca", "unit": "gramos", "observations": ""},
            {"quantity": 150, "detail": "azúcar", "unit": "gramos", "observations": ""},
            {"quantity": 3, "detail": "huevos", "unit": "unidad", "observations": ""},
            {"quantity": 80, "detail": "harina", "unit": "gramos", "observations": ""}
        ],
        steps=[
            {"instruction": "Derretir la manteca con el chocolate."},
            {"instruction": "Batir los huevos con el azúcar hasta blanquear."},
            {"instruction": "Mezclar los huevos con el chocolate derretido."},
            {"instruction": "Agregar la harina e integrar suavemente."},
            {"instruction": "Volcar en molde enmantecado y hornear a 180°C por 25 minutos."}
        ],
        main_photo_path="",
        step_photos_paths=[]
    ),
    Receta(
        title="Pollo al curry con arroz",
        description="Pollo especiado en salsa cremosa, acompañado con arroz blanco.",
        servings=4,
        tipoId=3,
        dificultad=NivelDificultad.INTERMEDIO.name,
        ingredients=[
            {"quantity": 500, "detail": "pechuga de pollo", "unit": "gramos", "observations": "en cubos"},
            {"quantity": 1, "detail": "cebolla", "unit": "unidad", "observations": "picada"},
            {"quantity": 2, "detail": "dientes de ajo", "unit": "unidad", "observations": "picados"},
            {"quantity": 1, "detail": "cucharada de curry", "unit": "cucharada", "observations": ""},
            {"quantity": 200, "detail": "crema de leche", "unit": "mililitros", "observations": ""},
            {"quantity": 2, "detail": "arroz blanco", "unit": "taza", "observations": "para acompañar"},
            {"quantity": 2, "detail": "aceite", "unit": "cucharada", "observations": ""},
            {"quantity": 1, "detail": "sal y pimienta", "unit": "cantidad necesaria", "observations": ""}
        ],
        steps=[
            {"instruction": "Saltear cebolla y ajo en aceite."},
            {"instruction": "Agregar el pollo y dorar bien."},
            {"instruction": "Sumar el curry, sal y pimienta. Revolver bien."},
            {"instruction": "Añadir la crema de leche y cocinar 10 minutos."},
            {"instruction": "Servir caliente con arroz blanco cocido."}
        ],
        main_photo_path="",
        step_photos_paths=[]
    ),
    Receta(
        title="Sushi rolls clásicos",
        description="Rolls de sushi con arroz, alga nori, salmón y palta.",
        servings=2,
        tipoId=5,
        dificultad=NivelDificultad.EXPERTO.name,
        ingredients=[
            {"quantity": 2, "detail": "hojas de alga nori", "unit": "unidad", "observations": ""},
            {"quantity": 200, "detail": "arroz para sushi", "unit": "gramos", "observations": "cocido y enfriado"},
            {"quantity": 100, "detail": "salmón fresco", "unit": "gramos", "observations": "en tiras"},
            {"quantity": 1, "detail": "palta", "unit": "unidad", "observations": "en tiras"},
            {"quantity": 2, "detail": "vinagre de arroz", "unit": "cucharada", "observations": ""},
            {"quantity": 1, "detail": "azúcar", "unit": "cucharadita", "observations": ""},
            {"quantity": 1, "detail": "sal", "unit": "cucharadita", "observations": ""}
        ],
        steps=[
            {"instruction": "Mezclar el arroz cocido con vinagre, sal y azúcar."},
            {"instruction": "Extender el arroz sobre la hoja de nori dejando 1 cm libre."},
            {"instruction": "Colocar tiras de salmón y palta en el centro."},
            {"instruction": "Enrollar firmemente ayudándose con una esterilla."},
            {"instruction": "Cortar en porciones con cuchillo mojado."}
        ],
        main_photo_path="",
        step_photos_paths=[]
    ),
    Receta(
        title="Panqueques con dulce de leche",
        description="Dulce clásico, ideal para la merienda o postre.",
        servings=8,
        tipoId=4,
        dificultad=NivelDificultad.PRINCIPIANTE.name,
        ingredients=[
            {"quantity": 2, "detail": "huevos", "unit": "unidad", "observations": ""},
            {"quantity": 250, "detail": "leche", "unit": "mililitros", "observations": ""},
            {"quantity": 100, "detail": "harina", "unit": "gramos", "observations": ""},
            {"quantity": 1, "detail": "manteca", "unit": "cucharada", "observations": "derretida"},
            {"quantity": 1, "detail": "pizca de sal", "unit": "cantidad necesaria", "observations": ""},
            {"quantity": 200, "detail": "dulce de leche", "unit": "gramos", "observations": ""}
        ],
        steps=[
            {"instruction": "Batir huevos, leche, harina, manteca y sal hasta obtener una mezcla líquida."},
            {"instruction": "Calentar sartén, volcar un poco de mezcla y cocinar de ambos lados."},
            {"instruction": "Repetir hasta acabar la mezcla."},
            {"instruction": "Rellenar los panqueques con dulce de leche y enrollar."}
        ],
        main_photo_path="",
        step_photos_paths=[]
    ),
    Receta(
        title="Ensalada César",
        description="Ensalada fresca con pollo, crutones y aderezo César.",
        servings=2,
        tipoId=2,
        dificultad=NivelDificultad.INTERMEDIO.name,
        ingredients=[
            {"quantity": 1, "detail": "pechuga de pollo", "unit": "unidad", "observations": "a la plancha"},
            {"quantity": 1, "detail": "lechuga romana", "unit": "unidad", "observations": ""},
            {"quantity": 50, "detail": "queso parmesano", "unit": "gramos", "observations": "en escamas"},
            {"quantity": 1, "detail": "pan", "unit": "rodaja", "observations": "para crutones"},
            {"quantity": 3, "detail": "anchoas", "unit": "filete", "observations": "opcional"},
            {"quantity": 2, "detail": "huevo", "unit": "unidad", "observations": "para el aderezo"},
            {"quantity": 1, "detail": "aceite de oliva", "unit": "cucharada", "observations": "para el aderezo"},
            {"quantity": 1, "detail": "limón", "unit": "unidad", "observations": "jugo"},
            {"quantity": 1, "detail": "mostaza Dijon", "unit": "cucharadita", "observations": "para el aderezo"},
            {"quantity": 1, "detail": "sal y pimienta", "unit": "cantidad necesaria", "observations": ""}
        ],
        steps=[
            {"instruction": "Cortar la pechuga de pollo en tiras y dorar a la plancha."},
            {"instruction": "Tostar el pan y cortarlo en cubos para hacer crutones."},
            {"instruction": "En un bol, mezclar huevos, aceite, jugo de limón, mostaza, anchoas, sal y pimienta para el aderezo."},
            {"instruction": "Mezclar la lechuga con el pollo, crutones y parmesano."},
            {"instruction": "Agregar el aderezo justo antes de servir."}
        ],
        main_photo_path="",
        step_photos_paths=[]
    )
]




