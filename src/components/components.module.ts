import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ProfileDetailComponent } from './profile-detail/profile-detail';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { IonicModule } from "ionic-angular";

@NgModule({
	declarations: [ProfileDetailComponent],
	imports: [ReactiveFormsModule,
		FormsModule,
		CommonModule,
		IonicModule
	],
	exports: [ProfileDetailComponent],
	schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
