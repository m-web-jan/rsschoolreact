import { Component } from 'react';
import { getMovies } from './api/getAllPlanets';
import './App.css';
import NavBar from './components/Navigation';
import ContentBlock from './components/contentBlock';

interface IFilm {
  title: string;
  opening_crawl: string;
}

interface IData {
  films: IFilm[];
  searchText: string;
}

interface IAppState extends IData {}

class App extends Component<object, IAppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      films: [],
      searchText: '',
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

  render() {
    return (
      <div className="background">
        <NavBar search={this.search} change={this.change} />
        <ContentBlock films={this.state.films} />
      </div>
    );
  }
}

export default App;
