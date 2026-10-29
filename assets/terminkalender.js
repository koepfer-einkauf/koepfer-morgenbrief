(() => {
  "use strict";
  const calendar = document.querySelector("#kalender.calendar-ui");
  if (!calendar) return;
  const events = [
    {start:"2026-11-23",end:"2026-11-24",cat:"industrie",label:"Kapitalmarkttag",title:"BASF Capital Markets Day 2026",text:"BASF stellt am 23. und 24. November seine strategische und finanzielle Entwicklung vor. Aussagen zu Investitionen, Standorten, Kapazitäten und Portfoliomaßnahmen auf konkrete Beschaffungsfolgen prüfen.",source:"BASF Investor Relations",url:"https://www.basf.com/global/en/investors"},
    {start:"2026-10-27",end:"2026-10-29",cat:"industrie",label:"Zuliefermesse",title:"Internationale Zuliefererbörse IZB 2026",text:"Die Automotive-Zuliefermesse in Wolfsburg bietet vom 27. bis 29. Oktober eine Plattform für Vernetzung, Innovationen und Geschäftsanbahnung. Messeankündigungen vor Qualifizierung nicht als gesicherte Kapazität bewerten.",source:"IZB / Wolfsburg AG",url:"https://www.izb-online.com/aktuelles-presse/newsuebersicht/detail/update-izb-2026-verschoben-neuer-termin-27-bis-29-oktober-2026"},
    {start:"2026-10-29",end:"2026-10-30",cat:"logistik",label:"Streikrisiko",title:"Internationaler Hafenaktionstag und italienische Verkehrsstreiks",text:"Für den 30. Oktober kündigen Gewerkschaften Aktionen in mehr als 100 Häfen an; Italien ist zusätzlich von General-, Bahn- und Hafenstreiks betroffen. Beteiligung, lokale Auswirkungen und mögliche staatliche Einschränkungen kurzfristig bestätigen.",source:"USB und italienisches Infrastruktur- und Verkehrsministerium",url:"https://www.usb.it/leggi-notizia/i-lavoratori-portuali-non-lavorano-per-la-guerra-30-ottobre-seconda-giornata-internazionale-di-azione-100-porti-17-paesi-e-4-continenti-1802.html"},
    {start:"2026-10-26",end:"2026-11-20",cat:"logistik",label:"Baustelle",title:"Furtwangen B 500: Leitungsarbeiten in der Wilhelmstraße",text:"Die rund neun Meter lange Arbeitsstelle verändert die Verkehrsführung; die angegebene Restbreite beträgt drei Meter. Keine Vollsperrung, aber Begegnungsverkehr und breite Fahrzeuge vor der Anfahrt prüfen.",source:"Verkehrswarndienst Baden-Württemberg via news.de",url:"https://www.news.de/auto/860133355/verkehrsmeldung-zur-baustelle-furtwangen-im-schwarzwald-verwaltungsgemeinschaft-furtwangen-im-schwarzwald-baden-wuerttemberg-stoerung-wegen-leitungsarbeiten-von-26-10-2026-bis-20-11-2026-auf-b500-wilhelmstrasse/1/"},
    {start:"2026-10-26",end:"2026-10-30",cat:"logistik",label:"Bahnübergang",title:"Marbach: Sperrung Steinwiesenstraße",text:"Die Deutsche Bahn saniert den Bahnübergang in der Steinwiesenstraße. Für die Dauer der Sperrung ist eine örtliche Umleitung eingerichtet und ausgeschildert.",source:"Stadt Villingen-Schwenningen, 23.10.2026",url:"https://www.villingen-schwenningen.de/rathaus-leben/aktuelle-stadtmeldungen/detailansicht/bahnuebergang-in-marbach-wird-saniert-1/"},
    {start:"2026-08-24",end:"2026-10-31",cat:"logistik",label:"Vollsperrung",title:"Furtwangen-Rohrbach: Holzdobelweg gesperrt",text:"Der Holzdobelweg ist wegen Sanierungsarbeiten komplett gesperrt. Eine Umleitung ist ausgeschildert.",source:"Stadt Furtwangen",url:"https://www.furtwangen.de/rathaus-service/aktuelles/neuigkeiten/480/vollsperrung-holzdobelweg"},
    {start:"2027-10-31",cat:"compliance",label:"Sanktionsreview",title:"EU-Regime gegen ISIL/Da’esh und Al-Qaida: aktuelles Ablaufdatum",text:"Die autonomen EU-Sanktionen mit Vermögenssperren, Einreiseverboten und Bereitstellungsverbot wurden bis zu diesem Datum verlängert. Vorher auf erneute politische Verlängerung oder Änderungen prüfen.",source:"Rat der Europäischen Union, 26.10.2026",url:"https://www.consilium.europa.eu/en/press/press-releases/2026/10/26/eu-sanctions-against-isilda-esh-and-al-qaeda-council-renews-regime-until-2027/"},
    {start:"2026-11-24",cat:"industrie",label:"Tarifverhandlung",title:"Volkswagen und IG Metall starten Verhandlungen",text:"Auftakt zu den gekündigten Tarifverträgen und beiderseitigen Forderungen am Standort Emden. Arbeitskosten, Personalinstrumente und Umsetzung des Zukunftsplans stehen im Fokus.",source:"Volkswagen Group, 23.10.2026",url:"https://www.volkswagen-group.com/de/pressemitteilungen/zweites-ueberpruefungsgespraech-volkswagen-ag-und-ig-metall-einigen-sich-auf-den-start-von-verhandlungen-20757"},
    {start:"2026-12-15",cat:"industrie",label:"Tarifverhandlung",title:"Volkswagen und IG Metall setzen Verhandlungen fort",text:"Zweite vereinbarte Tarifrunde am Standort Zwickau. Ergebnisse und mögliche Auswirkungen auf Werke, Programme und Personalmaßnahmen getrennt prüfen.",source:"Volkswagen Group, 23.10.2026",url:"https://www.volkswagen-group.com/de/pressemitteilungen/zweites-ueberpruefungsgespraech-volkswagen-ag-und-ig-metall-einigen-sich-auf-den-start-von-verhandlungen-20757"},
    {start:"2026-11-18",end:"2026-11-19",cat:"industrie",label:"Recycling",title:"CMA Summit 2026 in Berlin",text:"Die Branchenveranstaltung zu Stahl- und Metallrecycling findet am 18. und 19. November 2026 in Berlin statt. Fuer Schrottmarkt und Sekundaerrohstoffe relevant.",source:"BDSV / Circular Metal Association",url:"https://www.bdsv.org/unser-service/termine/termin/tx_news/save-the-date-cma-summit-2026/"},
    {start:"2026-11-21",cat:"compliance",label:"Abfallexport",title:"EU: Ausfuhr von Kunststoffabfaellen in Nicht-OECD-Laender untersagt",text:"Ab 21. November 2026 greift laut EU-Kommission das Exportverbot fuer Kunststoffabfaelle in Laender ausserhalb der OECD. Relevanz fuer Verpackung und Recycling pruefen.",source:"EU-Kommission, Waste shipments",url:"https://environment.ec.europa.eu/topics/waste-and-recycling/waste-shipments_en"},
    {start:"2027-05-21",cat:"handel",label:"EU-Abfallrecht",title:"EU: strengere Abfallexportregeln ab 21. Mai 2027",text:"Neue Regeln fuer den Export nicht gefaehrlicher Abfaelle, auch von Sekundaerrohstoffen, gelten ab 21. Mai 2027. Ausfuhren in Nicht-OECD-Staaten sind nur unter bestimmten Voraussetzungen erlaubt.",source:"EU-Kommission, Waste shipments",url:"https://environment.ec.europa.eu/topics/waste-and-recycling/waste-shipments_en"},
    {start:"2026-10-30",cat:"industrie",label:"BIP",title:"Q3 BIP Schnellmeldung",text:"Destatis erwartet die erste Schnellmeldung zum BIP im dritten Quartal. Die Bundesbank rechnet mit Stagnation, ein Endergebnis ist nicht bekannt.",source:"Bundesbank, 21.10.2026",url:"https://www.bundesbank.de/de/aufgaben/themen/erholung-der-deutschen-wirtschaft-voruebergehend-unterbrochen-1012556"},
    {start:"2026-10-22",cat:"industrie",label:"EU-Gesetzgebung",title:"EU-Autoregeln: Stellungnahmen von Verkehrs- und Industrieausschuss erwartet",text:"Nach dem am 20. Oktober gemeldeten Kompromiss der Unterhändler zum CO₂-Ziel für Neuwagen sind für Donnerstag Abstimmungen beziehungsweise Positionierungen der Ausschüsse für Verkehr und Industrie geplant. Der federführende Umweltausschuss soll erst im November, das Plenum voraussichtlich im Dezember entscheiden. Kein geltender Gesetzesbeschluss.",source:"Tagesschau, ARD Brüssel, 20.10.2026",url:"https://www.tagesschau.de/ausland/europa/verbrenner-aus-eu-108.html"},
    {start:"2026-11-04",cat:"industrie",label:"Quartalsbericht",title:"Solvay veröffentlicht Q3-Ergebnisse nach Prognosesenkung",text:"Solvay hat nach den vorläufigen Q3-Zahlen und dem länger andauernden Produktionsstillstand der Peroxid-Anlage in Jubail für den 4. November 2026 die regulären Quartalsergebnisse angekündigt. Konkrete Folgen für industrielle Chemikalienlieferungen sind anhand der Ergebnisse zu prüfen.",source:"Solvay, Mitteilung zu vorläufigen Q3-Zahlen 2026",url:"https://www.solvay.com/en/press-release/solvay-reports-preliminary-q3-2026-results-and-updates-full-year-2026-guidance"},
    {start:"2026-10-27",cat:"industrie",label:"Tarifrunde",title:"Metalltarif: zweite Verhandlungen in Bayern, Küste, Niedersachsen und NRW",text:"Am 27. Oktober 2026 finden laut IG Metall weitere zweite Tarifverhandlungen in Bayern (Coburg), im Tarifgebiet Küste (Oldenburg), in Niedersachsen und in Nordrhein-Westfalen statt. Keine Tarifeinigung vorwegnehmen. Die Friedenspflicht endet am 31. Oktober.",source:"IG Metall, aktualisierte Terminübersicht vom 19.10.2026",url:"https://www.igmetall.de/tarif/tarifrunden/metall-und-elektro/aktionen-zur-metall-tarifrunde"},
    {start:"2027-01-01",cat:"industrie",label:"Förderstruktur",title:"Mittelstand-Digital: neues Netz der Zentren startet",text:"Das Bundeswirtschaftsministerium startet ab dem 1. Januar 2027 ein neues Netz kostenfreier, anbieterneutraler Mittelstand-Digital Zentren. Bis Mitte 2027 sollen sechs regionale und elf spezialisierte Zentren entstehen. Für Beschaffung, Digitalisierung, Industrie-KI und Cybersicherheit als Unterstützungsangebot relevant; Eröffnungen der Einzelzentren folgen separat.",source:"Bundesministerium für Wirtschaft und Energie, 20.10.2026",url:"https://www.bundeswirtschaftsministerium.de/Redaktion/DE/Pressemitteilungen/2026/10/20261020-netzwerk-mittelstand-digital-zentren.html"},
    {start:"2026-10-23",end:"2026-10-30",cat:"logistik",label:"Vollsperrung",title:"B 33 Gutach–Hornberg: Vollsperrung mit großräumiger Umleitung",text:"Vom 23. Oktober 2026, 14 Uhr, bis voraussichtlich 30. Oktober, 18 Uhr, ist die B 33 zwischen dem Nordportal des Hornbergtunnels und Hohweg/Schondelmaier-Kurve gesperrt. Keine innerörtliche Umleitung; Anlieferungen und Transporte frühzeitig umplanen. Witterungsbedingte Verlängerung möglich.",source:"Regierungspräsidium Freiburg, 06.10.2026",url:"https://rpf.baden-wuerttemberg.de/en/service/presse/medienmitteilungen/artikel/b-33-zwischen-gutach-und-hornberg-ortenaukreis-von-23-bis-30-oktober-voll-gesperrt/"},
    {start:"2026-10-28",end:"2026-10-30",cat:"industrie",label:"Tarifrunde",title:"Metall- und Elektroindustrie: weitere zweite Verhandlungsrunden",text:"28. Oktober: Mittelgruppe (Hessen, Rheinland-Pfalz, Saarland) und Thüringen. 29. Oktober: Berlin-Brandenburg und Sachsen-Anhalt. 30. Oktober: Osnabrück-Emsland-Grafschaft Bentheim. Es handelt sich um Verhandlungstermine, nicht um zugesagte Abschlüsse; die Friedenspflicht endet am 31. Oktober.",source:"IG Metall, Übersicht vom 19.10.2026",url:"https://www.igmetall.de/tarif/tarifrunden/metall-und-elektro/aktionen-zur-metall-tarifrunde"},
    {start:"2026-12-14",cat:"energie",label:"Förderfrist",title:"CO₂-Differenzverträge 2027: Ende des Vorverfahrens",text:"Die Teilnahme am Vorverfahren bis 14. Dezember 2026 ist Voraussetzung für das geplante Gebotsverfahren im Mai 2027. Die Durchführung steht noch unter Haushaltsvorbehalt und erfordert die EU-Beihilfegenehmigung.",source:"BMWE und CO₂-Differenzverträge, 19.10.2026",url:"https://www.co2-differenzvertraege.info/thema/dokumente/vorverfahren-2027"},
    {start:"2026-12-06",cat:"industrie",label:"Förderfrist",title:"Industrie und Klimaschutz: Projektskizzenfrist BIK",text:"Unternehmen können bis 6. Dezember 2026 Projektskizzen für Forschungs- und Entwicklungsvorhaben zu CO₂-armen industriellen Technologien einreichen. Verbindliche Förderbedingungen und Aufruf beachten.",source:"BMWE, 14.10.2026",url:"https://www.bundeswirtschaftsministerium.de/Redaktion/DE/Pressemitteilungen/2026/10/20261014-bundesfoerderung-industrie-klimaschutz.html"},
    {start:"2026-10-19",end:"2026-10-23",cat:"logistik",label:"Straßensperren",title:"Villingen: Deckentausch an Bertholdstraße, Warenburgstraße und Romäusring",text:"Vom 19. bis voraussichtlich 23. Oktober sind abschnittsweise stadteinwärts führende Spuren und weitere Teilstücke gesperrt. Örtliche Umleitungen und Halteverbote beachten; Abschluss witterungsabhängig.",source:"Stadt Villingen-Schwenningen, 14.10.2026",url:"https://www.villingen-schwenningen.de/topthemen/strassensanierung-deckentausch-in-bertholdstrasse-warenburgstrasse-und-romaeusring/"},
    {start:"2026-10-26",end:"2026-10-30",cat:"logistik",label:"Bauabschnitt",title:"Villingen: zweiter Bauabschnitt Romäusring",text:"Vom 26. bis voraussichtlich 30. Oktober ist der Abschnitt Romäusring/Zinsergasse über die Kreuzung Kalkofenstraße/Zähringerstraße bis zum Gymnasium voll gesperrt. Zinsergasse gesperrt; keine Durchfahrt vom Romäusring in die Zähringerstraße; Umleitung über Kalkofenstraße.",source:"Stadt Villingen-Schwenningen, 22.10.2026",url:"https://www.villingen-schwenningen.de/rathaus-leben/aktuelle-stadtmeldungen/detailansicht/zweiter-bauabschnitt-des-deckentauschs-im-romaeusring/"},
    {start:"2026-11-06",cat:"industrie",label:"Quartalsbericht",title:"Krones veröffentlicht Q3-Bericht 2026",text:"Nach der Prognoseanpassung vom 22. Oktober veröffentlicht Krones am 6. November den Bericht zum dritten Quartal. Vorabzahlen und endgültigen Bericht getrennt bewerten.",source:"Krones, 22.10.2026",url:"https://www.krones.com/en/company/investor-relations/ad-hoc-disclosure-krones-adjusts-its-revenue-growth-forecast-for-fiscal-year-2026-and-medium-term-targets-for-2028.php"},
    {start:"2026-11-15",cat:"handel",label:"Stellungnahmefrist",title:"China: Ende der Konsultation zu Exportkontrollen für 40 Technologien",text:"Bis 15. November können Stellungnahmen zum Entwurf neuer Exportverbote und Genehmigungspflichten für KI-, Photovoltaik- und Biotechnologien eingereicht werden. Unabhängig davon gilt bereits eine vorläufige Registrierung vor bestimmten Technologieexporten aus China.",source:"Chinesisches Handelsministerium, Mitteilung Nr. 48/2026 vom 16.10.2026",url:"https://www.mofcom.gov.cn/zfxxgk/gkml/art/2026/art_ccd0391072a94c809ae7e820abe2536b.html"},
    {start:"2026-10-19",end:"2026-10-19",cat:"industrie",label:"Investitionsgipfel",title:"Invest in Germany Summit in Berlin",text:"Bundesregierung empfängt internationale Investoren; konkrete Industrie- und KI-Investitionsprojekte werden vorgestellt. Ankündigungen erst nach belegten Projektzusagen als Kapazitäten bewerten.",source:"Bundesregierung, Terminvorschau",url:"https://www.bundesregierung.de/breg-de/service/newsletter-und-abos/bundesregierung-aktuell/ausgabe-35-2026-oktober-16-2456956?view=renderNewsletterHtml"},
    {start:"2026-10-22",end:"2026-10-22",cat:"industrie",label:"Automobilmarkt",title:"ACEA veröffentlicht europäische Pkw-Neuzulassungen für September",text:"Angekündigte Neuzulassungsdaten für September als Hinweis auf Kundennachfrage und mögliche Abruftrends beobachten. Veröffentlichungstermin laut Wirtschaftskalender.",source:"ACEA, Veröffentlichungskalender 2026",url:"https://www.acea.auto/press-release-calendar/"},
    {start:"2026-10-12",end:"2026-10-23",cat:"logistik",label:"Straßensperre",title:"Villingen-Schwenningen: Fahrbahnsanierung Schillerstraße und Justinus-Kerner-Straße",text:"Die angekündigten Vollsperrungen sollen bis voraussichtlich 23. Oktober dauern; für lokale Anlieferungen Umleitungen und aktuellen Baustellenstand prüfen.",source:"Stadt Villingen-Schwenningen",url:"https://www.villingen-schwenningen.de/rathaus-leben/aktuelle-stadtmeldungen/detailansicht/fahrbahnsanierung-in-der-justinus-kerner-strasse-und-schillerstrasse-vollsperrung-vom-12-bis-voraussichtlich-23-oktober/"},
    {start:"2026-10-15",end:"2026-10-16",cat:"energie",label:"EU-Gipfel",title:"Europäischer Rat berät Energiepreise und Wettbewerbsfähigkeit",text:"Die Staats- und Regierungschefs diskutieren befristete Entlastungsmöglichkeiten für hohe Energiepreise und den Binnenmarkt. Beschlüsse und Folgeakte sind erst nach offizieller Veröffentlichung verbindlich.",source:"Europäischer Rat",url:"https://www.consilium.europa.eu/en/meetings/european-council/2026/10/15-16/"},
    {start:"2026-10-19",end:"2026-10-23",cat:"logistik",label:"Nachtsperren",title:"Freiburg B31 Ost: nächtliche Tunnel- und Galeriesperrungen",text:"Wartungsarbeiten an den B31-Ost-Tunnelanlagen mit Sperrungen in den Nächten von 20 bis 6 Uhr; die letzte Nacht ist als Reserve vorgesehen. Nachttransporte rechtzeitig umleiten.",source:"Stadt Freiburg",url:"https://www.freiburg.de/pb/2654640.html"},
    {start:"2026-10-27",cat:"industrie",label:"Tarifrunde",title:"Metall- und Elektrotarif Baden-Württemberg: zweite Verhandlung",text:"IG Metall nennt den 27. Oktober als Termin der zweiten regionalen Tarifverhandlung, der Ort ist noch offen. Ergebnisse sind nicht vorwegzunehmen.",source:"IG Metall, Terminübersicht",url:"https://www.igmetall.de/presse/termine/2026/tarifrunde-metall-und-elektroindustrie-2026"},
    {start:"2026-10-27",cat:"industrie",label:"Tarifrunde",title:"Metall- und Elektrotarif Sachsen: zweite Verhandlung in Dresden",text:"Nach dem Auftakt ohne Arbeitgeberangebot folgen am 27. Oktober in Dresden weitere Verhandlungen. Kein bereits bekanntes Tarifergebnis.",source:"IG Metall, Terminübersicht",url:"https://www.igmetall.de/presse/termine/2026/tarifrunde-metall-und-elektroindustrie-2026"},
    {start:"2026-10-31",cat:"industrie",label:"Tariffrist",title:"Metall- und Elektroindustrie: tarifliche Friedenspflicht endet",text:"Laut IG Metall endet die Friedenspflicht mit dem 31. Oktober 2026. Ab November können Warnstreiks rechtlich möglich werden; tatsächliche Aktionen sind nicht vorweggenommen.",source:"IG Metall, Terminübersicht",url:"https://www.igmetall.de/presse/termine/2026/tarifrunde-metall-und-elektroindustrie-2026"},
    {start:"2026-09-30",cat:"handel",label:"Frist",title:"EU-Stahl: Konsultation zur Ausweitung des Produktumfangs endet",text:"Die Kommission prüft unter anderem Drähte, Edelstahldrähte und geschmiedete Stäbe für eine mögliche Aufnahme in die EU-Stahlmaßnahmen. Für betroffene CN-Codes kann sich die Import- und Preislandschaft ändern.",source:"Europäische Kommission",url:"https://policy.trade.ec.europa.eu/consultations/targeted-consultation-first-product-scope-review-under-eu-steel-regulation_en"},
    {start:"2026-10-01",end:"2026-10-07",cat:"logistik",label:"China",title:"China National Day: siebentägige Feiertagsphase",text:"Landesweite Feiertage können Produktion, Abfertigung, Spedition und Reaktionszeiten chinesischer Lieferanten verzögern. Der 10. Oktober ist laut offiziellem Kalender ein Ausgleichs-Arbeitstag.",source:"Staatsrat der Volksrepublik China",url:"https://big5.www.gov.cn/gate/big5/www.gov.cn/zhengce/zhengceku/202511/content_7047091.htm"},
    {start:"2026-10-09",cat:"geopolitik",label:"Review",title:"EU-Sanktionsrahmen zu russischen hybriden Aktivitäten: aktuelles Ablaufdatum",text:"Die bestehenden restriktiven Maßnahmen gegen destabilisierende russische Aktivitäten im Ausland laufen nach aktuellem Beschluss bis zu diesem Datum. Vorher ist mit einer politischen Überprüfung beziehungsweise möglicher Verlängerung zu rechnen.",source:"Rat der Europäischen Union",url:"https://www.consilium.europa.eu/en/policies/sanctions-against-russia/timeline-sanctions-against-russia/"},
    {start:"2026-11-30",end:"2026-12-04",cat:"logistik",label:"IMO",title:"MEPC 85 und mögliche Fortsetzung der IMO-Net-Zero-Verhandlungen",text:"Das globale Schifffahrtsgremium tagt vom 30. November bis 3. Dezember; für den 4. Dezember ist vorbehaltlich Bestätigung die Fortsetzung der außerordentlichen Sitzung zum Net-Zero-Rahmen vorgesehen.",source:"International Maritime Organization",url:"https://www.imo.org/en/mediacentre/meetingsummaries/pages/temporary-mepc-84th-session.aspx"},
    {start:"2026-12-01",cat:"energie",label:"Zielkorridor",title:"EU-Gasspeicher: Ende des flexiblen 90-Prozent-Zielkorridors",text:"Die verlängerten Speicherregeln geben den Mitgliedstaaten jährlich vom 1. Oktober bis 1. Dezember Zeit, das 90-Prozent-Ziel zu erreichen. Der Speicherstand bleibt ein relevanter Frühindikator für europäische Gas- und Industriepreise.",source:"Europäische Kommission",url:"https://energy.ec.europa.eu/topics/energy-security/gas-storage_en"},
    {start:"2026-12-11",cat:"compliance",label:"CRA",title:"Cyber Resilience Act: ausreichende Konformitätsbewertungsstellen vorgesehen",text:"Die EU-Umsetzungsplanung sieht bis zu diesem Datum ausreichende notifizierte Konformitätsbewertungsstellen in den Mitgliedstaaten vor.",source:"Europäische Kommission",url:"https://digital-strategy.ec.europa.eu/en/factpages/cyber-resilience-act-implementation"},
    {start:"2026-12-30",cat:"compliance",label:"EUDR",title:"EU-Entwaldungsverordnung gilt für große und mittlere Marktteilnehmer",text:"Ab diesem Datum greifen die EUDR-Pflichten für große und mittlere Betreiber sowie für bestimmte kleinere Unternehmen. Relevante Rohstoffe sind unter anderem Kautschuk und Holz.",source:"Europäische Kommission",url:"https://environment.ec.europa.eu/topics/forests/deforestation/regulation-deforestation-free-products_en"},
    {start:"2026-12-31",cat:"handel",label:"Prüffrist",title:"EU-Kommission muss erste Stahl-Produktbereichsprüfung abschließen",text:"Bis Jahresende muss die Kommission bewerten, ob weitere Produktgruppen wie bestimmte Drähte und geschmiedete Stäbe in den Geltungsbereich der EU-Stahlregelung aufgenommen werden sollen.",source:"Europäische Kommission",url:"https://policy.trade.ec.europa.eu/consultations/targeted-consultation-first-product-scope-review-under-eu-steel-regulation_en"},
    {start:"2027-01-01",cat:"handel",label:"UK-CBAM",title:"Vereinigtes Königreich führt Carbon Border Adjustment Mechanism ein",text:"Der britische CBAM startet für bestimmte Importe aus Aluminium, Zement, Düngemitteln, Wasserstoff sowie Eisen und Stahl.",source:"HM Revenue & Customs",url:"https://www.gov.uk/government/publications/introduction-of-carbon-border-adjustment-mechanism/carbon-border-adjustment-mechanism"},
    {start:"2027-03-31",cat:"energie",label:"Rechtsfrist",title:"Deutschland: Gesetzliche Gasspeicherfüllstandsvorgaben laufen nach aktuellem Recht aus",text:"Nach § 35i EnWG gelten die §§ 35a bis 35e sowie §§ 35g und 35h bis einschließlich 31. März 2027. Eine nationale Gasreserve als künftige Krisenvorsorge ist Gegenstand eines Gesetzesvorhabens. Die Rechtslage vor Fristende erneut prüfen; keine bereits beschlossene Verlängerung oder Nachfolgeregelung unterstellen.",source:"Energiewirtschaftsgesetz, § 35i (amtlicher Gesetzestext)",url:"https://www.gesetze-im-internet.de/enwg_2005/__35i.html"},
    {start:"2027-04-05",end:"2027-04-08",cat:"industrie",label:"Industrie",title:"HANNOVER MESSE 2027",text:"Die internationale Industriemesse bündelt Maschinenbau, Elektro- und Digitalindustrie sowie Energiewirtschaft. Für Einkauf und Lieferantenmanagement ist sie ein Frühindikator für Automatisierung, KI, Energie, Produktionstechnik und neue Anbieter.",source:"HANNOVER MESSE",url:"https://www.hannovermesse.de/de/fuer-besucher/oeffnungszeiten/"},
    {start:"2027-06-23",cat:"geopolitik",label:"Review",title:"EU-Sanktionen wegen der Annexion der Krim: aktuelles Ablaufdatum",text:"Die maßnahmenbezogenen Beschränkungen wurden bis zu diesem Datum verlängert. Für Lieferanten- und Transaktionsscreening ist die weitere politische Verlängerung beziehungsweise Anpassung zu beobachten.",source:"Rat der Europäischen Union",url:"https://www.consilium.europa.eu/en/press/press-releases/2026/06/15/russia-s-war-of-aggression-against-ukraine-new-eu-sanctions-target-energy-revenues-the-military-industrial-complex-propaganda-and-human-rights-violations/"},
    {start:"2027-07-31",cat:"geopolitik",label:"Review",title:"EU-Wirtschaftssanktionen gegen Russland: aktuelles Ablaufdatum",text:"Die sektoralen Wirtschaftssanktionen zu Handel, Finanzen, Energie, Dual-Use und Transport wurden im Juni 2026 für zwölf Monate bis Ende Juli 2027 verlängert.",source:"Rat der Europäischen Union",url:"https://www.consilium.europa.eu/en/press/press-releases/2026/06/25/russia-s-war-of-aggression-against-ukraine-council-extends-economic-sanctions-for-another-year/"},
    {start:"2027-08-18",cat:"compliance",label:"Batterien",title:"EU-Batterieverordnung: Sorgfaltspflichten starten",text:"Ab diesem Datum gelten die Batterie-Sorgfaltspflichten für erfasste Wirtschaftsakteure. Dazu gehören Due-Diligence-Strategien und unabhängige Prüfung entlang relevanter Rohstoffketten.",source:"EUR-Lex",url:"https://eur-lex.europa.eu/legal-content/EN/TXT/?qid=1775489433349&uri=CELEX%3A02023R1542-20250731"},
    {start:"2027-09-01",cat:"logistik",label:"IMO",title:"Nordostatlantik-Emissionskontrollgebiet tritt in Kraft",text:"Das neue IMO-Emissionskontrollgebiet im Nordostatlantik tritt formal in Kraft; die verschärften Grenzwerte werden zwölf Monate später wirksam.",source:"International Maritime Organization",url:"https://www.imo.org/en/mediacentre/meetingsummaries/pages/temporary-mepc-84th-session.aspx"},
    {start:"2027-09-07",end:"2027-09-12",cat:"industrie",label:"Automotive",title:"IAA MOBILITY 2027 in München",text:"Der internationale Mobilitätstreff startet am 7. September. Für Automotive-Einkauf relevant sind neue Plattformen, Software-defined Vehicles, Elektrifizierung, autonome Systeme und Lieferantenankündigungen.",source:"IAA MOBILITY",url:"https://www.iaa-mobility.com/de"},
    {start:"2027-10-01",cat:"energie",label:"Gesetzentwurf",title:"Gasreserve: geplanter erstmaliger Beginn einer neuen Gasumlage",text:"Ein Referentenentwurf des Bundeswirtschaftsministeriums sieht eine erstmalige Erhebung der Umlage zur Finanzierung einer nationalen Gasreserve ab 1. Oktober 2027 vor. Noch kein geltendes Gesetz: Startdatum, Höhe und Regelungsdetails können sich ändern. Für gasintensive Lieferanten und langfristige Verträge beobachten.",source:"Reuters / t-online, 13.10.2026 (Referentenentwurf)",url:"https://www.t-online.de/finanzen/energie/id_101479418/katherina-reiche-legt-gas-gesetz-vor-neue-umlage-soll-2027-kommen.html"},
    {start:"2027-11-29",cat:"logistik",label:"IMO",title:"HNS-Übereinkommen für gefährliche und schädliche Stoffe tritt in Kraft",text:"Das internationale Haftungs- und Entschädigungsregime für Unfälle mit gefährlichen und schädlichen Stoffen auf See wird wirksam.",source:"International Maritime Organization",url:"https://www.imo.org/en/mediacentre/pressbriefings/pages/imo-hns-treaty-to-enter-into-force-in-2027-.aspx"},
    {start:"2027-12-02",cat:"compliance",label:"AI Act",title:"EU-AI-Act: neue Frist für bestimmte Hochrisiko-Systeme",text:"Nach dem angepassten Zeitplan gelten die Vorgaben für Hochrisiko-KI in Bereichen wie Beschäftigung, kritischer Infrastruktur und weiteren sensiblen Einsatzfeldern ab diesem Datum.",source:"Europäische Kommission",url:"https://digital-strategy.ec.europa.eu/en/policies/guidelines-ai-high-risk-systems"},
    {start:"2027-12-11",cat:"compliance",label:"CRA",title:"Cyber Resilience Act wird vollständig anwendbar",text:"Ab diesem Datum greifen die wesentlichen CRA-Anforderungen an Produkte mit digitalen Elementen umfassend.",source:"Europäische Kommission",url:"https://digital-strategy.ec.europa.eu/en/policies/cra-summary"},
    {start:"2027-12-14",cat:"compliance",label:"Lieferkette",title:"EU-Verordnung gegen Produkte aus Zwangsarbeit wird anwendbar",text:"Ab diesem Datum dürfen Produkte, die mit Zwangsarbeit hergestellt wurden, nicht mehr auf dem EU-Markt bereitgestellt oder aus der EU exportiert werden.",source:"Europäische Kommission",url:"https://single-market-economy.ec.europa.eu/single-market/goods/forced-labour-regulation_en"}
  ];

  const catLabel={compliance:"Compliance",handel:"Handel & Zölle",logistik:"Logistik",energie:"Energie",geopolitik:"Geopolitik",industrie:"Industrie & Automotive"};
  const monthNames=["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
  const dayNames=[["Montag","Mo"],["Dienstag","Di"],["Mittwoch","Mi"],["Donnerstag","Do"],["Freitag","Fr"],["Samstag","Sa"],["Sonntag","So"]];
  const stack=calendar.querySelector("#calendar-stack");
  const dialog=calendar.querySelector("#day-dialog");
  const dialogTitle=calendar.querySelector("#dialog-title");
  const dialogSubtitle=calendar.querySelector("#dialog-subtitle");
  const dialogBody=calendar.querySelector("#dialog-body");
  const filters=[...calendar.querySelectorAll(".filter")];
  const today=new Date();
  const todayKey=[today.getFullYear(),String(today.getMonth()+1).padStart(2,"0"),String(today.getDate()).padStart(2,"0")].join("-");
  let rangeStart=new Date(today.getFullYear(),today.getMonth(),1);
  let visibleMonths=3;
  let activeFilter="all";
  const yearForm=calendar.querySelector("#year-jump");
  const yearInput=calendar.querySelector("#year-input");
  const yearFeedback=calendar.querySelector("#year-jump-feedback");

  const toKey=d=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
  const parseKey=s=>{const [y,m,d]=s.split("-").map(Number);return new Date(y,m-1,d)};

  // Historische Umstellung für die zuerst gregorianisch umgestellten Länder:
  // Do. 04.10.1582 (julianisch) -> Fr. 15.10.1582 (gregorianisch).
  // Andere Regionen, auch deutsche Territorien, stellten zu anderen Daten um.
  // Native JavaScript Date rechnet hingegen durchgehend proleptisch gregorianisch.
  const REFORM_DAY=2299161;
  const civilToDay=(year,month,day)=>{
    if(year===1582&&month===10&&day>=5&&day<=14)return null;
    const a=Math.floor((14-month)/12);
    const y=year+4800-a,m=month+12*a-3;
    const base=day+Math.floor((153*m+2)/5)+365*y+Math.floor(y/4);
    const gregorian=year>1582||(year===1582&&(month>10||(month===10&&day>=15)));
    return gregorian?base-Math.floor(y/100)+Math.floor(y/400)-32045:base-32083;
  };
  const dayToCivil=jdn=>{
    let year,month,day;
    if(jdn>=REFORM_DAY){
      const a=jdn+32044,b=Math.floor((4*a+3)/146097),c=a-Math.floor(146097*b/4);
      const d=Math.floor((4*c+3)/1461),e=c-Math.floor(1461*d/4),m=Math.floor((5*e+2)/153);
      day=e-Math.floor((153*m+2)/5)+1;
      month=m+3-12*Math.floor(m/10);
      year=100*b+d-4800+Math.floor(m/10);
    }else{
      const a=jdn+32082,b=Math.floor((4*a+3)/1461),c=a-Math.floor(1461*b/4),m=Math.floor((5*c+2)/153);
      day=c-Math.floor((153*m+2)/5)+1;
      month=m+3-12*Math.floor(m/10);
      year=b-4800+Math.floor(m/10);
    }
    return {year,month,day};
  };
  const weekDay=jdn=>((jdn%7)+7)%7; // 0 = Montag
  const civilKey=d=>d.year+"-"+String(d.month).padStart(2,"0")+"-"+String(d.day).padStart(2,"0");
  const formatDate=s=>{
    const [year,month,day]=s.split("-").map(Number);
    const jdn=civilToDay(year,month,day);
    return (jdn===null?"":dayNames[weekDay(jdn)][0]+", ")+String(day).padStart(2,"0")+". "+monthNames[month-1]+" "+year;
  };
  const eventOnDay=(event,key)=>key>=event.start&&key<=(event.end||event.start);
  const visibleEventsForDay=key=>events.filter(e=>eventOnDay(e,key)&&(activeFilter==="all"||e.cat===activeFilter));
  const isoWeek=jdn=>{
    // ISO-Wochennummer, für historische Daten rückwirkend berechnet.
    const thursday=dayToCivil(jdn+3);
    const jan4=civilToDay(thursday.year,1,4);
    return Math.floor((jdn-(jan4-weekDay(jan4)))/7)+1;
  };

  function previewHtml(dayEvents){
    const shown=dayEvents.slice(0,3).map(e=>"<p><b>"+e.label+"</b> · "+e.title+"</p>").join("");
    const more=dayEvents.length>3?"<p>+"+(dayEvents.length-3)+" weitere</p>":"";
    return '<div class="preview"><b>Vorschau</b>'+shown+more+"</div>";
  }

  function openDay(key){
    const dayEvents=visibleEventsForDay(key);
    if(!dayEvents.length)return;
    dialogTitle.textContent=formatDate(key);
    dialogSubtitle.textContent=dayEvents.length===1?"1 Ereignis":dayEvents.length+" Ereignisse";
    dialogBody.innerHTML=dayEvents.map(e=>
      '<article class="detail-card" data-cat="'+e.cat+'">'+
        '<div class="detail-meta">'+catLabel[e.cat]+' · '+e.label+(e.end?" · "+formatDate(e.start)+" bis "+formatDate(e.end):"")+'</div>'+
        '<h3>'+e.title+'</h3><p>'+e.text+'</p>'+
        '<a href="'+e.url+'" target="_blank" rel="noopener noreferrer">Quelle: '+e.source+' ↗</a>'+
      '</article>'
    ).join("");
    dialog.showModal();
  }

  function monthElement(year,month){
    const card=document.createElement("section");card.className="month-card";
    // Fortlaufende echte Tage statt der proleptisch gregorianischen Date-Rückrechnung.
    const firstDay=civilToDay(year,month+1,1);
    const nextYear=month===11?year+1:year,nextMonth=month===11?1:month+2;
    const endDay=civilToDay(nextYear,nextMonth,1);
    const startDay=firstDay-weekDay(firstDay);
    const rows=Math.ceil((endDay-startDay)/7);

    const title=document.createElement("div");title.className="month-title";
    const eventCount=events.filter(e=>{
      const [sy,sm,sd]=e.start.split("-").map(Number),[ey,em,ed]=(e.end||e.start).split("-").map(Number);
      const es=civilToDay(sy,sm,sd),ee=civilToDay(ey,em,ed);
      return ee!==null&&es!==null&&ee>=firstDay&&es<endDay&&(activeFilter==="all"||e.cat===activeFilter);
    }).length;
    const phase=year<1582||(year===1582&&month<9)?"julian":year===1582&&month===9?"transition":"gregorian";
    card.dataset.calendarPhase=phase;
    title.innerHTML="<h3>"+monthNames[month]+" "+year+"</h3><span>"+
      (eventCount?eventCount+" Termine":"Keine Termine im Filter")+"</span>";
    card.appendChild(title);

    if(phase==="transition"){
      const notice=document.createElement("div");
      notice.className="calendar-transition";
      notice.innerHTML='<strong>Kalenderwechsel · Oktober 1582</strong>'+
        '<div class="calendar-transition-days"><span><b>Donnerstag, 4. Oktober</b><small>letzter julianischer Tag</small></span>'+
        '<span class="calendar-skip" aria-label="10 Kalendertage entfallen">→ 10 Tage entfallen →</span>'+
        '<span><b>Freitag, 15. Oktober</b><small>erster gregorianischer Tag</small></span></div>'+
        '<p>5. bis 14. Oktober 1582 entfielen bei der ersten Einführung der Reform. Andere Regionen, auch viele deutsche Gebiete, wechselten erst später.</p>';
      card.appendChild(notice);
    }

    const grid=document.createElement("div");grid.className="calendar-grid";
    const kw=document.createElement("div");kw.className="head-cell";kw.textContent="KW";grid.appendChild(kw);
    dayNames.forEach(([full,short])=>{const h=document.createElement("div");h.className="head-cell";h.innerHTML=short+"<small>"+full+"</small>";grid.appendChild(h)});

    for(let r=0;r<rows;r++){
      const monday=startDay+r*7;
      const w=document.createElement("div");w.className="weekno";w.textContent=isoWeek(monday);grid.appendChild(w);
      for(let c=0;c<7;c++){
        const d=dayToCivil(monday+c);
        const key=civilKey(d);
        const dayEvents=visibleEventsForDay(key);
        const btn=document.createElement("button");
        btn.type="button";btn.className="day";
        if(d.year!==year||d.month!==month+1)btn.classList.add("is-outside");
        if(c>=5)btn.classList.add("is-weekend");
        if(c===6)btn.classList.add("is-sunday");
        if(key===todayKey)btn.classList.add("is-today");
        btn.innerHTML='<span class="day-num">'+d.day+'</span>';
        if(dayEvents.length){
          btn.classList.add("has-events");
          btn.setAttribute("aria-label",formatDate(key)+": "+dayEvents.length+" Ereignis"+(dayEvents.length===1?"":"se"));
          const cats=[...new Set(dayEvents.map(e=>e.cat))];
          btn.innerHTML+=(dayEvents.length>1?'<span class="event-count">'+dayEvents.length+'</span>':"")+
            '<span class="dots">'+cats.map(cat=>'<i class="dot-'+cat+'"></i>').join("")+'</span>'+previewHtml(dayEvents);
          btn.addEventListener("click",()=>openDay(key));
        }else{
          btn.disabled=true;
          btn.setAttribute("aria-label",formatDate(key)+": keine Ereignisse");
        }
        if(year===1582&&month===9&&d.year===1582&&d.month===10){
          const isJulian=d.day<=4;
          btn.classList.add(isJulian?"is-julian":"is-gregorian");
          if(d.day===4||d.day===15){
            const isFirstGregorian=d.day===15;
            btn.classList.add(isFirstGregorian?"is-reform-after":"is-reform-before");
            btn.innerHTML+='<span class="calendar-boundary-label" aria-hidden="true">'+(isFirstGregorian?"Greg.":"Jul.")+"</span>";
            btn.title=isFirstGregorian?"Erster Tag des gregorianischen Kalenders":"Letzter Tag des julianischen Kalenders";
            btn.setAttribute("aria-label",btn.getAttribute("aria-label")+", "+btn.title);
          }
        }
        grid.appendChild(btn);
      }
    }
    card.appendChild(grid);
    return card;
  }

  function render(){
    stack.innerHTML="";
    stack.classList.toggle("is-year-view",visibleMonths===12);
    for(let i=0;i<visibleMonths;i++){
      const d=new Date(rangeStart.getFullYear(),rangeStart.getMonth()+i,1);
      stack.appendChild(monthElement(d.getFullYear(),d.getMonth()));
    }
    if(yearFeedback){
      if(visibleMonths===12){
        const selectedYear=rangeStart.getFullYear();
        const begin=selectedYear+"-01-01";
        const end=selectedYear+"-12-31";
        const matched=events.filter(e=>e.start<=end&&(e.end||e.start)>=begin&&(activeFilter==="all"||e.cat===activeFilter)).length;
        yearFeedback.textContent=matched
          ?"Jahresansicht "+selectedYear+": "+matched+" belegte "+(matched===1?"Eintragung":"Eintragungen")+"."
          :"Für "+selectedYear+" sind keine Termine hinterlegt.";
      }else{
        const d=new Date(rangeStart.getFullYear(),rangeStart.getMonth()+2,1);
        yearFeedback.textContent="Ansicht: "+monthNames[rangeStart.getMonth()]+" "+rangeStart.getFullYear()+" bis "+monthNames[d.getMonth()]+" "+d.getFullYear()+".";
      }
    }
  }

  function updateQuick(){
    const nowKey=todayKey;
    const future=events.filter(e=>(e.end||e.start)>=nowKey).sort((a,b)=>{
      const aOngoing=a.start<=nowKey&&(a.end||a.start)>=nowKey;
      const bOngoing=b.start<=nowKey&&(b.end||b.start)>=nowKey;
      if(aOngoing!==bOngoing)return aOngoing?-1:1;
      return aOngoing
        ?(a.end||a.start).localeCompare(b.end||b.start)
        :a.start.localeCompare(b.start);
    });
    if(future.length){
      const next=future[0];
      const ongoing=next.start<=nowKey&&(next.end||next.start)>=nowKey;
      const displayKey=ongoing?(next.end||next.start):next.start;
      const displayDate=parseKey(displayKey).toLocaleDateString("de-DE",{day:"2-digit",month:"2-digit"});
      const isTodayOnly=next.start===nowKey&&(next.end||next.start)===nowKey;
      calendar.querySelector("#next-date").textContent=isTodayOnly?"Heute":ongoing?"Läuft bis "+displayDate:displayDate;
      calendar.querySelector("#next-title").textContent=next.title;
    }else{
      calendar.querySelector("#next-date").textContent="–";
      calendar.querySelector("#next-title").textContent="Keine gepflegten Termine";
    }
    const end90=new Date(today);end90.setDate(end90.getDate()+90);
    const end90Key=toKey(end90);
    calendar.querySelector("#next-90").textContent=String(events.filter(e=>(e.end||e.start)>=nowKey&&e.start<=end90Key).length);
  }

  calendar.querySelector("#prev-range").addEventListener("click",()=>{rangeStart=new Date(rangeStart.getFullYear(),rangeStart.getMonth()-3,1);visibleMonths=3;render()});
  calendar.querySelector("#next-range").addEventListener("click",()=>{rangeStart=new Date(rangeStart.getFullYear(),rangeStart.getMonth()+3,1);visibleMonths=3;render()});
  calendar.querySelector("#today-range").addEventListener("click",()=>{rangeStart=new Date(today.getFullYear(),today.getMonth(),1);visibleMonths=3;if(yearInput)yearInput.value=String(today.getFullYear());render()});
  if(yearForm&&yearInput&&yearFeedback){
    yearInput.value=String(today.getFullYear());
    yearForm.addEventListener("submit",e=>{
      e.preventDefault();
      const raw=yearInput.value.trim();
      const year=Number(raw);
      if(!/^[0-9]{4}$/.test(raw)||!Number.isInteger(year)||year<1000||year>9999){
        yearInput.setAttribute("aria-invalid","true");
        yearFeedback.textContent="Bitte ein vierstelliges Jahr zwischen 1000 und 9999 eingeben.";
        yearInput.focus();
        return;
      }
      yearInput.removeAttribute("aria-invalid");
      rangeStart=new Date(year,0,1);
      visibleMonths=12;
      render();
    });
  }
  filters.forEach(btn=>btn.addEventListener("click",()=>{
    activeFilter=btn.dataset.filter;
    filters.forEach(b=>b.setAttribute("aria-pressed",b===btn?"true":"false"));
    render();
  }));
  dialog.querySelector(".dialog-close").addEventListener("click",()=>dialog.close());
  dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});
  updateQuick();render();
})();
