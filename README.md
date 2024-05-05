## **Notas del curso de Angular 17:**

- Para generar un proyecto:

```jsx
ng new nameOfProject
```

- Para crear un servicio

```jsx
ng generate service services/service
```

- Para crear un componente

```jsx
ng generate component home
```

- Para crear un componente en un modulo específico

```html
ng g c views/editarEntrada --module=views/dashboard
```

- Para ejecutar server:

```jsx
ng serve
```

- Para el manejo de rutas:
    - Desde el archivo **app.routes.ts,** siguiendo la estructura:
    
    ```jsx
    import { Routes } from '@angular/router';
    import { HomeComponent } from './home/home.component';
    
    export const routes: Routes = [
      {
        path: 'home',
        component: HomeComponent,
      },
    ];
    
    ```
    
- **TypeScript**: Interfaces
    
    Una interfaz es una estructura que define la forma de un objeto, especificando los tipos de sus propiedades y métodos, pero sin proporcionar una implementación concreta. Las interfaces son una forma poderosa de establecer contratos en tu código, lo que ayuda a garantizar que los objetos cumplan con **ciertos requisitos predefinidos**.
    
    **Ejemplo:**
    
    ```tsx
    import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
    
    export interface Options {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe: 'body';
      context?: HttpContext;
      params?:
        | HttpParams
        | {
            [param: string]:
              | string
              | number
              | boolean
              | ReadonlyArray<string | number | boolean>;
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
      transferCache?:
        | {
            includeHeaders?: string[];
          }
        | boolean;
    }
    
    ```
    
    - **Método ngFor en un componente:**
        
        Sirve para iterar una lista de elementos y ser usado, normalmente, para crear un objeto para cada elemento iterada. Ejemplo: 
        
        ***Ngfor method***
        
        ```html
        <!-- In your component's HTML template -->
        <ul>
          <li *ngFor="let name of names">{{ name }}</li>
        </ul>
        
        ```
        
        ***Page render***
        
        ```html
        <ul>
          <li>Alice</li>
          <li>Bob</li>
          <li>Charlie</li>
          <li>David</li>
        </ul>
        
        ```
        
    - **Relación entre componentes:**
        - **A través del decorador @Input. Ejemplo:**
            
            ***PadreComponent***
            
            ```tsx
            import { Component } from '@angular/core';
            
            @Component({
              selector: 'app-padre',
              template: `
                <h2>Padre Component</h2>
                <ul>
                  <li *ngFor="let item of items">
                    <app-hijo [dato]="item"></app-hijo>
                  </li>
                </ul>
              `,
            })
            export class PadreComponent {
              items = ['Elemento 1', 'Elemento 2', 'Elemento 3'];
            }
            
            ```
            
            ***HijoComponent***
            
            ```tsx
            import { Component, Input } from '@angular/core';
            
            @Component({
              selector: 'app-hijo',
              template: `
                <div>
                  {{ dato }}
                </div>
              `,
            })
            export class HijoComponent {
              @Input() dato: string;
            }
            
            ```
            
        - **A través de ngOnChanges. Ejemplo:**
            
            ```tsx
            import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
            
            export class EntradaComponent implements OnInit, OnChanges {
              @Input() public entrada: Entrada;
            
              constructor() {
                this.entrada = {
                  titulo: '',
                  resumen: ''
                };
              }
            
              ngOnInit(): void {
                console.log('Inicializando componente...');
              }
            
              ngOnChanges(changes: SimpleChanges): void {
                console.log('Valores modificados:', changes);
              }
            }
            
            ```
            
        - **A través del decorador @Output. Ejemplo:**
            
            ***HijoComponent***
            
            ```tsx
            import { Component, Output, EventEmitter } from '@angular/core';
            
            @Component({
              selector: 'app-hijo',
              template: `
                <button (click)="emitirMensaje()">Enviar Mensaje al Padre</button>
              `,
            })
            export class HijoComponent {
              @Output() mensajeEnviado = new EventEmitter<string>();
            
              emitirMensaje(): void {
                this.mensajeEnviado.emit('¡Hola desde el hijo!');
              }
            }
            
            ```
            
            ***PadreComponent***
            
            ```tsx
            import { Component } from '@angular/core';
            
            @Component({
              selector: 'app-padre',
              template: `
                <h2>Padre Component</h2>
                <app-hijo (mensajeEnviado)="recibirMensaje($event)"></app-hijo>
                <p>Mensaje recibido en el padre: {{ mensajeRecibido }}</p>
              `,
            })
            export class PadreComponent {
              mensajeRecibido: string = '';
            
              recibirMensaje(mensaje: string): void {
                this.mensajeRecibido = mensaje;
              }
            }
            
            ```
            
        - ***A través de la variable #ref:***
            
            ***Component***
            
            ```tsx
            import { Component, Input, OnInit } from '@angular/core';
            
            export class EntradaComponent implements OnInit {
              @Input()
              public entrada: Entrada;
            
              constructor() { }
            
              ngOnInit(): void {
                // Inicialización u otras operaciones de inicio
              }
            
              mostrarTitulo(): void {
                alert("Título: " + this.entrada.titulo);
              }
            
              mostrarResumen(): void {
                alert("Resumen: " + this.entrada.resumen);
              }
            }
            
            ```
            
            ***HTML***
            
            ```html
            <div id="contenedor">
              <h3>Listado de entradas al blog:</h3>
              <app-entrada [entrada]="entrada"></app-entrada>
              <button (click)="appEntrada.mostrarTitulo()">Mostrar Título</button>
              <button (click)="appEntrada.mostrarResumen()">Mostrar Resumen</button>
            </div>
            
            ```
            
    - **A través de un servicio:**
        
        ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a658a871-91f7-4f92-b7ee-f52251052008/de316dc7-eed1-4ec4-930f-4d551f2d8e31/Untitled.png)
        
        **Ejemplo:**
        
        ```tsx
        import { Injectable } from '@angular/core';
        import { Subject, Observable } from 'rxjs';
        
        @Injectable({
          providedIn: 'root'
        })
        export class DataService {
          // Atributos
          private titulo: Subject<string> = new Subject<string>();
        
          // Observables
          public titulo$: Observable<string> = this.titulo.asObservable();
        
          constructor() { }
        
          // Métodos
          public setTitulo(titulo: string): void {
            this.titulo.next(titulo);
          }
        }
        
        ```
        
        ### **Esquema general - Relaciones**
        
        ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a658a871-91f7-4f92-b7ee-f52251052008/94a07c3f-525b-41ff-87c4-0c58ac35d31f/Untitled.png)
        
    - **Uso de ngClass y ngStyle**
        
        ***ngClass***
        
        ```tsx
        public tipoDeClase(): any {
          return {
            'claro': this.entrada.id % 2 == 0,
            'oscuro': this.entrada.id % 2 != 0
          };
        }
        ```
        
        ```html
        <div id="entrada" [ngClass]="tipoDeClase()">
          <p>{{ entrada.titulo }}</p>
          <p>{{ entrada.resumen }}</p>
        </div>
        ```
        
        ***ngStyle***
        
        ```tsx
        ngOnInit(): void {
          this.estiloActual = {
            color: this.entrada.id % 2 == 0 ? 'blue' : 'white'
          };
        }
        ```
        
        ```html
        <div [ngStyle]="estiloActual">
          <h4>{{ entrada.titulo }}</h4>
          <p>{{ entrada.resumen }}</p>
        </div>
        ```
        
    - **Uso de ngSwitch**
        
        ***En HTML***
        
        ```html
        <div id="entrada">
          <h4 [ngStyle]="estiloActual">{{ entrada.titulo }}</h4>
          <p>{{ entrada.resumen }}</p>
          <div [ngSwitch]="entrada.valoracion">
            <span>¿Te gustó? : </span>
            <span *ngSwitchCase="'SI'">Si, muy bueno</span>
            <span *ngSwitchCase="'NO'">No, nada educativo</span>
            <span *ngSwitchDefault>No sabe/ no contesta</span>
          </div>
        </div>
        
        ```
        
    - **Operaciones con pipes**
        
        Los pipes son una forma de transformar el valor de una expresión en la plantilla antes de mostrarlo al usuario. Los pipes permiten formatear y manipular datos de manera sencilla y legible en la plantilla HTML. Por **ejemplo:**
        
        ***Datepipe***
        
        ```html
        <!-- Fecha en formato largo -->
        <p>{{ fecha | date: 'fullDate' }}</p>
        ```
        
        ***Upper/Lower Case Pipe***
        
        ```html
        <!-- Convertir texto a mayúsculas -->
        <p>{{ texto | uppercase }}</p>
        <!-- Convertir texto a minúsculas -->
        <p>{{ texto | lowercase }}</p>
        ```
        
        ***asyncPipes***
        
        ```tsx
        // En el componente
        datos$: Observable<any> = this.servicio.getDatos();
        ```
        
        ```html
        <!-- En la plantilla -->
        <div *ngIf="datos$ | async as datos">
          <p>{{ datos }}</p>
        </div>
        ```
        
        Estos son solo algunos ejemplos de los muchos pipes incorporados que ofrece Angular. Además, puedes crear tus propios pipes personalizados para realizar transformaciones específicas de datos que necesites en tu aplicación.
        
        Para crear pipes se dispone del comando:
        
        ```jsx
        ng generate pipe nombrePipe
        ```
        
        ***Ejemplo:***
        
        ```tsx
        import { Pipe, PipeTransform } from '@angular/core';
        
        @Pipe({
          name: 'espejo'
        })
        export class EspejoPipe implements PipeTransform {
          transform(value: string): string {
            return value.split('').reverse().join('');
          }
        }
        ```
        
    - **Añadir parámetros a rutas**
        
        Para que angular pueda identificar la ruta dinámica, se ha de indicar haciendo uso de “:”. **Ejemplo**:
        
        ```tsx
        { path: 'entrada/:id', component: EntradaComponent},
        ```
        
        Para hacer uso del parámetro, se añade el valor respectivo. **Ejemplos**:
        
        ```tsx
        this.router.navigate([`/entrada/${entrada.id}`]) ;
        ```
        
        ```html
        <div id="entrada" [ngClass]="modificarClase()"
        routerLink="/entrada/{{entrada.id}}">
        ```
        
        Para **trabajar con el parámetro**, hacemos uso de la clase **ActivatedRoute**
        
        ```tsx
        constructor(private activatedRoute: ActivatedRoute) {
          this.activatedRoute.params.subscribe(params => {
              this.id = +params.id;
            });
          }
        ```
        
    - **Rutas anidadas**
        
        En Angular se pueden crear varios niveles y subniveles de enrutamiento para agrupar diferentes funciones y componentes en el contexto de un mismo componente principal. **Ejemplo:**
        
        ```tsx
        const routes: Routes = [
          { 
            path: 'crisis-center', 
            component: CrisisCenterComponent, 
            children: [
              { 
                path: '', 
                component: CrisisListComponent,
                children: [
                  { path: ':id', component: CrisisDetailComponent },
                  { path: '', component: CrisisCenterHomeComponent }
                ]
              },
              { path: 'login', component: LoginComponent }
            ]
          },
          { path: '', redirectTo: '/crisis-center', pathMatch: 'full' },
          { path: '**', component: PageNotFoundComponent }
        ];
        ```
        
        El esquema quedaría:
        
        ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a658a871-91f7-4f92-b7ee-f52251052008/381f977e-ff05-4ccc-a0bb-dcd71647b310/Untitled.png)
        
    - **Autenticación de Rutas: Uso de CanActivate**
        
        Se utiliza para limitar a los usuarios el acceso a ciertas rutas como puede ser una zona de administración. Se genera mediante el comando:
        
        ```jsx
        ng generate guard auth --implements CanActivate
        ```
        
        Y genera una clase que luce de la siguiente manera:
        
        ```tsx
        import { Injectable } from '@angular/core';
        import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
        import { Observable } from 'rxjs';
        
        @Injectable({
          providedIn: 'root'
        })
        export class AuthGuard implements CanActivate {
          canActivate(
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
              return true; // aquí irá la lógica de autenticación
          }
        }
        ```
        
        Para implementar dicha lógica, se ha de añadir el componente CanActivate a la ruta que se le quiera añadir esta autenticación. De esta manera:
        
        ```tsx
        { path: 'listado', component: ListadoComponent, canActivate: [AuthGuard] },
        ```
        
    - **Uso de módulos en angular**
        
        Angular trabaja  de forma modular de manera que permite dividir sistemas en fragmentos mas pequeños con funcionalidades distintas. Para crear un módulo se hace uso del ***comando*:** 
        
        ```jsx
        ng generate module nameModule
        ```
        
        ***Ejemplo de un modulo:***
        
        ```tsx
        import { FormsModule } from '@angular/forms';
        import { BrowserModule } from '@angular/platform-browser';
        import { NgModule } from '@angular/core';
        import { HttpClientModule } from '@angular/common/http';
        
        import { AppComponent } from './app.component';
        import { MenuComponent } from './menu/menu.component';
        import { ListadoComponent } from './views/listado/listado.component';
        import { EntradaComponent } from './views/listado/entrada/entrada.component';
        import { AppRoutingModule } from './app-routing.module';
        import { PaginaNoEncontradaComponent } from './views/pagina-no-encontrada/pagina-no-encontrada.component';
        import { AcercaDeNosotrosComponent } from './views/acerca-de-nosotros/acerca-de-nosotros.component';
        import { LoginComponent } from './views/login/login.component';
        import { EspejoPipe } from './shares/pipes/espejo.pipe';
        import { FrontComponent } from './views/front/front.component';
        
        @NgModule({
          declarations: [
            AppComponent,
            MenuComponent,
            ListadoComponent,
            EntradaComponent,
            PaginaNoEncontradaComponent,
            AcercaDeNosotrosComponent,
            LoginComponent,
            EspejoPipe,
            FrontComponent,
          ],
          imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
          providers: [],
          bootstrap: [AppComponent],
        })
        export class AppModule {}
        
        ```
        
        Para que Angular reconozca cual es el módulo principal y los submódulos que heredan de el, hace uso del ***archivo main.ts:***
        
        ```tsx
        import { enableProdMode } from '@angular/core';
        import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
        
        import { AppModule } from './app/app.module';
        import { environment } from './environments/environment';
        
        if (environment.production) {
          enableProdMode();
        }
        
        platformBrowserDynamic().bootstrapModule(AppModule) //aqui se indica el modulo 
        .catch(err => console.error(err));                //principal
        
        ```
        
    - Cómo ***mostrar los componentes***  de un ***submódulo:***
        
        Existen dos formas:
        
        1. Añadiendo el componente a mostrar en el decorador exports de dicho submódulo.
        2. Añadiendo rutas al submódulo y sus componentes. Lo habitual. (Lazy-loading)
            
            ```tsx
            {
              path: 'customer', loadChildren: 
              () => import('../rutadelarchivo/customer-dashboard.module').then(
                m => m.CustomerDashboardModule
              )
            }
            ```
            
        
        Para manejar las rutas de nuestro submódulo, hacemos uso del método ***forChild***:
        
        ```tsx
        RouterModule.forChild([
          { path: '', component: CustomerDashboardComponent }
        ])
        ```
        
    - **Formularios reactivos**
        
        -Se declaran como objetos
        
        -Se importan componentes de validación
        
        -Se trabaja con observables
        
        ```tsx
        import { NgModule } from '@angular/core';
        import { RouterModule, Routes } from '@angular/router';
        import { CommonModule } from '@angular/common';
        import { DashboardComponent } from './dashboard.component';
        import { ReactiveFormsModule } from '@angular/forms';
        
        const routes: Routes = [
          { path: '', component: DashboardComponent }
        ];
        
        @NgModule({
          declarations: [DashboardComponent],
          imports: [
            CommonModule,
            RouterModule.forChild(routes),
            ReactiveFormsModule
          ]
        })
        export class DashboardModule { }
        
        ```
        
        ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a658a871-91f7-4f92-b7ee-f52251052008/f4970ddb-70e8-4d49-b4ef-75612677eca2/Untitled.png)
        
        ```tsx
        ***Formgroups*** 
        import { Component, OnInit } from '@angular/core';
        import { FormControl, FormGroup } from '@angular/forms';
        
        @Component({
          selector: 'app-edit',
          templateUrl: './edit.component.html',
          styleUrls: ['./edit.component.css']
        })
        export class EditComponent implements OnInit {
        
          // Atributos
          public usuario: FormGroup;
        
          constructor() {
            this.usuario = new FormGroup({
              nombre: new FormControl(''),
              apellido: new FormControl('')
            });
          }
        
          ngOnInit(): void {
            // Código de inicialización si es necesario
          }
        }
        
        ```
        
        ```html
        <form [formGroup]="usuario">
          <label>Nombre:</label>
          <input type="text" formControlName="nombre">
          <label>Apellido:</label>
          <input type="text" formControlName="apellido">
        </form>
        
        ```
        
        ***Formgroups anidados***
        
        ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a658a871-91f7-4f92-b7ee-f52251052008/1ccfb470-5794-4632-926d-be02e78a3644/Untitled.png)
        
        ***Validaciones***
        
        ```tsx
        import { Component, OnInit } from '@angular/core';
        import { FormBuilder, FormGroup, Validators } from '@angular/forms';
        
        @Component({
          selector: 'app-edit',
          templateUrl: './edit.component.html',
          styleUrls: ['./edit.component.css']
        })
        export class EditComponent implements OnInit {
        
          // Atributos
          public usuario: FormGroup;
        
          constructor(private formBuilder: FormBuilder) {
            this.usuario = this.formBuilder.group({
              nombre: ['', Validators.required],
              apellido: ['', [Validators.required, Validators.minLength(4)]],
              direccion: [''],
              calle: [''],
              ciudad: ['']
            });
          }
        
          ngOnInit(): void {
            // Código de inicialización si es necesario
          }
        }
        
        ```
        
        ```html
        <form [formGroup]="usuario">
          <input type="text" formControlName="nombre">
          <div *ngIf="usuario.get('nombre').invalid && usuario.get('nombre').dirty">
            <div *ngIf="usuario.get('nombre').errors.required">El nombre es obligatorio</div>
          </div>
          <input type="text" formControlName="apellido">
          <div *ngIf="usuario.get('apellido').invalid && usuario.get('apellido').dirty">
            <div *ngIf="usuario.get('apellido').errors.required">El apellido es obligatorio</div>
            <div *ngIf="usuario.get('apellido').errors.minlength">Apellido debe tener al menos 4 caracteres</div>
          </div>
          <button [disabled]="usuario.invalid">Enviar</button>
        </form>
        ```
