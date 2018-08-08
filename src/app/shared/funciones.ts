export const QuitarAcentos = (cadena) => {
        cadena = cadena.toLowerCase();
        cadena = cadena.replace(/á/gi, 'a');
        cadena = cadena.replace(/é/gi, 'e');
        cadena = cadena.replace(/í/gi, 'i');
        cadena = cadena.replace(/ó/gi, 'o');
        cadena = cadena.replace(/ú/gi, 'u');
        cadena = cadena.replace(/ñ/gi, 'n');

        return cadena;
};
