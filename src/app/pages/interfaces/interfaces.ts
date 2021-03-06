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
  fabrica?: Factory;
}

export interface Pregunta {
  _id?: string;
  texto?: string;
  traduccion?: string;
  ok?: boolean;
  img?: string[];
  comentario?: string;
  form?: Form;
  color?: string;
  guardado?: boolean;
  radioDisabled?: boolean;
  camaraDisabled?: boolean;
}

export interface Usuario {
  avatar?: string;
  _id?: string;
  nombre?: string;
  email?: string;
  password?: string;
  fabrica?: string;
  idioma?: string;
}

export interface Factory {
  _id?: string;
  nombre?: string;
  pais?: string;
  ciudad?: string;
}

export interface InitialObservation {
  id?: string;
  queVes?: string;
  tipoRiesgo?: string;
  img?: string;
  form?: Form;
}