import React from 'react';
import {
  Container,
  Form,
  FormGroup,
  Input,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import s from './ErrorPage.module.scss';

class ErrorPage extends React.Component {
  render() {
    return (
      <div className={s.errorPage}>
        <Container>
          <div className={`${s.errorContainer} mx-auto`}>
            <h1 className={s.errorCode}>404</h1>
            <p className={s.errorInfo}>
              Opps, essa página não existe!
            </p>
            <p className={[s.errorHelp, 'mb-3'].join(' ')}>
              Se estava procurando algo, pesquise aqui:
            </p>
            <Form method="get">
              <FormGroup>
                <Input className="input-no-border" type="text" placeholder="Pesquisar" />
              </FormGroup>
              <Link to="app/extra/search">
                <Button className={s.errorBtn} type="submit" color="inverse">
                  Pesquisar <i className="fa fa-search text-secondary ml-xs" />
                </Button>
              </Link>
            </Form>
          </div>
          <footer className={s.pageFooter}>
            {new Date().getFullYear()} &copy; Sistema para monitoramento de incendios naturais.
          </footer>
        </Container>
      </div>
    );
  }
}

export default ErrorPage;
