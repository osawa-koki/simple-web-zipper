import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { Alert, Form } from 'react-bootstrap'

export default function Zipper (): React.JSX.Element {
  const [files, setFiles] = useState<FileList | null>(null)

  return (
    <>
      <Form.Group controlId="formBasicFiles">
        <Form.Label>Select Files</Form.Label>
        <Form.Control type="file" multiple onChange={(event) => {
          const inputElement = event.target as HTMLInputElement
          setFiles(inputElement.files)
        }} />
        <Form.Text className="text-muted">
          Select files to be zipped
        </Form.Text>
      </Form.Group>
      <hr />
      {
      files == null
        ? (
         <Alert variant="warning">
           No files selected.
          </Alert>
          )
        : (
          <Table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>File Size</th>
                <th>File Type</th>
                <th>File Last Modified</th>
              </tr>
            </thead>
            <tbody>
              {
                Array.from(files).map((file, index) => (
                  <tr key={index}>
                    <td>{file.name}</td>
                    <td>{file.size}</td>
                    <td>{file.type}</td>
                    <td>{file.lastModified}</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
          )
      }
    </>
  )
}
