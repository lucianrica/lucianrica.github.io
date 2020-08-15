
class Link extends React.Component {

  handleClick = (e) => {
    e.preventDefault();
    console.log(e.target)
  }

  

  render() {

    const { links, like } = this.props
    return (
      <div className="w3-quarter">

        <div className="tooltip">
          <a href="#" onClick={this.handleClick}> {links[0].id}, </a>
          <span className="tooltiptext tooltip-top">{links[0].name}</span>
        </div>
        <div className="tooltip">
          <a href="#" onClick={this.handleClick}> {links[1].id}, </a>
          <span className="tooltiptext tooltip-top">{links[1].name}</span>
        </div>
        <div className="tooltip">
          <a href="#" onClick={this.handleClick}> {links[2].id}, </a>
          <span className="tooltiptext tooltip-top">{links[2].name}</span>
        </div>
        <div className="tooltip">
          <a href="#" onClick={this.handleClick}> {links[3].id}, </a>
          <span className="tooltiptext tooltip-top">{links[3].name}</span>
        </div>
        <div>
        <h1>{links.name} asd</h1>
        </div>
      </div>
    );
  }
}


class Content extends React.Component {

  render() {
    return (
      <div className="grid">
        <Link links={this.state.links} />
        

        <h1>aa</h1>

      </div>


    );
  }


  state = {
    links: [
      {
        name: 'Never Give up, Never Surrender',
        id: 1,
        content: `
        <h2>Good things is what keep us from doing great things</h2>
        `
      },
      { name: 'Big Data, new Death Star?', id: 2 },
      { name: 'Future of Electric Cars, no banana?', id: 3 },
      { name: 'Ethics in IT, am I a Muggle?', id: 4 }
    ]
  }

}



ReactDOM.render(<Content />, document.querySelector('.content'))
