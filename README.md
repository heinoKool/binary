# Binärbollwerk (GitHub Pages)

Dieses Projekt ist **statisches HTML/CSS/JS** und kann direkt auf **GitHub Pages** gehostet werden (ohne GitHub Actions).

## Seiten (5 URLs)

Wenn dein Repo z.B. `https://<user>.github.io/<repo>/` heißt, dann existieren diese 5 Seiten:

1. `https://<user>.github.io/<repo>/`
2. `https://<user>.github.io/<repo>/group2/`
3. `https://<user>.github.io/<repo>/group3/`
4. `https://<user>.github.io/<repo>/group4/`
5. `https://<user>.github.io/<repo>/group5/`

## GitHub Pages einschalten (ohne Actions)

1. Repo auf GitHub pushen.
2. GitHub → **Settings** → **Pages**.
3. Unter **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` (oder `master`), **Folder**: `/ (root)`
4. Speichern, kurz warten – GitHub zeigt dir dann die URL an.

## Struktur

- `index.html` = Stufe 1
- `group2/index.html` … `group5/index.html` = Stufen 2–5
- `assets/styles.css` und `assets/game.js` werden von allen Seiten genutzt

Hinweis: Alle Links sind **relativ**, damit es sowohl lokal als auch unter `/<repo>/` auf GitHub Pages funktioniert.
