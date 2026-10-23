# Earlier software project pages

Reviewed and run locally on 23 October 2026. Application sources were built in temporary checkouts; no application repository was modified or pushed.

| Project | Reviewed commit | Local result |
| --- | --- | --- |
| [OURAMAZONE](https://github.com/SalmaAlkhalily/distributed-systems-amazon-microservices-eureka-server) | `0c41e164c8e20ec03d375d207a2c892679ea7df4` | Eureka, user and product modules packaged with Maven. Eureka dashboard, `GET /users` and `GET /products` returned HTTP 200. |
| [Internet Download Manager](https://github.com/SalmaAlkhalily/files-downloader) | `8124768a0b67c1327d6a32e901d69985ed41521a` | All Java sources compiled; main application launched. |
| [Automate DFA](https://github.com/SalmaAlkhalily/automate-dfa) | `f9507faeddf6a9b38a1e874ca304142a4961cb27` | All Java sources compiled; application launched; Add New DFA opened the definition form. |
| [Phone Generator](https://github.com/SalmaAlkhalily/phone-generator) | `451ec4b91a1a73bf0d0a6b27aca9a7792ce54a7b` | All Java sources compiled; application launched; Generate opened the parameter form. |

## Reproduction

Sources were downloaded to an isolated temporary directory, outside the portfolio checkout. Desktop apps used JDK 11.0.2. Compile each package with `javac -encoding UTF-8 -d preview-build src/<package>/*.java`; run with both `preview-build` and `src` on the classpath so bundled images are available. Entry points are `filesdownloader.DownloadManagerGUI`, `automatedfa.AutomateDFA` and `phonegenerator.PhoneGenerator`. On Windows, separate classpath entries with a semicolon.

Launch with `-Duser.home=<temporary-preview-home>` and create Documents / My Documents there first. No existing user downloads or contacts were read or modified.

OURAMAZONE was built from the individual `spring-cloud/eureka`, `spring-cloud/amazone-user` and `spring-cloud/amazone-product` POMs using Maven 3.3.9 and Java 11. The parent module lists contain missing directories, so the root aggregator was not used. The Eureka POM in the temporary checkout needed `javax.xml.bind:jaxb-api:2.3.1` and `org.glassfish.jaxb:jaxb-runtime:2.3.1` for Java 11. The unmodified initial build packaged successfully but failed to start because JAXB was absent.

Services were bound to `127.0.0.1`. User and product services advertised `--eureka.instance.hostname=localhost`; otherwise the machine hostname resolved outside that binding. Start Eureka (8761), then user (8060), wait for registration, then product (8050). The product startup runner calls the user service, so starting it first fails. Zipkin was disabled for this local run. Other business services, RabbitMQ, tracing and a full purchase workflow were not exercised.

## Interface images

The four PNGs are real window captures obtained with the Computer Use skill. Desktop captures show empty forms or the initial download table, without client data. The OURAMAZONE image is the running Eureka dashboard before business services registered; its browser chrome was cropped out. It is not a storefront or a demonstration of a completed purchase. No interface was generated or reconstructed.

Full download transfers, arbitrary DFA acceptance tests, phone-number generation/export/import, performance and cross-platform behaviour were not tested. Page copy keeps these limits explicit. The downloader source includes existing MIT notices crediting Luu Gia Thuy; the case study preserves that attribution.

A later source review confirmed that the downloader's URL validator accepts only
HTTP addresses and that its FTP form has a disabled Download button. The
portfolio no longer claims HTTPS, working FTP transfers or a download queue.
The archive summaries also specify OURAMAZONE's backend scope, DFA diagrams for
bundled examples and Phone Generator's vCard export.

Creative Multiplication for Children and Tasty Healthy Food are deferred at Salma’s request until their repositories are available.

The portfolio production build and verifier passed for eleven pages and 406 local references. All four new development routes returned HTTP 200. The DFA page was visually reviewed in the desktop browser. Temporary Java applications and microservices were stopped after verification; the existing portfolio development server remains available.
