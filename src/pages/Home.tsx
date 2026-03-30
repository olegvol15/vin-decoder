import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { VinForm } from '../components/VinForm'
import { decodeVin } from '../api/nhtsa'
import { useVinHistory } from '../hooks/useVinHistory'

export function Home() {
  const [vin, setVin] = useState('')
  const [history, addVin] = useVinHistory()

  const { mutate, data, error, isPending, reset } = useMutation({
    mutationFn: decodeVin,
  })

  function handleSubmit(value: string) {
    addVin(value)
    mutate(value)
  }

  function handleHistoryClick(value: string) {
    setVin(value)
    addVin(value)
    mutate(value)
  }

  const results = data?.Results.filter(r => r.Value !== null && r.Value !== '') ?? []

  return (
    <div className="home">
      <h1>VIN Decoder</h1>

      <VinForm
        value={vin}
        onChange={setVin}
        onSubmit={handleSubmit}
        loading={isPending}
      />

      {history.length > 0 && (
        <section className="history">
          <h2>Recent searches</h2>
          <ul>
            {history.map(v => (
              <li key={v}>
                <button className="history-btn" onClick={() => handleHistoryClick(v)}>
                  {v}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {error && (
        <p className="fetch-error" role="alert">
          Failed to decode VIN: {error.message}
        </p>
      )}

      {data && (
        <section className="results">
          {data.Message && <p className="api-message">{data.Message}</p>}
          {results.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Variable</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {results.map(r => (
                  <tr key={r.VariableId}>
                    <td>{r.Variable}</td>
                    <td>{r.Value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No results found.</p>
          )}
          <button className="clear-btn" onClick={reset}>Clear</button>
        </section>
      )}
    </div>
  )
}
