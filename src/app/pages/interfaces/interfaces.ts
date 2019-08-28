export interface RespuestaForms {
  ok: boolean;
  pagina: number;
  forms: Form[];
}

export interface RespuestaQuestions {
  ok: boolean;
  pagina: number;
  preguntas: Pregunta[];
}

export interface Form {
  _id?: string;
  area?: string;
  usuario?: Usuario;
  created?: string;
}

export interface Pregunta {
  _id?: string;
  texto?: string;
  ok?: boolean;
  img?: string[];
  comentario?: string;
  form?: Form;
  color?: string;
  guardado?: boolean;
}

export interface Usuario {
  avatar?: string;
  _id?: string;
  nombre?: string;
  email?: string;
  password?: string;
}