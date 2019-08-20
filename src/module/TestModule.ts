import {Module} from "@nestjs/common";


@Module({
    providers: [
        {
            provide: 'Test',
            useValue: 'test2'
        }
    ],
    exports: ['Test'],
})
export default class TestModule {
}