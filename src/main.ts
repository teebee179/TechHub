import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import * as session from 'express-session';
import * as passport from 'passport'

var pagination = require('./admin-management/admin.pagination.helper');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  hbs.registerPartials(join(__dirname, '..', 'views/Partial'));
  hbs.registerHelper('renderButtonPagy', pagination.pagy);
  hbs.registerHelper('hasPagination', pagination.hasPagination);
  hbs.registerHelper('previous', pagination.previous);
  hbs.registerHelper('next', pagination.next);
  hbs.registerHelper('toJSON', function(obj) {
    return JSON.stringify(obj, null, 3);
});
  app.setViewEngine('hbs');
  
  app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      cookie: {maxAge: 36000},
    }),
  )

  app.use(passport.initialize());
  app.use(passport.session());
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
