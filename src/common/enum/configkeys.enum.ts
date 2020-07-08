/**
 * Enum para las opciones de configuración provenientes del .env
 *
 * En teoría se tiene que sincronizar el contenido de este archivo con la
 * validación en app.module.ts y obviamente el archivo .env|dotenv
 */
export enum ConfigKeys {
  NODE_ENV='NODE_ENV',
  PORT = 'PORT',
  API_ROUTE = 'API_ROUTE'
}
