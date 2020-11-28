# React-Template

Dies ist das offizielle Template um CustomForms für das [5Portal](https://github.com/atlas-engine-contrib/atlas-ui_portal) zu entwicklen. Dieses Template wurde auf Basis des Projektes [AtlasUi CustomForms-Templates](https://github.com/atlas-engine-contrib/atlas-ui_custom-forms-templates) generiert und ist eins von drei möglichen Templates (React, Angular, .Net).

## Relevante URLs

* [User Interaction Component](https://github.com/atlas-engine-contrib/atlas-ui_user-interaction-component)
* [5Portal](https://github.com/atlas-engine-contrib/atlas-ui_portal)
* [BPMN Studio](https://github.com/process-engine/bpmn-studio)

## Wie kann ich das Template benutzen?

### Starten der ProcessEngine

Das React-Template ist dazu gedacht UserTasks die während der Ausführung von BPMN-Diagrammen auftreten in From von CustomFroms darzustellen. Die Ausfühurng sowie die Entwicklung von BPMN-Diagrammen kann von dem [BPMN Studio](https://github.com/process-engine/bpmn-studio) übernommen werden. Das BPMN Studio bietet sowohl ein IDE zur erstellung von Prozessen, als auche eine integrierte ProcessEngine.
Als ersten Einstieg empfileht es sich daher für diesen Zweck das [BPMN Studio](https://github.com/process-engine/bpmn-studio) zu nutzen.

### Starten des 5Portals

Als übergeordnete Instantz zur Steuerung von Porzessen, wie z.B. das Starten dieser, wird das [5Portal](https://github.com/atlas-engine-contrib/atlas-ui_portal) empfohlen. Weiter bietet das Portal die Möglichkeit mit Hilfe der [User Interaction Component](https://github.com/atlas-engine-contrib/atlas-ui_user-interaction-component) CustomForms darzustellen.

```sh
yarn atlas-portal
```

Startet das 5Portal auf [http://localhost:8082](http://localhost:8082/)

### Starten der CustomForms

Letztlich bieten sich folgende zwei Möglichkeiten die CustomForms zu starten:

#### :package: NPM

```sh
yarn start
```

#### :whale: Docker

```sh
docker build . -t react-template --build-arg NPM_TOKEN=npm_token_value
docker run -p 3000:80  react-template:latest
```

## Wie kann ich (weitere) CustomForms erstellen?

1. Einen Prozess im Ordner [processes](react-template/template/processes) mit einem UserTask anlegen der die entsprechende preferredControl beinhaltet (siehe [Beispiel](react-template/template/processes/example-process.bpmn)).
2. Im Ordner [components](react-template/template/src/components) eine CustomForm (React-Componente) erstellen.
3. Diese Componente in der Datei [App.tsc](react-template/template/src/App.tsx) importieren und der CustomFormsRenderer React-Componente im return-Statement übergeben.

