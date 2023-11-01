import './App.css'
import { useStateContext } from './ContextProvider'

function App() {
  const {state} = useStateContext();
  return (
    <>
    <h1 className='text-green-500 text-center text-3xl font-bold'>{state}</h1>
    </>
  )
}

export default App
