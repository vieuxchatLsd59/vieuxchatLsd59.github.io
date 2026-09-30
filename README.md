<div align="center">

# `vieuxchatLsd59`

```ascii
 ██╗███████╗███╗   ███╗███████╗██╗
 ██║██╔════╝████╗ ████║██╔════╝██║
 ██║█████╗  ██╔████╔██║█████╗  ██║
 ██║██╔══╝  ██║╚██╔╝██║██╔══╝  ██║
 ██║███████╗██║ ╚═╝ ██║███████╗███████╗
 ╚═╝╚══════╝╚═╝     ╚═╝╚══════╝╚══════╝
```

**Développeur front-end & embarqué** · HTML · CSS · JavaScript · Canvas 2D · C++ · ESP32

`J'apprends en ligne. Je construis des projets de bout en bout.`

[Mon portfolio](https://vieuxchatlsd59.github.io/) ·
[GitHub](https://github.com/vieuxchatLsd59) ·
[LinkedIn](https://www.linkedin.com/in/ismaelberrazzag) ·
[Email](mailto:ismaelberrdbz@gmail.com) ·
[Discord](https://discord.com/) `@vieuxchatlsd`

</div>

---

## `à propos`

Salut, moi c'est **Isamel Berrazzag** 👋

- 🔭 Développeur **front-end**, obsessive de rendu fluide et de CSS propre.
- 🔌 **Embarqué** : ESP32, capteurs, radio LoRaWAN, objets connectés basse consommation.
- 🌱 J'apprends le web sur **[TryHackMe](https://tryhackme.com)** — modules HTML/CSS, box model, flexbox, grid, responsive, animations.
- 🎯 Chaque notion apprise est mise en pratique dans un projet réel, de bout en bout.
- ⚡ J'aime le temps réel : canvas, physique de particules, animations au `requestAnimationFrame`.
- 🛠️ Tout est écrit à la main : **0 dépendance npm, 0 build, 0 image**.
- 📫 Ouvert à toute collaboration : **ismaelberrdbz@gmail.com**

```text
$ whoami
isamelberrazzag — dev front-end & embarqué
$ ls projets
PARTICULA   KITERIDER   PROJET_03
$ cat ~/stack
HTML · CSS · JavaScript · Canvas 2D · C++ · ESP32 · LoRaWAN · Git
```

## `compétences`

| Domaine | Niveau | Détails |
|---|---|---|
| HTML5 | ████████░░ 85 % | sémantique, accessibilité, SEO |
| **CSS moderne** | █████████░ 90 % | grid, flexbox, custom properties, `clamp()`, keyframes, `:has()` |
| JavaScript (DOM) | ███████░░░ 70 % | événements, classes, canvas, `requestAnimationFrame` |
| Canvas 2D | ██████░░░░ 65 % | particules, projection, performance |
| Git & GitHub | ███████░░░ 75 % | branches, commits propres, README |
| UI / UX | ██████░░░░ 60 % | hiérarchie, contraste, rythme typographique |
| C++ / Arduino | ████████░░ 80 % | structures, tableaux, registres, interruptions |
| ESP32 / PlatformIO | ███████░░░ 75 % | brochage, SPI / I²C / UART, gestion d'alimentation |
| IoT / LoRaWAN | ██████░░░░ 65 % | LMIC, payloads binaires, ACK, duty cycle |

**En cours d'apprentissage :** WebGL / GLSL · TypeScript · architecture CSS (tokens, cascade layers) · deep sleep & low power · accessibilité & performance

## `projets`

### 🟢 KITERIDER — kit de suivi pour kite-surfeur

[![C++](https://img.shields.io/badge/C++-00599C?logo=cplusplus&logoColor=white&style=flat-square)](https://isocpp.org/)
[![ESP32](https://img.shields.io/badge/ESP32-000?logo=espressif&logoColor=orange&style=flat-square)](https://docs.espressif.com/)
[![PlatformIO](https://img.shields.io/badge/PlatformIO-000?logo=platformio&logoColor=orange&style=flat-square)](https://platformio.org/)

> Deux cartes **TTGO T-Beam** (ESP32 + SX1276 + GPS) qui transmettent la position
> du rider et la météo du spot en **LoRaWAN**, toutes les 30 secondes.

- **Balise embarquée** — GPS TinyGPS++ sur UART1, fix validé si les données ont moins de 5 s, payload binaire **Big-Endian de 14 octets** : lat/lon au millionième (≈ 11 cm), altitude, vitesse ×10, nombre de satellites, flag de fix.
- **Station météo** — anémomètre à contact reed compté par une **ISR en RAM** sur une fenêtre de mesure, girouette lue sur l'ADC 12 bits et convertie en 8 secteurs (N, NE, E…), payload de **4 octets**.
- **Radio** — LMIC + SX1276 en SPI, ACC demandé à chaque trame, duty cycle respecté, alimentation de la radio gérée par la puce AXP192.
- **Serveur** — ChirpStack : chaque carte a son propre jeu de clés et son propre payload à décoder.

```text
balise gps   →  [aa bb cc dd ee ff gg hh] lat  × 1e6   (4 o)
                [ii jj kk ll]           lon  × 1e6   (4 o)
                [mm nn]                 alt  m       (2 o)
                [oo pp]                 vit  km/h ×10(2 o)
                [qq]                    satellites   (1 o)
                [rr]                    flag fix     (1 o)

station météo →  [ss tt]  vitesse × 10  (2 o)
                [uu vv]  girouette ADC  (2 o)
```

### 🟢 PARTICULA — moteur de particules temps réel

[![HTML](https://img.shields.io/badge/HTML-000?logo=html5&logoColor=orange&style=flat-square)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS-000?logo=css3&logoColor=blue&style=flat-square)](https://developer.mozilla.org/docs/Web/CSS)
[![JS](https://img.shields.io/badge/JS-000?logo=javascript&logoColor=yellow&style=flat-square)](https://developer.mozilla.org/docs/Web/JavaScript)

> Une expérience web entièrement générée en temps réel : particules, typographie
> vivante et physique de projection. Zéro image, zéro vidéo, 100 % code.

- 5 distributions (sphère, galaxie, hélice, cube, **texte**) sur un moteur unique
- Typographie rasterisée pixel par pixel puis simulée en ressorts
- Terrain interactif : densité, rotation, teinte, rémanence, ondes de choc
- Sprites mis en cache par teinte, boucle `requestAnimationFrame` unique
- `prefers-reduced-motion` respecté · responsive 320 px → 4K

### ⚫ PROJET_03 — emplacement réservé

> Le prochain projet n'apparaît que lorsqu'il est terminé.

## `parcours`

```text
[ début ]       Découverte du web   →  premier HTML, premier <style>
[ en cours ]    TryHackMe           →  HTML & CSS : box model, flex, grid, responsive
[ maintenant ]  Projets complets    →  KiteRider (LoRaWAN), PARTICULA (canvas)
[ ensuite ]     WebGL / TS / low power
```

📚 **Apprentissage CSS sur [TryHackMe](https://tryhackme.com)**

J'ai appris les fondamentaux du web sur TryHackMe : sélecteurs, cascade,
spécificité, box model, flexbox, CSS grid, media queries, variables,
animations et transitions. Le CSS est devenu mon point fort — c'est le langage
qui donne directement le contrôle sur ce que l'utilisateur voit, et j'aime cette
sensation de pouvoir tout déplacer, tout déformer, tout mélanger.

Chaque notion est ensuite appliquée dans un projet : c'est comme ça que
PARTICULA est né.

🔧 **Côté embarqué**, KiteRider m'a appris qu'un projet réel ne s'arrête pas au
code : il y a le câblage, le pont filaire soudé sur `DIO1`, le pont d'alimentation
de la radio, et un payload qui doit tenir dans quelques octets pour respecter le
duty cycle LoRaWAN.

## `statistiques`

<p align="center">
  <img height="165" src="https://github-readme-stats.vercel.app/api?username=vieuxchatLsd59&show_icons=true&theme=greenhack&hide_border=true" alt="Stats GitHub de vieuxchatLsd59" />
  <img height="165" src="https://github-readme-streak-stats.herokuapp.com?user=vieuxchatLsd59&theme=greenhack&hide_border=true" alt="Streak de commits" />
</p>

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api/top-langs?username=vieuxchatLsd59&layout=compact&theme=greenhack&hide_border=true" alt="Langages les plus utilisés" />
</p>

## `contact`

| | |
|---|---|
| 📧 Email | [ismaelberrdbz@gmail.com](mailto:ismaelberrdbz@gmail.com) |
| 💻 GitHub | [github.com/vieuxchatLsd59](https://github.com/vieuxchatLsd59) |
| 💼 LinkedIn | [linkedin.com/in/ismaelberrazzag](https://www.linkedin.com/in/ismaelberrazzag) |
| 🎮 Discord | [@vieuxchatlsd](https://discord.com/) |
| 🏴 TryHackMe | en cours de constitution du profil |
| 🟢 Statut | disponible pour un projet |

```text
$ contact --send "j'ai un projet"
réponse sous 48 h — probablement avec du café à côté du clavier
```

---

<div align="center">

**[Isamel Berrazzag](https://github.com/vieuxchatLsd59)** — portfolio one-page :
[voir le site](https://vieuxchatlsd59.github.io/) ·
[LinkedIn](https://www.linkedin.com/in/ismaelberrazzag) ·
[Email](mailto:ismaelberrdbz@gmail.com) ·
Discord `@vieuxchatlsd`

`fermé le 2>&1 | return 0`

</div>

---

> ⚠️ **À personnaliser :**
> 1. Portfolio publié sur `https://vieuxchatlsd59.github.io/` — les liens du README
>    pointent déjà vers la bonne adresse. ✅
> 2. Ajoute le lien de ton profil TryHackMe quand il existe (actuellement :
>    la page d'accueil est liée à la place).
> 3. Si tu publies le code de KiteRider, **régénère les clés LoRaWAN**
>    (`DEVEUI` / `APPEUI` / `APPKEY`) et ne commite jamais les vraies.
