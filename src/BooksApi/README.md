# Books Web Api für Demonstration des Buch-Ausleihprozesses

Dieses Api dient als Datenquelle für den 5Minds Buch-Ausleihprozess, der zu Demonstrationszwecken beim ersten 4h-Workshop mit Kunden verwendet wird.

## Datenquelle

Die Datenquelle selbst ist eine JSON Datei, die im Anwendungsverzeichnis liegt und vor dem Start der Hostanwendung angepasst werden kann.

## Publish Web Api

Das Web Api Projekt wird als self-contained Anwendung veröffentlicht. Die Runtime Identifier für die verschiedenen Betriebssysteme findet man [hier](https://docs.microsoft.com/en-us/dotnet/core/rid-catalog).

Windows 10

```shell
dotnet publish -o ReleaseSelfContained/Win10 --self-contained -r win10-x64
```

MacOS Mojave

```shell
dotnet publish -o ReleaseSelfContained/Win10 --self-contained -r osx.10.14-x64
```

## Starten der Anwendung

Nach dem Start ist das Api unter `http://localhost:5000/api/book`zu erreichen. Im Anwendungsverzeichnis gibt es eine Postman-Collection mit den möglichen Routen.

### Windows 10

```shell
\BooksApi\ReleaseSelfContained\Win10\BooksApi.exe
```

### MacOS

```shell
TODO
```

## Abfrage der Daten

Im Anwendungsverzeichnis gibt es eine Postman-Collection mit folgenden Routen:

### `Get all books`

Liefert alle Bücher, sortiert nach Titel.

```url
http://localhost:5000/api/books
```

### `Search book with string`

Sucht nach Büchern mit einem Suchstring, der nur teilweise in *ISBN*, *Autor* und *Titel* enthalten sein muss.

```url
http://localhost:5000/api/books/search/<searchstring>
```

### `Search book with empty string`

Such-Route ohne Suchstring, liefert das gleiche Ergebnis wie `Get all books`

```url
http://localhost:5000/api/books/search/
```

### `Get book by ISBN`

Sucht nach einer ganzen ISBN. Wenn kein Buch mit dieser ISBN gefunden wird, dann wird ein leeres Result zurückgegeben.

```url
http://localhost:5000/api/books/<isbn>
```

### `Get book by ISBN with URL param`

Sucht nach einer ganzen ISBN, wobei ein expliziter URL Parameter verwendet wird. Wenn kein Buch mit dieser ISBN gefunden wird, dann wird ein leeres Result zurückgegeben.

```url
http://localhost:5000/api/books/isbn/<isbn>
```
