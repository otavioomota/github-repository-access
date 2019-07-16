import React, { Component } from 'react';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Container from '../../components/container/index';
import { Form, SubmitButton, List } from './styles';

import api from '../../Services/api';

class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    notFound: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');
    if (repositories) {
      this.setState({
        repositories: JSON.parse(repositories),
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    try {
      this.setState({ loading: true });
      const { newRepo, repositories } = this.state;

      const sameRepository = repositories.find(
        repository => repository.name == newRepo
      );

      if (sameRepository) {
        throw 'Repositório duplicado';
      }
      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
      });
    } catch (err) {
      this.setState({
        notFound: true,
        loading: false,
      });
      console.log(err);
    }
  };

  handleInputChange = e => {
    this.setState({
      newRepo: e.target.value,
    });
  };

  render() {
    const { newRepo, repositories, loading, notFound } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} notFound={notFound}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            onChange={this.handleInputChange}
            value={newRepo}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              {repository.name}
              <span>
                <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                  Detalhes
                </Link>
              </span>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

export default Main;
