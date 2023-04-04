import  React from 'react';
import './App.css';

import marked from "https://cdn.skypack.dev/marked@3.0.7";
import highlightJs from "https://cdn.skypack.dev/highlight.js";

// Set options
// `highlight` example uses https://highlightjs.org
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code, lang) {
    const language = highlightJs.getLanguage(lang) ? lang : 'plaintext';
    return highlightJs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  pedantic: false,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

const MarkdownEditor = (props) => ((<div className="box">
    <h3 className="title">Markdown editor</h3>
    <textarea id="editor" onChange={props.handleChange}>{props.text}</textarea>
    </div>));

const MarkdownPreview = (props) => ((<div className="box">
    <h3 className="title">Markdown preview</h3>
    <div id="preview" dangerouslySetInnerHTML={{ __html: props.HTML }}>
    </div>
    </div>));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: this.props.text};
    this.textChanged = this.textChanged.bind(this);
  }
  
  textChanged (event) {
    this.setState(
      {text: event.target.value}
    );
  }
  
  render() {
    return (
      <div className="container d-flex justify-content-evenly">
        <MarkdownEditor text={this.state.text} handleChange={this.textChanged}/>
        <MarkdownPreview  HTML={marked(this.state.text)}/>
        </div>
    );
  }
  
}

App.defaultProps = {text:"# Hello world!\n\n**Short** [example](https://www.wikipedia.com) of what to do <strong>here</strong>:\n- Observe\n- `Think` about <strong>it</strong>\n- Let's do this: `Yes!`\n\n## Some code\n```python\nprint('hello world!')\n```\n\n## A quote\n> 'Here is to the rebels, the misfits, the revolutionaries' --Steve Jobs\n\n## An image\n![Link](https://i.pinimg.com/originals/a0/c5/80/a0c580f4d42d6cf12b045a54774b107d.jpg)" };
export default App
