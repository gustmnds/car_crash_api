import 'dotenv/config';
import * as Boom from '@hapi/boom';
import { Server, server } from '@hapi/hapi';
import { ValidationError } from 'joi';
import * as Jwt from '@hapi/jwt';
import { instanceToPlain } from 'class-transformer';
import { JWT_SECRET, SERVER_PORT } from './configs';
import { userRoutes } from './Routes/user.routes';
import { accidentRoutes } from './Routes/accident.routes';

export async function CreateServer(): Promise<Server> {
  const apiServer = server({
    port: SERVER_PORT,
    routes: {
      validate: {
        async failAction(request, h, err) {
          if (err instanceof ValidationError) {
            return Boom.badRequest(err.message);
          }

          return Boom.internal();
        },
      },
    },
  });

  await apiServer.register(Jwt);

  apiServer.auth.strategy('jwt', 'jwt', {
    keys: JWT_SECRET,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 1 * 24 * 60 * 60, // 1 dia
      timeSkewSec: 15,
    },
    validate(artifacts) {
      return {
        isValid: true,
        credentials: artifacts.decoded.payload,
      };
    },
  });

  await apiServer.register([userRoutes, accidentRoutes]);

  apiServer.ext('onPreResponse', (req) => {
    const { source, output } = req.response as any;
    if (source) {
      return instanceToPlain(source);
    }

    return output?.payload || {};
  });

  return apiServer;
}
