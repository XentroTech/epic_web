import ActivityGraph from './ActivityGraph'
import SellsGraph from './SellsGraph'
import StatCards from './StatCards'

function Grid() {
  return (
    <div className='px-4 grid gap-3 grid-cols-12'>
        <StatCards/>
        <ActivityGraph/>
        <SellsGraph/>
    </div>
  )
}

export default Grid