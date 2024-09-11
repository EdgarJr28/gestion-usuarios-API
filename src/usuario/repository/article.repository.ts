import { Repository } from "typeorm";
import { CustomRepository } from "../../typeorm/typeorm-ex.decorator";
import { Usuario } from "../entitys/usuario.entity";


@CustomRepository(Usuario)
export class UsuarioEntRepository extends Repository<Usuario> {}