import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// import { AppModule } from './AppModule';
import { ServerModule } from '@angular/platform-server';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
// import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
// import { MenuPageComponent } from './components/pages/menu-page/menu-page.component';
// import { MapComponent } from './components/partials/map/map.component';
// import { FavoritesComponent } from './components/partials/favorites/favorites.component';
// import { OrderItemsListComponent } from './components/partials/order-items-list/order-items-list.component';
// import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
// import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
// import { InputValidationComponent } from './components/partials/input-validation/input-validation.component';
// import { TextInputComponent } from './components/partials/text-input/text-input.component';
// import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';

@NgModule({
  imports: [
    // AppModule,
    ServerModule
  ],
  bootstrap: [AppComponent],
  declarations: [
    InputContainerComponent,
    // PaymentPageComponent,
    // MenuPageComponent,
    // MapComponent,
    // FavoritesComponent,
    // OrderItemsListComponent,
    // CheckoutPageComponent,
    // RegisterPageComponent,
    // InputValidationComponent,
    // TextInputComponent,
    // DefaultButtonComponent
  ],
})
export class AppServerModule {}
