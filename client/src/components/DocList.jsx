import React from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import { Grid, Segment } from 'semantic-ui-react';

class DocList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      numPages: null,
      pageNumber: 1,
      scale: 0.4
    }
    this.prepareFilesForGrid = this.prepareFilesForGrid.bind(this);
  }

  prepareFilesForGrid() {
    var arrayForGrid = [];
    var nestedArr = [];
    this.props.fileList.forEach(function(file, i) {
      if (i%2 === 0) {
        nestedArr.push(file);
      } else {
      nestedArr.push(file);
      arrayForGrid.push(nestedArr);
      nestedArr = [];
    }})
    if (nestedArr.length===1) arrayForGrid.push(nestedArr);
    return arrayForGrid;
  }

  render() {
    const { pageNumber, numPages, scale } = this.state;
    if (this.props.fileList.length > 0) {
      return (
        <div className="docDisplay">
          <h1>Your Documents</h1>
          <Grid divided='vertically' columns='equal'>
            {this.prepareFilesForGrid().map(function(duo, i) {
              if (duo.length === 2) {
                return (<Grid.Row key={i}>
                  <Grid.Column>
                    <Segment>
                      <h2>{duo[0].file_name}</h2>
                        <Document file={duo[0].s3_url}>
                          <a href={duo[0].s3_url}>
                            <Page pageNumber={pageNumber} scale = {scale} />
                          </a>
                        </Document>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment>
                      <h2>{duo[1].file_name}</h2>
                        <Document file={duo[1].s3_url}>
                          <a href={duo[1].s3_url}>
                            <Page pageNumber={pageNumber} scale = {scale} />
                          </a>
                        </Document>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>)
              }
              else if (duo.length === 1) {
                return (<Grid.Row key={i}>
                  <Grid.Column>
                    <Segment>
                      <h2 style={{display: 'flex', justifyContent: 'center'}}>{duo[0].file_name}</h2>
                        <Document file={duo[0].s3_url}>
                          <a href={duo[0].s3_url}>
                            <Page style={{display: 'flex', justifyContent: 'center'}} pageNumber={pageNumber} scale = {scale} />
                          </a>
                        </Document>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>)
              }
            })}
          </Grid>
        </div>
      )
    } else {
      return (
        <div className="docDisplay">
          <h1>Your Documents</h1>
          <div>You have not uploaded any documents yet.</div>
        </div>
      )
    }
  }
}

export default DocList;


// {this.prepareFilesForGrid().map(function(duo, i) {
//   console.log(duo);
//
// <h2>{duo[1].file_name}</h2>

// {this.props.fileList.map((file, i) => (
//   <div key={i}>
//   <h2>{file.file_name}</h2>
//   <Document file={file.s3_url}>
//     <a href={file.s3_url}>
//       <Page pageNumber={pageNumber} scale = {scale} />
//     </a>
//   </Document>
//   </div>
// ))}
