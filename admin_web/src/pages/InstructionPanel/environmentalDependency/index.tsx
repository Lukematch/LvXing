import BreadCrumb from '@/components/BreadCrumb'
import React from 'react'
import { useLocation } from 'umi'

export default function () {
  const location = useLocation()
  return (
    <div>
      <div style={{marginLeft: 20}}>
        <BreadCrumb location={location}/>
      </div>
    </div>
  )
}
