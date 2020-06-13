import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import samplePDF from './Alonso_GF_Resume.pdf'
import { Card } from '../../components/Card'
import './index.sass'
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export const Resume = () => {
  const [tab, setTab] = useState(true)
  const getTabActiveClass = (isActive) => isActive ? "fancy-button fancy-button-active" : "fancy-button"
  const downloadPDF = (e) => (
    console.log(e)
  )
  return (
    <main className="resume-bg">
      <div>
        <input type="button" className={getTabActiveClass(tab)} onClick={() => setTab(true)} value="pdf" />
        <input type="button" className={getTabActiveClass(!tab)} onClick={() => setTab(false)} value="web" />
      </div>
      <div>
        <a href={samplePDF} className='dnl-link'>
          Download
        </a>
      </div>
      {tab &&
        <Card>
          <MyDoc></MyDoc>
        </Card>
      }
    </main>
  )
}
const MyDoc = () => {
  const onDocumentLoadSuccess = (a) => {
    console.log(a, window.innerHeight)
  }
  return (
    <Document
      file={samplePDF}
      onLoadSuccess={onDocumentLoadSuccess}
      onLoadError={console.error}
      loading='Wait for it!'
    >
      <Page pageNumber={1} height={Math.max(window.innerHeight, 600) - 90} />
    </Document>
  )
}
