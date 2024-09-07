import React from 'react'
import AdminReport  from './AdminReport'
import OwnerReport from './OwnerReport'
import { useSelector } from 'react-redux';
const Report = () => {
    const role = useSelector((state) => state.user?.user?.role);
  return (
    <div>
        {role ==="owner" ? <OwnerReport/>:<AdminReport/>}
    </div>
  )
}

export default Report