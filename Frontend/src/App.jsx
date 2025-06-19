import './App.css'

function App() {
  const [name, setname] = useState("Mohit")

  return (
    <div className='container'>
      <LoginForm/>
    </div>
  )
}

export default App
