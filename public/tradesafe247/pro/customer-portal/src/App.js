import {useState} from 'react';

function App() {
  const [form, setForm] = useState({name:'', email:'', phone:''});
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/customers', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(form)
    });
    alert(res.ok ? 'Saved!' : 'Error');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={form.name} 
             onChange={e=>setForm({...form, name:e.target.value})}/>
      <input placeholder="Email" type="email" value={form.email}
             onChange={e=>setForm({...form, email:e.target.value})}/>
      <input placeholder="Phone" value={form.phone}
             onChange={e=>setForm({...form, phone:e.target.value})}/>
      <button type="submit">Submit</button>
    </form>
  );
}
export default App;