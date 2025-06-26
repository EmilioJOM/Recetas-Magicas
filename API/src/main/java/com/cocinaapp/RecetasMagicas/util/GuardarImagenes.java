package com.cocinaapp.RecetasMagicas.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class GuardarImagenes {

    public static String guardarArchivo(MultipartFile archivo, String carpeta, String nombre) {
        String carpetaPath = "/tmp/uploads/"+carpeta+"/";
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
            return "/uploads/"+carpeta+"/" + filename;
        } catch (IOException e) {
            throw new RuntimeException("No se pudo guardar el archivo", e);
        }
    }
}
