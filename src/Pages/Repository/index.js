import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Container from '../../components/container/index';
import { Owner, Loading, IssuesList, IssuesFilter, PageNav } from './styles';

import api from '../../Services/api';

class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    filterState: [
      { state: 'open', label: 'open' },
      { state: 'closed', label: 'closed' },
      { state: 'all', label: 'all' },
    ],
    filterStateIndex: 0,
    page: 1,
  };

  async componentDidMount() {
    const repositoryName = decodeURIComponent(
      this.props.match.params.repository
    );

    /*
      Problema de fazer assim é que um trecho de código só executa depois
      que o outro tiver terminado, e que o cenario ideia seria os 2 executarem
      ao mesmo tempo

    const data = await api.get(`repos/${repositoryName}`);
    const issues = await api.get(`repos/${repositoryName}/issues`).data;
    */
    const [repository, issues] = await Promise.all([
      api.get(`repos/${repositoryName}`),
      api.get(`repos/${repositoryName}/issues`, {
        params: {
          state: 'open',
          per_page: 30,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  componentDidUpdate = async (_, prevState) => {
    const { filterState, filterStateIndex, repository, page } = this.state;

    if (
      prevState.filterStateIndex !== filterStateIndex ||
      prevState.page !== page
    ) {
      const issues = await api.get(`repos/${repository.full_name}/issues`, {
        params: {
          state: filterState[filterStateIndex].label,
          per_page: 30,
          page,
        },
      });

      this.setState({
        issues: issues.data,
      });
    }
  };

  handleFilterState = index => {
    this.setState({
      filterStateIndex: index,
    });
  };

  handlePageNav = action => {
    const { page } = this.state;

    if (action === 'back' && page !== 0) {
      this.setState(prevState => ({
        page: prevState.page - 1,
      }));
    }

    if (action === 'next') {
      console.log('executando');
      this.setState(prevState => ({
        page: prevState.page + 1,
      }));
    }
    console.log(page);
  };

  render() {
    const {
      repository,
      issues,
      loading,
      filterState,
      filterStateIndex,
    } = this.state;
    if (loading) {
      return <Loading>Carregando</Loading>;
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar ao menu principal</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssuesList>
          <IssuesFilter active={filterStateIndex}>
            {filterState.map((state, index) => (
              <button
                key={String(index)}
                onClick={() => this.handleFilterState(index)}
                type="button"
              >
                {state.label}
              </button>
            ))}
          </IssuesFilter>

          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssuesList>
        <PageNav>
          <button onClick={() => this.handlePageNav('back')} type="button">
            Voltar
          </button>
          <button onClick={() => this.handlePageNav('next')} type="button">
            Avançar
          </button>
        </PageNav>
      </Container>
    );
  }
}

export default Repository;
