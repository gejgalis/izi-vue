<script lang="ts">
    import * as Vue from "vue";
    import {Component, Prop} from "vue-property-decorator";
    import {Module, Inject, OnInit, OnDestroy} from "../vue-di";
    import EmailModule from "./EmailModule";
    import {UserService} from "./UserService";
    import {CONFIG_TOKEN} from "./tokens";

    const userConfig = window['GLOBAL_USER_CONFIG'];

    @Module({
        imports: [
            EmailModule
        ],
        providers: [
            UserService,
            UserView,
            { provide: UserService, useClass: UserService },
            { provide: CONFIG_TOKEN, useValue: userConfig },
            { provide: CONFIG_TOKEN, useFactory: context => userConfig }
        ],
        bootstrap: UserView
    })
    @Component({
        components: {
            EmailModule
        }
    })
    export default class UserView extends Vue {
        @Inject()
        userService: UserService;

        @Inject(CONFIG_TOKEN)
        config: any;

        @Prop()
        userId: string;

        @OnInit()
        onInit() {
            this.userService.get(this.userId)
        }

        @OnDestroy()
        onDestroy() {
            this.userService.get(this.userId)
        }
    }

</script>
<template>
    <div>
        <email-module :user-id="userId"></email-module>
    </div>
</template>