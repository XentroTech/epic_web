import Sidebar from '../Dashboard/Sidebar/Sidebar'
import Main from '../Dashboard/Main/Main'

function DashboardMain() {
  return (
    <div className='grid gap-4 p-4 grid-cols-[220px,_1fr]'>
      
        <Sidebar/>
        <Main/>
    </div>
  )
}

export default DashboardMain