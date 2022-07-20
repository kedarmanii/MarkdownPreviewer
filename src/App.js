import { marked } from 'marked';
import { useState } from 'react';
import './App.css';

marked.setOptions({
	breaks:true,
	gfm:true
})
const renderer = new marked.Renderer();


const initialInput = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

function App(){ 
	const [markdown, setMarkdowm] = useState(initialInput);	
	const [editorMinimized, setEditorStatus] = useState(true);
	const [previewMinimized, setPreviewStatus] = useState(true);

	const cssClasses  = (!editorMinimized)?
	['editor maximized','preview hidden','fa fa-compress']
	:(!previewMinimized)?
	['editor hidden','preview maximized','fa fa-compress']:
	['editor minimized','preview minimized','fa fa-arrows-alt'];
		return (
		<div className = "App">
		  <div className = "container">
			<h1> Markdown Previwer</h1>
			<div className = {cssClasses[0]}>
				<TopBar 
					class = {cssClasses[2]}
					text = "Editor" 
					minimizedStatus = {editorMinimized} 
					setStatus = {setEditorStatus}
					/>
				<Editor  setMarkdowm = {setMarkdowm} />
			</div >
			<div className = {cssClasses[1]}>
				<TopBar 
					class = {cssClasses[2]}
					text = "Preview" 
					minimizedStatus = {previewMinimized} 
					setStatus = {setPreviewStatus}
					/>
				<Previwer  
					markdown = {markdown} 
					/>
			</div>
		  </div>
		</div>
		);
}
/*
function Editor (props){
	const cssClasses = (props.editorMinimized&&props.previewMinimized)?
	['editorMinimized','previewMinimized','fa fa-arrows-alt', 'fa fa-arrows-alt']
	:(props.previewMinimized&&!props.editorMinimized)?
	['editorMaximized','previewHidden','fa fa-arrows-alt','fa fa-compress']:
	['editorHidden','previewMaximized','fa fa-compress','fa fa-arrows-alt'];

	return (
		<>
		<div>
			<TopBar text ='Editor' class ={cssClasses[2]} minimizedStatus = {props.editorMinimized} setStatus ={props.setEditorStatus}/>
			<textarea 
				className={cssClasses[0]} 
				placeholder = {initialInput} 
				onChange={(event)=>{props.setMarkdowm(event.target.value)}}>
			</textarea>
		</div>
		<Previewer class = {cssClasses[1]} iconClass = {cssClasses[3]} markdown = {props.markdown} minimizedStatus ={props.previewMinimized} setStatus ={props.setPreviewStatus} />
		</>
	);
};

function Previewer(props){
	return (
		<>
		<TopBar text = 'Preview' class = {props.iconClass} minimizedStatus = {props.minimizedStatus} setStatus={props.setStatus} />
		<div 
			className = {props.class} 
			dangerouslySetInnerHTML={{
			__html: marked(props.markdown, { renderer: renderer })
				}}>
			</div>
		</>
	);
};

function TopBar(props){
	return(
		<>
			<p>{props.text}</p>
			<i className={props.class} OnClick={()=>props.setStatus(!props.minimizedStatus)} ></i>
		
		</>
	);

};
*/


function TopBar(props){
	return (
		<>
		<div className="topbar">
			<p className="window_title">{props.text}</p>
			<i className={props.class} 
				onClick={()=>props.setStatus(!props.minimizedStatus)}>
			</i>
			</div>
		</>
		
	);
}
function Editor (props){
	return (
		<>
			<textarea id = 'editor'
				className = 'markdownEditor' 
				placeholder={initialInput} 
				onChange = {(event)=>props.setMarkdowm(event.target.value)} >
					{initialInput}	
			</textarea>
		</>
		);
} 

function Previwer(props){
	//const markdown = marked(props.markdown,{breaks:true});
	return(
		<>
				
			<div id = 'preview'
				className='previewWindow' 
				dangerouslySetInnerHTML={{
				__html: marked(props.markdown, { renderer: renderer })
				}}>
			</div>
		
		</>
	);
}

export default App;
