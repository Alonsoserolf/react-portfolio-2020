import React, {useState} from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import samplePDF from './Alonso_GF_Resume.pdf'
import { Card } from '../../components/Card'
import './index.sass'
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const Resume = () => {
  const onDocumentLoadSuccess = (a)=>{
    console.log(a,window.innerHeight)
  }
  return (
    <main className="resume-bg">
      <Card>
      <Document
        file={samplePDF}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={console.error}
        loading='Wait for it!'
      >
        <Page pageNumber={1} height={window.innerHeight-90}/>
      </Document>
      </Card>
    </main>
  )
}
