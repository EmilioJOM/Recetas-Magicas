package com.cocinaapp.RecetasMagicas.util;

import com.cocinaapp.RecetasMagicas.user.repository.AlumnoRepository;

public class ValidateDNI {
    static public boolean ValidateNroTramite(String nroTramite, AlumnoRepository repo, String numeroDNI) {
        if (!nroTramite.matches("\\d{11}")) return false; // Trámite: 11 dígitos
        if (repo.existsByNumeroTramite(nroTramite)) return false; // No repetido
        if (!numeroDNI.matches("\\d{8}")) return false; // No repetido
        if (repo.existsByNumeroDNI(numeroDNI)) return false; // No repetido
        return true;
    }
}
