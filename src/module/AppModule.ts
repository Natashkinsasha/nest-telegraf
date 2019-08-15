import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import MyModule from "./MyModule";


@Module({
    imports: [MyModule],
})
export default class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        return undefined;
    }

}
