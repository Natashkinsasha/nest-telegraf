import {NestFactory} from "@nestjs/core";
import AppModule from "./module/AppModule";
import TestController from "./controller/TestController";


async function bootstrap() {

    const app = await NestFactory.create(AppModule);
    console.log(app.get(TestController));
    await app.listen(3000, () => {
       console.log('Server started on port: 3000');
    });
}

bootstrap();