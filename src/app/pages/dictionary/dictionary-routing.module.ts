import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DictionaryComponent } from './pages/dictionary/dictionary.component';
import { HomeComponent } from './pages/home/home.component';
import { MatrixComponent } from './pages/matrix/matrix.component';
import { MetadataGroupsDashboardComponent } from './pages/metadata-groups-dashboard/metadata-groups-dashboard.component';
import { MetadataMatrixDashboardComponent } from './pages/metadata-matrix-dashboard/metadata-matrix-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dictionary/all',
        component: DictionaryComponent,
      },
      {
        path: 'dictionary/:ids/:option/:selected',
        component: DictionaryComponent,
      },
      {
        path: 'matrix',
        component: MatrixComponent,
        children: [
          {
            path: '',
            redirectTo: 'metadata-groups',
          },
          {
            path: 'metadata-groups',
            component: MetadataGroupsDashboardComponent,
          },
          {
            path: ':type/:id',
            component: MetadataMatrixDashboardComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DictionaryRoutingModule {}
