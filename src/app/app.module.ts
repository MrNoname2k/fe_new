import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { PagesModule } from './pages/pages.module';
import { CommonAppModule } from './common/common.module';
import { WebsocketService } from './core/service/socket/websocket.service';
import { MessageService } from './core/service/message/message.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JsonTokenWebInterceptor } from './core/interceptor/jwt';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore as getFirestore2, provideFirestore as provideFirestore2 } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { LAZYLOAD_IMAGE_HOOKS, LazyLoadImageModule, ScrollHooks } from 'ng-lazyload-image';
import { SendDataService } from './core/service/data/send-data.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    PagesModule,
    HttpClientModule,
    CommonAppModule.forRoot(),

    ToastrModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore2(() => getFirestore2()),
    LazyLoadImageModule

  ],
  providers: [
    WebsocketService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JsonTokenWebInterceptor,
      multi: true
    },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    { provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks },
    SendDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
function provideFirestore(arg0: () => any): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

function getFirestore(): any {
  throw new Error('Function not implemented.');
}

