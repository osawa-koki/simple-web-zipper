import React, { useState } from 'react'
import dayjs from 'dayjs'
import JSZip from 'jszip'
import { Alert, Button, Form, Table } from 'react-bootstrap'
import { FaTrashCan } from 'react-icons/fa6'

export default function Zipper (): React.JSX.Element {
  const [files, setFiles] = useState<File[] | null>(null)

  const generateZip = async (): Promise<void> => {
    if (files == null) {
      return
    }

    const zip = new JSZip()
    for (const file of files) {
      zip.file(file.name, file)
    }

    const content = await zip.generateAsync({ type: 'blob' })
    const url = window.URL.createObjectURL(content)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'files.zip')
    document.body.appendChild(link)
    link.click()
  }

  return (
    <>
      <Form.Group controlId="formBasicFiles">
        <Form.Label>Select Files</Form.Label>
        <Form.Control type="file" multiple onChange={(event) => {
          const inputElement = event.target as HTMLInputElement
          const fileList = inputElement.files
          setFiles(fileList != null ? Array.from(fileList) : null)
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
                <th>ID</th>
                <th>File Name</th>
                <th>File Size</th>
                <th>File Type</th>
                <th>File Last Modified</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                Array.from(files).map((file, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{file.name}</td>
                    <td>{file.size.toLocaleString()}</td>
                    <td>{file.type}</td>
                    <td>{dayjs(file.lastModified).format('YYYY-MM-DD')}</td>
                    <td><FaTrashCan role='button' className='text-danger' onClick={() => {
                      const newFileList = Array.from(files)
                      newFileList.splice(index, 1)
                      setFiles(newFileList)
                    }} /></td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
          )
      }
      <hr />
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <Button variant="primary" onClick={generateZip} disabled={files == null}>Generate Zip</Button>
    </>
  )
}
