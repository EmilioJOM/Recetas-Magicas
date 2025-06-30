package com.cocinaapp.RecetasMagicas.util;



import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Component
public class GuardarImagenes {
    @Value("${uploads.dir}")
    private String uploadsDir;
    public String guardarArchivo(MultipartFile archivo, String carpeta, String nombre) {

        String carpetaPath = uploadsDir+carpeta+"/";
        try {
            Files.createDirectories(Paths.get(carpetaPath));
            File dir = new File(carpetaPath);
            if (!dir.exists()) dir.mkdirs();
            String filename = nombre + "_" + System.currentTimeMillis() +"_"+ archivo.getOriginalFilename();
            String fullPath = carpetaPath + filename;
            System.out.println("Intentando guardar en: " + fullPath);
            archivo.transferTo(new File(fullPath));
            File file = new File(fullPath);
            System.out.println("Existe? " + file.exists());
            System.out.println("¿Permiso escritura? " + new File(carpetaPath).canWrite());
            return "https://recetas-magicas-api.onrender.com/uploads/"+carpeta+"/" + filename;
        } catch (IOException e) {
            throw new RuntimeException("No se pudo guardar el archivo", e);
        }
    }
}
