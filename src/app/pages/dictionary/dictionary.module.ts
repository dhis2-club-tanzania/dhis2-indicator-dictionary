import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DictionaryRoutingModule } from './dictionary-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { pages } from './pages';
import { sharedComponents, sharedEntryComponents } from './components';

@NgModule({
  declarations: [...pages, ...sharedComponents, ...sharedEntryComponents],
  imports: [CommonModule, SharedModule, DictionaryRoutingModule],
  entryComponents: [...sharedEntryComponents],
})
export class DictionaryModule {}
