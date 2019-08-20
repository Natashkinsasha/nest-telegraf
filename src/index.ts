import {NestFactory} from "@nestjs/core";
import AppModule from "./module/AppModule";
import Telegraf, {ContextMessageUpdate} from "telegraf";
import {Tunnel} from "localtunnel";



async function bootstrap() {
    const PORT = 3000;
    const app = await NestFactory.create(AppModule);
    // const tunnel: Tunnel = app.get('Tunnel');
    // const telegraf: Telegraf<ContextMessageUpdate> = app.get(Telegraf);
    //app.use(telegraf.webhookCallback(`/bot${'957352310:AAH2Dl2eV57a3c0e2KF7Jjybc9QOaCXl8dw'}`))
    //telegraf.telegram.setWebhook(`${tunnel.url}/bot${'957352310:AAH2Dl2eV57a3c0e2KF7Jjybc9QOaCXl8dw'}`)
    await app.listen(PORT, () => {
        console.log('Server started on port: 3000');
    });
}

bootstrap();