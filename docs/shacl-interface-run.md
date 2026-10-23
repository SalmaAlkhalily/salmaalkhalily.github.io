# SHACL interface capture

These notes record the earlier local JavaFX run and its building example.
The page now displays clearer original PNG interface images from the updated
private project documentation instead of these JPEG captures. The local results
below still support the nine-finding example; they are not depicted in the new
empty-state interface images.

## Source and inputs

- Repository: [Key-Based-SHACL-Shape-Generation-and-Validation-for-RDF-Datasets-with-Property-Mapping-Support](https://github.com/SalmaAlkhalily/Key-Based-SHACL-Shape-Generation-and-Validation-for-RDF-Datasets-with-Property-Mapping-Support).
- Source commit: `603e359ae8fd4c78a29b04b70e1416ad39a4512d`.
- Application: `TER project files/test/MyFirstPro`, entry point
  `org.example.myfirstpro.MyApplication`.
- Saved keys: `TER project testing/first test YA_Building/keys.txt`.
  SHA-256: `c748ec5ded140eb27b194c5423e6865f02bfe65272cd5ba3b1fa39aeaef77e5b`.
- Validation sample:
  `TER project testing/first test YA_Building/YA_Buildingy_test_data_without.nt`.
  SHA-256: `d4d583e8f38b4943bd9e00b2d4c7496886cc68d9136e0c8a52ecdc2ab323ca78`.

The saved keys were loaded through **Choose Keys File**, and the app's
**Generate SHACL Shapes** action produced 40 node shapes from 40 keys. The
newly generated shapes were saved and then selected in the validation tab.
This capture does not demonstrate a fresh SAKey discovery run.

The validation sample contains nine triples describing four resources. Its
duplicate key values and repeated property produce nine validation findings:

| Finding | Entries |
| --- | ---: |
| Duplicate key values | 4 |
| Missing expected `owl:sameAs` links | 4 |
| Maximum cardinality exceeded | 1 |
| Total | 9 |

These are constraint findings, not nine distinct invalid resources. The local
validation output was checked against the app's automatically generated output
document. That document stays in the ignored runtime directory and is not a
portfolio download.

## Local runtime setup

The source clone is in the ignored `tmp/shacl-source/` directory. A separate
runtime copy in `tmp/shacl-run/` was used on Windows with JDK 23, compiling for
Java 17. The source repository was not edited or pushed.

The original Maven build references an HTTP Rocker repository blocked by Maven and
mixes several Jena and JavaFX versions. The isolated runtime POM uses the
dependencies needed by this application: JavaFX 17.0.13, RichTextFX 0.11.4,
Jena SHACL 5.2.0, Spark SQL 3.5.1, iText layout 7.2.5 and ControlsFX 11.0.0.
Unused Rocker imports were removed in the runtime copy; its discovery algorithm
is not used in this demonstration. JavaFX base/graphics and SLF4J were pinned
to consistent versions, with obsolete JavaFX 11 jars excluded from the runtime
classpath. A small launcher delegates to `MyApplication.main` when loading
JavaFX from the classpath. FXML, application styles and application operations
were retained.

The Maven wrapper uses the system certificate store with
`-Djavax.net.ssl.trustStoreType=Windows-ROOT`. The Java runtime opens
`sun.nio.ch`, `java.nio`, `java.lang`, `java.lang.invoke`, `java.util` and
`java.io` to unnamed modules for Spark compatibility, with
`-Djava.security.manager=allow`. These settings are confined to that process.
The final capture run also uses `SPARK_LOCAL_IP=127.0.0.1`,
`-Dspark.driver.bindAddress=127.0.0.1`, `-Dspark.driver.host=127.0.0.1` and
`-Dspark.ui.enabled=false` to keep the sample run local. It reconfirmed the same
nine findings.

Build the prepared runtime copy with:

```powershell
./mvnw.cmd '-Djavax.net.ssl.trustStoreType=Windows-ROOT' -DskipTests compile dependency:copy-dependencies '-DoutputDirectory=target/dependency'
```

## Interpretation

The prototype's Spark preprocessing changes the sample into
`http://example.com/ns#` resources, lowercases predicates and writes string
values. It also strips periods from object values. This demonstration verifies
the repository's worked sample, not preservation of arbitrary RDF semantics.

Generated SPARQL targets select resources with duplicate key values. Property
constraints therefore apply to those focus resources. Shape generation emits
an `owl:sameAs` rule; the Jena validation call does not establish that the rule
has been executed or that identity links have been inserted.

The portfolio keeps its result explanation in normal text and provides
full-size links for the interface images. The images are the original JPEG
bytes returned by the window capture, 679 × 754 pixels; there is no recompression,
retouching or simulated interface content. The two images occupy about 162 KiB
in total. The gallery places them side by side on desktop and stacks them on
mobile. No academic report link is added.

## Portfolio checks

`npm run build` and `npm run check:build` passed for all eleven routes. Headless
Chrome checks at 1440, 390 and 320 pixels confirmed both images load with the
correct dimensions and JPEG content type, the new navigation link exists, the
4/4/1 counts are rendered, and the page has no horizontal overflow or JavaScript
errors. The light and dark layouts were visually inspected. The native app was
also rerun with the local-only Spark configuration before the final captures.
