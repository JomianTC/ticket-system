// Archivo adaptador de la logica de UUID
import { v4 as uuidv4 } from "uuid";

export class UUIDAdapter {
	public static v4() { return uuidv4(); }
}
