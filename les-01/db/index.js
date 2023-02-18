const path = require('path');
const fs = require('fs/promises');

const moviesPath = path.join(__dirname, '..', 'db', 'movies.json');

class FilesOperations {
  constructor(moviesPath) {
    this.moviesPath = moviesPath;
    // this.data = data;
  }

  //   async create(data) {
  //     fs.writeFile(this.moviesPath, JSON.stringify(data, null, 4));
  //   }

  async read() {
    return await fs.readFile(this.moviesPath, 'utf-8');
  }

  async update(data) {
    const dataArray = JSON.parse(await this.read());

    console.log(dataArray);
  }

  async remove() {
    return await fs.unlink(this.moviesPath);
  }

  async display() {
    console.log(await this.read());
  }
}

const newData = {
  Title: 'NewTitle',
  Year: '2023',
  Rated: 'PG-13',
  Genre: 'Action, Adventure, Fantasy',
};

const file = new FilesOperations(moviesPath);

// file.display();
// file.create(data);
// file.remove();
file.update(newData);
