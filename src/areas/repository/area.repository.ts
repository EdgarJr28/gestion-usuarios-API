import { Repository } from "typeorm";
import { CustomRepository } from "../../typeorm/typeorm-ex.decorator";
import { Area } from "../entitys/Area.entity";


@CustomRepository(Area)
export class AreaEntRepository extends Repository<Area> { }