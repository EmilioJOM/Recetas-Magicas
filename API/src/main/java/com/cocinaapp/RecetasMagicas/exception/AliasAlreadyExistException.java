package com.cocinaapp.RecetasMagicas.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AliasAlreadyExistException extends RuntimeException{
    private List<String> sugerencias;
    public AliasAlreadyExistException  (String messege, List<String> sugerencias){
       super(messege);
       this.sugerencias = sugerencias;
    }
}
