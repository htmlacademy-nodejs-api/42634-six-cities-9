import {RestApplication} from './rest/rest.application.js';
import {Container} from 'inversify';
import {Component} from './shared/types/component.enum.js';
import {createRestApplicationContainer} from './rest/rest.container.js';
import {createUserContainer} from './shared/modules/user/user.container.js';


async function bootstrap() {
  const appContainer = Container.merge(createRestApplicationContainer(), createUserContainer());
  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
