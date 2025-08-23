# Web Dev Sample Web App

This is a sample for converting the Web App using, Angular with Nodejs.

================================================================================

# Setup

Start the project by initializing npm and installing the required node modules in the RESTAPI-Server folder:

```bash
npm init -y
npm install express
npm install mysql2
npm install http
npm install body-parser
npm install cors
```

Then get the cli for angular in the root folder:

```bash
npm install @angular/cli@latest
```

Create Angular App for UI part:

```bash
ng new WebApp
```

Then create the components to correspond to each page:

```bash
ng generate component components/home
```

---------------------------------------------------------------------------------

# Navigation

Add routes in app-routing.module.ts:

```bash
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'cart', component: CartComponent},
];
```

----------------------------------------------------------------------------------

Confer with the code and slowly start building up the app by adding more components.