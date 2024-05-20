import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthMiddleware} from './user/middlewares/auth.middleware';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.key), CategoriesModule,UserModule ],

})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
}