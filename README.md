# ShowroomAuto

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.2.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## Mettre le site en ligne (GitHub Pages)

Le fichier `.github/workflows/deploy.yml` publie automatiquement le site à chaque `git push`
sur la branche `main` (ou `master`).

1. Créez un dépôt **public** vide sur github.com.
2. Dans ce dépôt : **Settings > Pages > Build and deployment > Source : GitHub Actions**.
3. Envoyez le projet :

   ```bash
   git init                      # seulement si le dossier n'est pas déjà un dépôt Git
   git branch -M main
   git add .
   git commit -m "Showroom Auto"
   git remote add origin https://github.com/VOTRE-NOM/NOM-DU-DEPOT.git
   git push -u origin main
   ```

4. Suivez le déploiement dans l'onglet **Actions**. Le site sera disponible sur
   `https://VOTRE-NOM.github.io/NOM-DU-DEPOT/`.

Pour mettre à jour le site : modifiez le code, puis `git add .`, `git commit -m "..."` et `git push`.
