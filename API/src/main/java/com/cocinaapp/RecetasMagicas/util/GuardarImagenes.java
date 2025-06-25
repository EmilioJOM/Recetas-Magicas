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
            String filename = nombre + "_" + archivo.getOriginalFilename() +"_"+ System.currentTimeMillis();
            String fullPath = carpeta + filename;
            System.out.println("Intentando guardar en: " + fullPath);
            archivo.transferTo(new File(fullPath));
            File file = new File(fullPath);
            System.out.println("Existe? " + file.exists());
            return "/uploads/"+carpeta+"/" + filename;
        } catch (IOException e) {
            throw new RuntimeException("No se pudo guardar el archivo", e);
        }
    }
}
