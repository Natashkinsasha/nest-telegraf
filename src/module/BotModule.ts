import Telegraf, {ContextMessageUpdate, TelegrafOptions} from 'telegraf';
import {DynamicModule, Module} from "@nestjs/common";
import {ModuleRef} from "@nestjs/core";
import {handlers, properties} from "../decorator/BotController";


@Module({})
export default class BotModule {


    public static forRoot(token: string, options?: TelegrafOptions): DynamicModule {
        const providers = [
            {
                provide: Telegraf,
                useFactory: async (ref: ModuleRef) => {
                    const telegraf = new Telegraf(token, options);
                    handlers.forEach((handler) => {
                        const object: Object | undefined = ref.get(handler.class, {strict: false});
                        if (!object) {
                            return;
                        }
                        const func = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(object), handler.method);
                        if (!func) {
                            return;
                        }
                        if(handler.type === 'hears'){
                            const triggers = handler.property[0];
                            return telegraf.hears(triggers, (ctx: ContextMessageUpdate, next?: () => any) => {
                                const ctxProperty = properties.find((property) => {
                                    return property.target === Object.getPrototypeOf(object) && property.propertyKey === func.value.name && property.type === 'context';
                                });
                                const nextProperty = properties.find((property) => {
                                    return property.target === Object.getPrototypeOf(object) && property.propertyKey === func.value.name && property.type === 'next';
                                });
                                const args: any[] = [];
                                if (ctxProperty) {
                                    args[ctxProperty.parameterIndex] = ctx;
                                }
                                if (nextProperty) {
                                    args[nextProperty.parameterIndex] = next;
                                }
                                return func.value.apply(object, args)
                            });
                        }
                        return;
                    });
                    await telegraf.launch();
                    return telegraf;
                },
                inject: [ModuleRef]
            }
        ];
        return {
            module: BotModule,
            providers: providers,
            exports: providers,
        }
    }


}