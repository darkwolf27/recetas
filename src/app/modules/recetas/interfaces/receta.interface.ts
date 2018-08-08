export interface Receta {
    titulo: string;
    tiempo: number;
    ingredientes: string[];
    instrucciones: string;
    tipo: string;
    consejos?: string;
    favorito?: boolean;
    menu?: boolean;
    menuPersona?: string;
    etiquetas?: string[];
    img?: string;
    hidratos?: number;
    proteinas?: number;
    vegetales?: number;
    frutas?: number;
    lipidos?: number;
    fechaSubida?: Date;
    estado?: boolean;
    _id?: string;
}
