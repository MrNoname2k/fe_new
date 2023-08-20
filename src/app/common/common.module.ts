import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MAT_RIPPLE_GLOBAL_OPTIONS,
  RippleGlobalOptions,
} from '@angular/material/core';
import {
  DateTimeUtc2LocalFormat,
  DateTimeUtcFormat,
  DateTimeformat2Pipe,
  DateTimeformat3Pipe,
  DateTimeformatPipe,
} from './pipe/date-time-format.pipe';
import {
  CurrencyFormatPipe,
  DecimalFormatPipe,
  SummaryPipe,
  TooltipListPipe,
} from './pipe/string-format.pipe';
import { DialogInfoComponent } from './components/dialog-info/dialog-info.component';
import { BoardComponent } from './components/board/board.component';
import { CardInfoComponent } from './components/card-info/card-info.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ShareDialogComponent } from './components/share-dialog/share-dialog.component';
import { ViewerDialogComponent } from './components/viewer-dialog/viewer-dialog.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommentDialogComponent } from './components/comment-dialog/comment-dialog.component';
import { ToastrComponent } from './components/toastr/toastr.component';
import { FirebaseService } from '../core/service/firebase/firebase.service';
import { LAZYLOAD_IMAGE_HOOKS, LazyLoadImageModule, ScrollHooks } from 'ng-lazyload-image';
import { PostImagePipePipe } from './pipe/post-image-pipe.pipe';
import { ListLikePipePipe } from './pipe/list-like-pipe.pipe';
import { LikeEventDirective } from 'src/directive/like-event.directive';
import { CommentDirective } from 'src/directive/comment.directive';
import { ScrollBottomDirective } from 'src/directive/scroll-bottom.directive';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { ForgotpassDialogComponent } from './components/forgotpass-dialog/forgotpass-dialog.component';




const globalRippleConfig: RippleGlobalOptions = {
  disabled: true,
  animation: {
    enterDuration: 300,
    exitDuration: 0,
  },
};

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'MM/DD/YYYY',
    monthYearA11yLabel: 'YYYY',
  },
};

const CommontComponents = [
  DialogInfoComponent,
  ForgotpassDialogComponent,
  BoardComponent,
  CardInfoComponent,
  SearchBarComponent,
  ShareDialogComponent,
  ViewerDialogComponent,
  ToastrComponent
];

const CustomPipes = [
  DateTimeformatPipe,
  DateTimeformat2Pipe,
  DateTimeformat3Pipe,
  DateTimeUtcFormat,
  DateTimeUtc2LocalFormat,
  TooltipListPipe,
  DecimalFormatPipe,
  CurrencyFormatPipe,
  SummaryPipe,
  CommentDialogComponent,
  ListLikePipePipe,
  PostImagePipePipe,
  LikeEventDirective,
  CommentDirective,
  ScrollBottomDirective
];

@NgModule({
  declarations: [
    ...CustomPipes,
    ...CommontComponents,
    BoardComponent,
    SearchBarComponent,
    ShareDialogComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FormsModule,
    SlickCarouselModule,
    LazyLoadImageModule

  ],
  exports: [
    ...CustomPipes,
    ...CommontComponents,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
  ],
  providers: [
    FirebaseService,
    { provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks }

  ]
})
export class CommonAppModule {
  public static forRoot(): ModuleWithProviders<CommonAppModule> {
    return {
      ngModule: CommonAppModule,
      providers: [
        {
          provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
          useValue: { floatLabel: 'always', appearance: 'outline' },
        },
        { provide: MAT_DATE_LOCALE, useValue: 'en-EN' },
        { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
        { provide: MatSnackBarRef, useValue: '' },
      ],
    };
  }
}
