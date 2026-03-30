import { useState } from 'react'

const VIN_PATTERN = /^[A-HJ-NPR-Z0-9]{17}$/i

interface Props {
  value: string
  onChange: (vin: string) => void
  onSubmit: (vin: string) => void
  loading: boolean
}

function validate(vin: string): string | null {
  if (!vin.trim()) return 'VIN is required'
  if (vin.length !== 17) return 'VIN must be exactly 17 characters'
  if (!VIN_PATTERN.test(vin)) return 'VIN contains invalid characters (I, O, Q are not allowed)'
  return null
}

export function VinForm({ value, onChange, onSubmit, loading }: Props) {
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const err = validate(value)
    if (err) {
      setError(err)
      return
    }
    setError(null)
    onSubmit(value)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value.toUpperCase())
    if (error) setError(null)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Enter VIN (e.g. 1HGBH41JXMN109186)"
          maxLength={17}
          aria-label="VIN number"
          aria-describedby={error ? 'vin-error' : undefined}
          aria-invalid={!!error}
          spellCheck={false}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Decoding…' : 'Decode'}
        </button>
      </div>
      {error && <p id="vin-error" className="form-error" role="alert">{error}</p>}
    </form>
  )
}
