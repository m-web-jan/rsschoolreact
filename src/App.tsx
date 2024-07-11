import { Component } from 'react';
import { getMovies } from './api/getAllPlanets';
import './App.css';
import NavBar from './components/Navigation';
import ContentBlock from './components/contentBlock';
import ErrorBoundary from './components/errorBlock';

interface IFilm {
  title: string;
  opening_crawl: string;
}

interface IData {
  films: IFilm[];
  searchText: string;
  throwError: boolean;
}

interface IAppState {}

class App extends Component<IAppState, IData> {
  constructor(props: object) {
    super(props);
    this.state = {
      films: [],
      searchText: '',
      throwError: false,
    };

    this.search = this.search.bind(this);
    this.change = this.change.bind(this);
  }

  componentDidMount() {
    const searchTerm = localStorage.getItem('searchText');
    if (searchTerm) {
      this.getData(searchTerm);
    } else {
      this.getData();
    }
  }

  async getData(searchTerm: string = '') {
    const films = await getMovies(searchTerm);
    this.setState({ films });
  }

  search() {
    localStorage.setItem('searchText', this.state.searchText);
    console.log(this.state.searchText);
    this.getData(this.state.searchText);
  }

  change(e: { target: { value: string } }) {
    this.setState({ searchText: e.target.value });
  }

  handleClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    return (
      <div className="background">
        <ErrorBoundary>
          {this.state.throwError ? (
            <div>Что-то пошло не так. Пожалуйста, перезагрузите страницу.</div>
          ) : (
            <>
              <button onClick={this.handleClick}>Выбросить ошибку</button>
              <NavBar search={this.search} change={this.change} />
              <ContentBlock films={this.state.films} />
            </>
          )}
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
