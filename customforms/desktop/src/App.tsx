import React from 'react';

import './App.css';
import './style.scss';

import {Container} from 'react-bootstrap';

import {BuchauswahlZusammenstellen} from './components/BuchauswahlZusammenstellen/BuchauswahlZusammenstellen';
import {BibliotheksausweisErstellen} from './components/BibliotheksausweisErstellen/BibliotheksausweisErstellen';
import {BuchausleiheEintragen} from './components/BuchausleiheEintragen/BuchausleiheEintragen';

import {CustomFormsRenderer} from './CustomFormsRenderer';
import {EmpfehlungPruefen} from './components/EmpfehlungPruefen/EmpfehlungPruefen';
import {BeratungDurchfuehren} from './components/BeratungDurchfuehren/BeratungDurchfuehren';
import {AusleiheBestaetigen} from './components/AusleiheBestaetigen/AusleiheBestaetigen';

function App(): JSX.Element {
  return (
    <Container>
      <CustomFormsRenderer
        components={{
          'Workshop/BuchauswahlZusammenstellen': BuchauswahlZusammenstellen,
          'Workshop/BeratungDurchfuehren': BeratungDurchfuehren,
          'Workshop/BibliotheksausweisErstellen': BibliotheksausweisErstellen,
          'Workshop/BuchausleiheEintragen': BuchausleiheEintragen,
          'Workshop/EmpfehlungPruefen': EmpfehlungPruefen,
          'Workshop/AusleiheBestaetigen': AusleiheBestaetigen
        }}
      ></CustomFormsRenderer>
    </Container>
  );
}

export default App;
