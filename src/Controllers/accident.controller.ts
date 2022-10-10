import { Request } from '@hapi/hapi';
import { CreateAccidentDTO } from '../Models/Accident/dto';
import { accidentService, AccidentService } from '../Services/accident.service';

export class AccidentController {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function, no-shadow
  constructor(private readonly accidentService: AccidentService) {}

  public async ViewAccident(request: Request) {
    const accidentId = request.params.accidentId as number;
    const accident = await this.accidentService.ViewAccident(accidentId);

    return accident;
  }

  public async CreateAccident(request: Request) {
    const clientId = request.auth.credentials.clientId as number;
    const createAccidentDTO = request.payload as CreateAccidentDTO;
    const accident = await this.accidentService.CreateAccident(clientId, createAccidentDTO);

    return accident;
  }

  public async DeleteAccident(request: Request) {
    const clientId = request.auth.credentials.clientId as number;
    const accidentId = request.params.accidentId as number;
    await this.accidentService.DeleteAccident(clientId, accidentId);

    return '';
  }

  public async ListAccidents(request: Request) {
    const clientId = request.auth.credentials.clientId as number;
    const accidents = await this.accidentService.ListAccidents(clientId);

    return accidents;
  }
}

export const accidentController = new AccidentController(accidentService);
