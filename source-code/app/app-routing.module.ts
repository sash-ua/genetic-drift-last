import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InstructionComponent} from "./core/inctruction.component/instruction.component";
import {ModelingComponent} from "./core/modeling.component/modeling.component";
import {Page404Component} from "./core/page.404.component/page.404.component";


export const routes: Routes = [
    { path: '',   redirectTo: 'instruction', pathMatch: 'full' },
    { path: 'instruction', component: InstructionComponent },
    { path: 'modeling', component: ModelingComponent },
    { path: '**', component: Page404Component }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}