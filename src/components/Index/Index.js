import React from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
import { indexUploads } from '../../api/upload'
import { withRouter } from 'react-router'
import Button from 'react-bootstrap/Button'

class IndexUpload extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      uploads: [],
      isLoaded: false,
      deleted: false
    }
  }
  componentDidMount () {
    // axios.get(apiUrl + '/uploads')
    indexUploads(this.props.user)
      .then(response => {
        this.setState({
          isLoaded: true,
          uploads: response.data.files
        })
      })
      .catch(console.error)
  }

  render () {
    const { history } = this.props
    let jsx
    if (this.state.isLoaded === false) {
      jsx = <img alt="loading gif" src="https://automotiverepairlumberton.com/Content/images/loading.gif" />
    } else if (this.state.uploads.length === 0) {
      jsx = <p>No uploads, please add one.</p>
    } else {
      jsx = (
        <div className="container">
          <div className="col-md">
            <table className="table table-sm table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">File Preview</th>
                  <th scope="col">File Name</th>
                  <th scope="col">Owner</th>
                  <th scope="col">Tag</th>
                  <th scope="col">Date Posted</th>
                  <th scope="col">Date Modified</th>
                  <th scope="col">File url</th>

                </tr>
              </thead>
              <tbody>{this.state.uploads.map((upload, index) => {
                return (
                  <tr key={upload._id} id="hov">
                    <td>{index + 1}</td>
                    <td>{(upload.url && (upload.url.includes('jpg') || upload.url.includes('png'))) ? <img src={upload.url} width={50} /> : ''}</td>
                    <td onClick={() => history.push('/uploads/' + upload._id)}>{upload.name}</td>
                    <td onClick={() => history.push('/uploads/' + upload._id)}>{upload.owner}</td>
                    <td onClick={() => history.push('/uploads/' + upload._id)}>{upload.tag}</td>
                    <td onClick={() => history.push('/uploads/' + upload._id)}>{upload.createdAt}</td>
                    <td onClick={() => history.push('/uploads/' + upload._id)}>{upload.updatedAt}</td>
                    <td><a href={upload.url} target="_blank" rel="noreferrer">{upload.url}</a></td>
                  </tr>
                )
              })
              }
              </tbody>
            </table>
          </div>
        </div>
      )
    }
    return (
      <div>
        <h2>Posted Files</h2>
        <Button onClick={() => history.push('/uploads')}>Post</Button>
        {jsx}
      </div>
    )
  }
}

export default withRouter(IndexUpload)
