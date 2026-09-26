# Shuffleklubben

Bordsshuffleboard i 3D för mobil, surfplatta och dator. Glid puckarna längs det blanka lönnbordet, lägg dem i zonerna,
häng dem över kanten eller slå ut motståndarnas.

**Spela:** https://danielnilssonit.github.io/shuffleklubben/

- **Online:** tryck på *Spela online*. Skapa ett bord och dela länken med vänner, eller tryck på *Snabbmatch* för att möta den som är online. Upp till fyra vid samma bord, var och en i sin egen telefon eller platta.
- **Mot datorn** (lätt, medel eller svår), **flera på samma skärm** och **träning**.
- Klassisk räkning (bara den som ligger längst bort får poäng), *alla räknar*, *hängarjakt* eller *sist kvar*. Först till 7, 11, 15 eller 21.
- **Pubkväll på TV:** TV:n visar bordet och telefonerna blir handkontroller. En match eller en turnering för upp till åtta.
- **Pubturnén** genom sex pubar, **utmaningar** med en ny varje dag och veckans topplista, **märken** som låser upp puckar, hattar och bordsytor.
- På iPhone och iPad: *Dela → Lägg till på hemskärmen*, så startar spelet som en app.

Spelarna hittar varandra via öppna MQTT-servrar (inga konton, ingen egen server). Alla kör samma deterministiska fysik,
så ett kast skickas bara som fart och riktning och blir exakt likadant på alla skärmar. Den som skapar bordet räknar poängen.
Namnen man väljer syns för andra i lobbyn.

3D-modellerna är gjorda i Blender, musiken med Suno, speakern, stamgästernas röster och ljuden med ElevenLabs, och spelet använder Three.js. Den här mappen byggs automatiskt (tools/build-pages.mjs i projektet).
