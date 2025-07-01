from dataclasses import dataclass, field
from typing import *
from enum import Enum
from definicionEntidades import *

recetas = [
    Receta(
        title="Espaguetis a la carbonara",
        description="Un clásico italiano cremoso y sabroso.",
        servings=2,
        tipoId="1",
        experiencia=NivelDificultad.PRINCIPIANTE.name,
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
        main_photo_path=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\pizza2.jpg",
        step_photos_paths=[]
    ),
    Receta(
        title="Tarta de espinaca y ricota",
        description="Tarta salada de espinaca y ricota, ideal para almuerzos o cenas.",
        servings=6,
        tipoId="2",
        experiencia=NivelDificultad.INTERMEDIO.name,
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
        main_photo_path=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\pizza2.jpg",
        step_photos_paths=[]
    ),
    Receta(
        title="Lomo a la mostaza",
        description="Filetes de lomo con salsa cremosa de mostaza.",
        servings=4,
        tipoId="3",
        experiencia=NivelDificultad.EXPERTO.name,
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
        main_photo_path=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\pizza2.jpg",
        step_photos_paths=[]
    ),
    Receta(
        title="Milanesas de berenjena",
        description="Milanesas crocantes y sabrosas, aptas para vegetarianos.",
        servings=4,
        tipoId="2",
        experiencia=NivelDificultad.PRINCIPIANTE.name,
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
        main_photo_path=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\pizza2.jpg",
        step_photos_paths=[]
    ),
    Receta(
        title="Galletitas de avena y miel",
        description="Galletas dulces, ideales para merendar.",
        servings=12,
        tipoId="4",
        experiencia=NivelDificultad.PRINCIPIANTE.name,
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
        main_photo_path=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\pizza2.jpg",
        step_photos_paths=[]
    ),
    Receta(
        title="Ratatouille clásico",
        description="Guarnición de verduras al horno típica francesa.",
        servings=4,
        tipoId="2",
        experiencia=NivelDificultad.INTERMEDIO.name,
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
        main_photo_path=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\pizza2.jpg",
        step_photos_paths=[]
    ),
    Receta(
        title="Brownie de chocolate",
        description="Postre húmedo y chocolatoso, ideal para acompañar con helado.",
        servings=8,
        tipoId="4",
        experiencia=NivelDificultad.INTERMEDIO.name,
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
        main_photo_path=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\pizza2.jpg",
        step_photos_paths=[]
    ),
    Receta(
        title="Pollo al curry con arroz",
        description="Pollo especiado en salsa cremosa, acompañado con arroz blanco.",
        servings=4,
        tipoId="3",
        experiencia=NivelDificultad.INTERMEDIO.name,
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
        main_photo_path=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\pizza2.jpg",
        step_photos_paths=[]
    ),
    Receta(
        title="Sushi rolls clásicos",
        description="Rolls de sushi con arroz, alga nori, salmón y palta.",
        servings=2,
        tipoId="5",
        experiencia=NivelDificultad.EXPERTO.name,
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
        main_photo_path=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\pizza2.jpg",
        step_photos_paths=[]
    ),
    Receta(
        title="Panqueques con dulce de leche",
        description="Dulce clásico, ideal para la merienda o postre.",
        servings=8,
        tipoId="4",
        experiencia=NivelDificultad.PRINCIPIANTE.name,
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
        main_photo_path=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\pizza2.jpg",
        step_photos_paths=[]
    ),
    Receta(
        title="Ensalada César",
        description="Ensalada fresca con pollo, crutones y aderezo César.",
        servings=2,
        tipoId="2",
        experiencia=NivelDificultad.INTERMEDIO.name,
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
        main_photo_path=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\pizza2.jpg",
        step_photos_paths=[]
    )
]

sedes = [
    Sede(
        nombre="Sede Central Palermo",
        direccion="Av. Santa Fe 3500, CABA",
        coordenadas="-34.5895,-58.4206",
        capacidad=120,
        telefono="+54 11 4899-1122",
        mail="palermo@recetasmagicas.com",
        whatsapp="+54 9 11 6000-1122",
        main_foto=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\pizza2.jpg",
        tipo_bonificacion="Descuento",
        bonificacion_cursos="10% en cursos de pastelería",
        tipo_promocion=None,
        promocion_cursos=None
    ),
    Sede(
        nombre="Sede Belgrano",
        direccion="Juramento 2400, CABA",
        coordenadas="-34.5591,-58.4573",
        capacidad=90,
        telefono="+54 11 4702-3344",
        mail="belgrano@recetasmagicas.com",
        whatsapp="+54 9 11 4500-3344",
        main_foto=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\pizza2.jpg",
        tipo_bonificacion=None,
        bonificacion_cursos=None,
        tipo_promocion="2x1",
        promocion_cursos="2x1 en cursos de cocina internacional"
    ),
    Sede(
        nombre="Sede La Plata",
        direccion="Calle 7 N° 850, La Plata, Buenos Aires",
        coordenadas="-34.9214,-57.9544",
        capacidad=70,
        telefono="+54 221 444-5678",
        mail="laplata@recetasmagicas.com",
        whatsapp="+54 9 221 555-6789",
        main_foto=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\pizza2.jpg",
        tipo_bonificacion="Beca parcial",
        bonificacion_cursos="50% para estudiantes universitarios",
        tipo_promocion=None,
        promocion_cursos=None
    ),
    Sede(
        nombre="Sede Córdoba Centro",
        direccion="Av. Colón 500, Córdoba",
        coordenadas="-31.4135,-64.1811",
        capacidad=100,
        telefono="+54 351 500-1122",
        mail="cordoba@recetasmagicas.com",
        whatsapp="+54 9 351 400-1122",
        main_foto=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\pizza2.jpg",
        tipo_bonificacion=None,
        bonificacion_cursos=None,
        tipo_promocion=None,
        promocion_cursos=None
    ),
    Sede(
        nombre="Sede Mar del Plata",
        direccion="Av. Colón 2300, Mar del Plata, Buenos Aires",
        coordenadas="-38.0023,-57.5575",
        capacidad=80,
        telefono="+54 223 477-9090",
        mail="mardelplata@recetasmagicas.com",
        whatsapp="+54 9 223 588-9090",
        main_foto=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\pizza2.jpg",
        tipo_bonificacion="Descuento",
        bonificacion_cursos="15% en cursos de cocina saludable",
        tipo_promocion="Regalo",
        promocion_cursos="Set de utensilios para inscriptos"
    )
]

cursos = [
    Course(
        title="Panadería Artesanal",
        description="Aprendé a preparar panes clásicos y especiales con técnicas de panadería artesanal.",
        main_photo=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\pizza2.jpg",
        contenidos=[
            "Historia y tipos de pan",
            "Técnicas de amasado",
            "Fermentación y levado",
            "Pan de campo, baguette y focaccia",
            "Panificados integrales"
        ],
        requirements="No se requieren conocimientos previos.",
        duration="8 clases de 2 horas",
        price=35000.0,
        modality="Presencial"
    ),
    Course(
        title="Cocina Vegana Creativa",
        description="Recetas innovadoras y saludables sin ingredientes de origen animal.",
        main_photo=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\pizza2.jpg",
        contenidos=[
            "Bases de la cocina vegana",
            "Sustitutos vegetales",
            "Entradas, platos principales y postres",
            "Fermentos y quesos veganos",
            "Planificación de menús"
        ],
        requirements="Apto para todo público.",
        duration="6 clases de 2 horas",
        price=30000.0,
        modality="Presencial y online"
    ),
    Course(
        title="Pastelería Profesional",
        description="Formación integral en técnicas de pastelería clásica y moderna.",
        main_photo=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\pizza2.jpg",
        contenidos=[
            "Masas base: sableé, hojaldre, choux",
            "Tortas y entremets",
            "Decoración y glasé",
            "Bombonería y petit fours",
            "Pastelería internacional"
        ],
        requirements="Conocimientos básicos de cocina recomendados.",
        duration="12 clases de 3 horas",
        price=65000.0,
        modality="Presencial"
    ),
    Course(
        title="Cocina Italiana de Autor",
        description="Recorrido por las recetas tradicionales y modernas de la cocina italiana.",
        main_photo=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\pizza2.jpg",
        contenidos=[
            "Pasta fresca y seca",
            "Risottos y salsas tradicionales",
            "Antipasti y focaccias",
            "Postres italianos: tiramisú, panna cotta",
            "Platos regionales"
        ],
        requirements="No se requieren conocimientos previos.",
        duration="8 clases de 2 horas y media",
        price=42000.0,
        modality="Presencial"
    ),
    Course(
        title="Sushi y Cocina Asiática",
        description="Técnicas básicas y avanzadas de sushi, woks y sabores de Asia.",
        main_photo=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\pizza2.jpg",
        contenidos=[
            "Sushi rolls y nigiris",
            "Preparación de arroz",
            "Salsas y marinados asiáticos",
            "Wok y salteados",
            "Postres orientales"
        ],
        requirements="Tener cuchillo propio recomendable.",
        duration="5 clases de 2 horas",
        price=50000.0,
        modality="Presencial"
    ),
    Course(
        title="Cocina Saludable para el Día a Día",
        description="Ideas, técnicas y recetas para comer rico y sano sin complicaciones.",
        main_photo=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\pizza2.jpg",
        contenidos=[
            "Ensaladas y bowls",
            "Legumbres y cereales integrales",
            "Snacks saludables",
            "Menús semanales y meal prep",
            "Reemplazos nutritivos"
        ],
        requirements="Para todas las edades.",
        duration="4 clases de 2 horas",
        price=22000.0,
        modality="Online"
    ),
    Course(
        title="Repostería sin TACC",
        description="Recetas dulces libres de gluten, ideales para celíacos y todo público.",
        main_photo=r"D:\Documentos\UADE\desarrollo_de_aplicaciones_distribuidas\Recetas-Magicas\APP\assets\pizza2.jpg",
        contenidos=[
            "Bases de la repostería sin TACC",
            "Tortas y muffins",
            "Galletitas y budines",
            "Decoración sin gluten",
            "Control de contaminación cruzada"
        ],
        requirements="No se requiere experiencia previa.",
        duration="6 clases de 1 hora y media",
        price=32000.0,
        modality="Online"
    ),
]

cronogramas = [
    CronogramaCurso(course=1, sede=1, ubicacion="Aula Panadería", promotion=10.0, fecha_inicio="2024-08-05", fecha_fin="2024-08-28", vacantes=25),
    CronogramaCurso(course=2, sede=2, ubicacion="Cocina Grande", promotion=0, fecha_inicio="2024-09-01", fecha_fin="2024-09-30", vacantes=18),
    CronogramaCurso(course=3, sede=3, ubicacion="Sala 1", promotion=15.0, fecha_inicio="2024-10-15", fecha_fin="2024-11-26", vacantes=15),
    CronogramaCurso(course=4, sede=4, ubicacion="Aula 2", promotion=5.0, fecha_inicio="2024-07-10", fecha_fin="2024-08-30", vacantes=20),
    CronogramaCurso(course=5, sede=5, ubicacion="Salón Oriental", promotion=0, fecha_inicio="2024-11-02", fecha_fin="2024-12-07", vacantes=12),
    CronogramaCurso(course=6, sede=1, ubicacion="Aula Saludable", promotion=20.0, fecha_inicio="2024-09-05", fecha_fin="2024-10-01", vacantes=30),
    CronogramaCurso(course=7, sede=2, ubicacion="Aula 4", promotion=0, fecha_inicio="2024-08-20", fecha_fin="2024-09-24", vacantes=10),
    CronogramaCurso(course=2, sede=4, ubicacion="Cocina Experimental", promotion=12.5, fecha_inicio="2024-07-18", fecha_fin="2024-08-22", vacantes=16),
    CronogramaCurso(course=3, sede=1, ubicacion="Sala Pastelería", promotion=0, fecha_inicio="2024-10-10", fecha_fin="2024-11-25", vacantes=20),
    CronogramaCurso(course=4, sede=5, ubicacion="Aula Italiana", promotion=10.0, fecha_inicio="2024-07-05", fecha_fin="2024-08-15", vacantes=14),
    CronogramaCurso(course=5, sede=3, ubicacion="Sala Sushi", promotion=0, fecha_inicio="2024-09-10", fecha_fin="2024-10-08", vacantes=8),
    CronogramaCurso(course=1, sede=4, ubicacion="Aula Panadería", promotion=0, fecha_inicio="2024-11-20", fecha_fin="2024-12-15", vacantes=22),
    CronogramaCurso(course=6, sede=2, ubicacion="Aula 7", promotion=25.0, fecha_inicio="2024-08-01", fecha_fin="2024-08-31", vacantes=18),
    CronogramaCurso(course=7, sede=3, ubicacion="Aula Sin TACC", promotion=15.0, fecha_inicio="2024-10-01", fecha_fin="2024-11-05", vacantes=10),
    CronogramaCurso(course=2, sede=5, ubicacion="Cocina Vegana", promotion=0, fecha_inicio="2024-09-03", fecha_fin="2024-09-28", vacantes=12),
    CronogramaCurso(course=3, sede=5, ubicacion="Sala 2", promotion=5.0, fecha_inicio="2024-11-01", fecha_fin="2024-12-12", vacantes=12),
    CronogramaCurso(course=4, sede=3, ubicacion="Aula 6", promotion=0, fecha_inicio="2024-08-12", fecha_fin="2024-09-19", vacantes=20),
    CronogramaCurso(course=5, sede=2, ubicacion="Salón Oriente", promotion=10.0, fecha_inicio="2024-07-22", fecha_fin="2024-08-22", vacantes=10),
    CronogramaCurso(course=6, sede=4, ubicacion="Aula Salud", promotion=0, fecha_inicio="2024-10-08", fecha_fin="2024-10-29", vacantes=25),
    CronogramaCurso(course=7, sede=1, ubicacion="Aula Celíacos", promotion=0, fecha_inicio="2024-09-14", fecha_fin="2024-10-19", vacantes=16),
]

filtros_receta = [

    # 1. Buscar por texto libre que aparece en el título
    {
        "query": "napolitana",
        "tipoReceta": None,
        "ingredientesIncluidos": [],
        "ingredientesExcluidos": [],
        "porciones": None,
        "autorId": None,
        "favoritos": False,
        "modificados": False,
        "valoracionMinima": None,
        "estado": "APROBADA",
        "fechaDesde": None,
        "fechaHasta": None
    },

    # 2. Buscar por tipo de receta "Postre" y porciones = 8
    {
        "query": None,
        "tipoReceta": "Postre",
        "ingredientesIncluidos": [],
        "ingredientesExcluidos": [],
        "porciones": 8,
        "autorId": None,
        "favoritos": False,
        "modificados": False,
        "valoracionMinima": None,
        "estado": "APROBADA",
        "fechaDesde": None,
        "fechaHasta": None
    },

    # 3. Buscar recetas que contengan palta como ingrediente
    {
        "query": None,
        "tipoReceta": None,
        "ingredientesIncluidos": ["palta"],
        "ingredientesExcluidos": [],
        "porciones": None,
        "autorId": None,
        "favoritos": False,
        "modificados": False,
        "valoracionMinima": None,
        "estado": "APROBADA",
        "fechaDesde": None,
        "fechaHasta": None
    },

    # 4. Buscar recetas que NO contengan ajo
    {
        "query": None,
        "tipoReceta": None,
        "ingredientesIncluidos": [],
        "ingredientesExcluidos": ["ajo"],
        "porciones": None,
        "autorId": None,
        "favoritos": False,
        "modificados": False,
        "valoracionMinima": None,
        "estado": "APROBADA",
        "fechaDesde": None,
        "fechaHasta": None
    },

    # 5. Buscar recetas con pollo y valoración mínima 4.0
    {
        "query": "pollo",
        "tipoReceta": None,
        "ingredientesIncluidos": [],
        "ingredientesExcluidos": [],
        "porciones": None,
        "autorId": None,
        "favoritos": False,
        "modificados": False,
        "valoracionMinima": 4.0,
        "estado": "APROBADA",
        "fechaDesde": None,
        "fechaHasta": None
    },

    # 6. Buscar recetas publicadas dentro de un rango de fechas
    {
        "query": None,
        "tipoReceta": None,
        "ingredientesIncluidos": [],
        "ingredientesExcluidos": [],
        "porciones": None,
        "autorId": None,
        "favoritos": False,
        "modificados": False,
        "valoracionMinima": None,
        "estado": "APROBADA",
        "fechaDesde": "2024-01-01",
        "fechaHasta": "2025-01-01"
    },

    # 7. Buscar recetas vegetarianas con berenjena, sin carne
    {
        "query": "berenjena",
        "tipoReceta": "Vegetariano",
        "ingredientesIncluidos": ["berenjena"],
        "ingredientesExcluidos": ["carne"],
        "porciones": 4,
        "autorId": None,
        "favoritos": False,
        "modificados": False,
        "valoracionMinima": None,
        "estado": "APROBADA",
        "fechaDesde": None,
        "fechaHasta": None
    },

    # 8. Buscar todas las recetas creadas por autor ID 1
    {
        "query": None,
        "tipoReceta": None,
        "ingredientesIncluidos": [],
        "ingredientesExcluidos": [],
        "porciones": None,
        "autorId": 1,
        "favoritos": False,
        "modificados": False,
        "valoracionMinima": None,
        "estado": None,
        "fechaDesde": None,
        "fechaHasta": None
    },

    # 9. Buscar recetas guardadas como favoritas (requiere token)
    {
        "query": None,
        "tipoReceta": None,
        "ingredientesIncluidos": [],
        "ingredientesExcluidos": [],
        "porciones": None,
        "autorId": None,
        "favoritos": True,
        "modificados": False,
        "valoracionMinima": None,
        "estado": None,
        "fechaDesde": None,
        "fechaHasta": None
    },

    # 10. Buscar recetas modificadas por el usuario (requiere token)
    {
        "query": None,
        "tipoReceta": None,
        "ingredientesIncluidos": [],
        "ingredientesExcluidos": [],
        "porciones": None,
        "autorId": None,
        "favoritos": False,
        "modificados": True,
        "valoracionMinima": None,
        "estado": None,
        "fechaDesde": None,
        "fechaHasta": None
    }
]

filtros_cursos = [

    # 1. Buscar por texto libre en título
    {
        "query": "panadería",
        "modalidad": None,
        "precioMinimo": None,
        "precioMaximo": None,
        "duracion": None,
        "contenidos": []
    },

    # 2. Buscar por modalidad exacta
    {
        "query": None,
        "modalidad": "Online",
        "precioMinimo": None,
        "precioMaximo": None,
        "duracion": None,
        "contenidos": []
    },

    # 3. Buscar por rango de precio
    {
        "query": None,
        "modalidad": None,
        "precioMinimo": 30000.0,
        "precioMaximo": 50000.0,
        "duracion": None,
        "contenidos": []
    },

    # 4. Buscar por duración exacta
    {
        "query": None,
        "modalidad": None,
        "precioMinimo": None,
        "precioMaximo": None,
        "duracion": "6 clases de 2 horas",
        "contenidos": []
    },

    # 5. Buscar por contenido específico (curso que mencione "pasta fresca")
    {
        "query": None,
        "modalidad": None,
        "precioMinimo": None,
        "precioMaximo": None,
        "duracion": None,
        "contenidos": ["Pasta fresca y seca"]
    },

    # 6. Buscar por combinación de modalidad y precio
    {
        "query": None,
        "modalidad": "Presencial",
        "precioMinimo": 40000.0,
        "precioMaximo": 70000.0,
        "duracion": None,
        "contenidos": []
    },

    # 7. Buscar por contenido múltiple (debe tener al menos uno)
    {
        "query": None,
        "modalidad": None,
        "precioMinimo": None,
        "precioMaximo": None,
        "duracion": None,
        "contenidos": ["Sushi rolls y nigiris", "Wok y salteados"]
    },

    # 8. Buscar por texto libre en descripción
    {
        "query": "recetas sin gluten",
        "modalidad": None,
        "precioMinimo": None,
        "precioMaximo": None,
        "duracion": None,
        "contenidos": []
    },

    # 9. Buscar curso económico
    {
        "query": None,
        "modalidad": None,
        "precioMinimo": 0.0,
        "precioMaximo": 25000.0,
        "duracion": None,
        "contenidos": []
    },

    # 10. Búsqueda amplia: por texto y modalidad combinados
    {
        "query": "vegana",
        "modalidad": "Presencial y online",
        "precioMinimo": None,
        "precioMaximo": None,
        "duracion": None,
        "contenidos": []
    }

]
