import React from 'react';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';

const App = () => (
        <Section size='large'>
	      <Container>
	      	<Heading>E-commerce fictício</Heading>
	      	<Heading subtitle>Um exemplo de e-commerce básico com ReactJS e Laravel no backend. <strong>It Works!</strong></Heading>
	      </Container>
        </Section>
)
export default App;
