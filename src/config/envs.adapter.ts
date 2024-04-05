// Archivo de configuracion para las variables de entorno
import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
	PORT: get( "PORT" ).required().asPortNumber(),
}
